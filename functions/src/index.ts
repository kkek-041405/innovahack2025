import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

if (!admin.apps.length) {
  admin.initializeApp()
}

const db = admin.firestore()

export const onAuthCreate = functions.auth.user().onCreate(async (user) => {
  await db.doc(`users/${user.uid}`).set({
    email: user.email || '',
    name: user.displayName || '',
    role: 'participant',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true })
})

export const api = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required')
  const { action, payload } = data as { action: string; payload?: any }

  switch (action) {
    case 'setRole': {
      const { uid, role } = payload as { uid: string; role: 'participant'|'mentor'|'judge'|'admin'|'staff' }
      // Only admins can set roles
      const caller = await admin.auth().getUser(context.auth.uid)
      if (caller.customClaims?.role !== 'admin') throw new functions.https.HttpsError('permission-denied', 'Admin only')
      await admin.auth().setCustomUserClaims(uid, { role })
      await db.doc(`users/${uid}`).set({ role }, { merge: true })
      return { ok: true }
    }
    case 'createTeam': {
      const { name, challengeId } = payload as { name: string; challengeId: string }
      const ref = db.collection('teams').doc()
      const batch = db.batch()
      batch.set(ref, {
        name, challengeId, ownerId: context.auth.uid, memberCount: 1,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      const tmId = `${ref.id}_${context.auth.uid}`
      batch.set(db.doc(`teamMembers/${tmId}`), {
        teamId: ref.id, uid: context.auth.uid, roleInTeam: 'owner',
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      await batch.commit()
      return { teamId: ref.id }
    }
    case 'joinTeamViaInvite': {
      const { token } = payload as { token: string }
      const invRef = db.doc(`invites/${token}`)
      const invSnap = await invRef.get()
      if (!invSnap.exists) throw new functions.https.HttpsError('not-found', 'Invite not found')
      const inv = invSnap.data() as any
      if (inv.expiresAt?.toMillis && inv.expiresAt.toMillis() < Date.now())
        throw new functions.https.HttpsError('failed-precondition', 'Invite expired')

      const teamRef = db.doc(`teams/${inv.teamId}`)
      await db.runTransaction(async (tx) => {
        const team = (await tx.get(teamRef)).data() as any
        if (!team) throw new functions.https.HttpsError('not-found', 'Team not found')
        if (team.memberCount >= 4) throw new functions.https.HttpsError('failed-precondition', 'Team full')

        const memberId = `${inv.teamId}_${context.auth!.uid}`
        tx.set(db.doc(`teamMembers/${memberId}`), {
          teamId: inv.teamId, uid: context.auth!.uid, roleInTeam: 'member',
          joinedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        tx.update(teamRef, { memberCount: admin.firestore.FieldValue.increment(1) })
        tx.delete(invRef)
      })
      return { ok: true, teamId: inv.teamId }
    }
    case 'finalizeSubmission': {
      const { teamId, submission } = payload as { teamId: string; submission: any }
      const settings = (await db.doc('settings/app').get()).data() || {}
      if (settings.submissionOpen === false) throw new functions.https.HttpsError('failed-precondition', 'Submissions closed')
      const member = await db.doc(`teamMembers/${teamId}_${context.auth.uid}`).get()
      if (!member.exists) throw new functions.https.HttpsError('permission-denied', 'Not a team member')
      await db.doc(`submissions/${teamId}`).set({
        ...submission,
        status: 'final',
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true })
      return { ok: true }
    }
    default:
      throw new functions.https.HttpsError('invalid-argument', 'Unknown action')
  }
})
