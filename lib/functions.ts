import { httpsCallable, getFunctions, HttpsCallableResult } from 'firebase/functions'
import { getClientApp } from './firebase'

type ApiPayload = { action: string; payload?: unknown }

export async function callApi<T>(action: string, payload?: unknown): Promise<T> {
  const functions = getFunctions(getClientApp())
  const callable = httpsCallable<ApiPayload, T>(functions, 'api')
  const res: HttpsCallableResult<T> = await callable({ action, payload })
  return res.data
}

export type Role = 'participant'|'mentor'|'judge'|'admin'|'staff'
export type CreateTeamResponse = { teamId: string }

export const actions = {
  setRole: (uid: string, role: Role) => callApi<{ ok: true }>('setRole', { uid, role }),
  createTeam: (name: string, challengeId: string) => callApi<CreateTeamResponse>('createTeam', { name, challengeId }),
  joinTeamViaInvite: (token: string) => callApi<{ ok: true; teamId: string }>('joinTeamViaInvite', { token }),
  finalizeSubmission: (teamId: string, submission: Record<string, unknown>) => callApi<{ ok: true }>('finalizeSubmission', { teamId, submission }),
}
