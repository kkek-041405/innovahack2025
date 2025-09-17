'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { actions } from '@/lib/functions'

export default function JoinClient() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const router = useRouter()
  const { user, loading } = useAuth()
  const [status, setStatus] = useState<'idle'|'joining'|'done'|'error'>('idle')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (!token) {
      setError('Missing invite token')
      setStatus('error')
      return
    }
    ;(async () => {
      try {
        setStatus('joining')
        await actions.joinTeamViaInvite(token)
        setStatus('done')
        router.push('/team')
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to join team'
        setError(msg)
        setStatus('error')
      }
    })()
  }, [loading, user, token, router])

  return (
    <div className="container py-16">
      <h1 className="section-title">Join Team</h1>
      <div className="card max-w-md">
        {status === 'joining' && <p>Joining team...</p>}
        {status === 'done' && <p>Joined! Redirecting to your team...</p>}
        {status === 'error' && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  )
}
