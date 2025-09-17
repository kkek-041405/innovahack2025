'use client'

import { useAuth } from '@/lib/useAuth'
import { useEffect, useState } from 'react'
import { actions } from '@/lib/functions'
import { doc, setDoc } from 'firebase/firestore'
import { getDb } from '@/lib/firebase'

export default function TeamPage() {
  const { user, loading } = useAuth()
  const [teamId, setTeamId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [challengeId, setChallengeId] = useState('')
  const [inviteToken, setInviteToken] = useState('')
  const [status, setStatus] = useState<'idle'|'working'>('idle')

  useEffect(() => {
    if (!user) return
    // Placeholder: Could look up team membership here.
  }, [user])

  async function createTeam(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setStatus('working')
    try {
      const res = await actions.createTeam(name, challengeId)
      setTeamId(res.teamId)
      setStatus('idle')
    } catch {
      setStatus('idle')
    }
  }

  async function createInvite() {
    if (!teamId || !user) return
    const token = crypto.randomUUID().slice(0, 8)
    const db = getDb()
    await setDoc(doc(db, 'invites', token), {
      teamId,
      createdBy: user.uid,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    })
    setInviteToken(token)
  }

  return (
    <div className="container py-16">
      <h1 className="section-title">Your Team</h1>
      {loading && <p className="text-white/70 mb-4">Loading...</p>}

      {!teamId && (
        <div className="card max-w-xl space-y-4">
          <form onSubmit={createTeam} className="grid gap-3">
            <input className="rounded-lg bg-white/10 px-3 py-2" placeholder="Team name" value={name} onChange={(e)=>setName(e.target.value)} required />
            <input className="rounded-lg bg-white/10 px-3 py-2" placeholder="Challenge ID or name" value={challengeId} onChange={(e)=>setChallengeId(e.target.value)} required />
            <button disabled={status==='working'} className="rounded-lg bg-primary px-4 py-2 font-semibold disabled:opacity-60">Create team</button>
          </form>
        </div>
      )}

      {!!teamId && (
        <div className="card max-w-xl space-y-3">
          <div className="font-semibold">Team ID: {teamId}</div>
          <button onClick={createInvite} className="rounded-lg border border-white/20 px-3 py-2">Generate invite link</button>
          {!!inviteToken && (
            <div className="text-sm text-white/80 break-all">Invite URL: {typeof window !== 'undefined' ? `${window.location.origin}/join?token=${inviteToken}` : `/join?token=${inviteToken}`}</div>
          )}
        </div>
      )}
    </div>
  )
}
