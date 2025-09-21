import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

type Registration = {
  id: string
  teamName?: string
  college?: string
  track?: string
  teamSize?: number
  leader?: { name?: string; email?: string; phone?: string }
  members?: string[]
  createdAt?: unknown
}

export default function OrganiserRegistrations() {
  const [items, setItems] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // derived counts for domains
  const counts = React.useMemo(() => {
    const result: Record<string, number> = {
      'BYTE-BUILDERS': 0,
      'WATT-WORKS': 0,
      'INFRANOVA': 0,
      'UNKNOWN': 0,
    }
    for (const r of items) {
      const t = (r.track || '').toString()
      if (t.includes('BYTE-BUILDERS') || t.includes('BYTE-BUILDERS')) result['BYTE-BUILDERS']++
      else if (t.includes('WATT-WORKS')) result['WATT-WORKS']++
      else if (t.includes('INFRANOVA')) result['INFRANOVA']++
      else result['UNKNOWN']++
    }
    return result
  }, [items])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        if (!mounted) return
        const data: Registration[] = snap.docs.map(d => {
          const doc = d.data() as Record<string, unknown>
          const leader = typeof doc.leader === 'object' && doc.leader !== null
            ? {
                name: typeof (doc.leader as Record<string, unknown>).name === 'string' ? (doc.leader as Record<string, unknown>).name as string : undefined,
                email: typeof (doc.leader as Record<string, unknown>).email === 'string' ? (doc.leader as Record<string, unknown>).email as string : undefined,
                phone: typeof (doc.leader as Record<string, unknown>).phone === 'string' ? (doc.leader as Record<string, unknown>).phone as string : undefined,
              }
            : undefined
          return {
            id: d.id,
            teamName: typeof doc.teamName === 'string' ? doc.teamName : undefined,
            college: typeof doc.college === 'string' ? doc.college : undefined,
            track: typeof doc.track === 'string' ? doc.track : undefined,
            teamSize: typeof doc.teamSize === 'number' ? doc.teamSize : undefined,
            leader,
            members: Array.isArray(doc.members) ? (doc.members as string[]) : undefined,
            createdAt: doc.createdAt,
          }
        })
        setItems(data)
      } catch (err: unknown) {
        console.error('Failed to fetch registrations', err)
        if (mounted) {
          const msg = typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
            ? (err as { message?: unknown }).message as string
            : undefined
          setError(msg || 'Failed to load registrations')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <main className="min-h-screen bg-[#0b1020] text-white py-12">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Organiser: Registrations</h1>
        <p className="text-sm text-white/70 mb-6">This page is intentionally hidden from site navigation. Use the direct URL <code>/organiser/registrations</code>.</p>

        {/* Summary counts */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-sm text-white/70">Byte-Builders</div>
            <div className="text-2xl font-bold">{counts['BYTE-BUILDERS']}</div>
          </div>
          <div className="card text-center">
            <div className="text-sm text-white/70">Watt-Works</div>
            <div className="text-2xl font-bold">{counts['WATT-WORKS']}</div>
          </div>
          <div className="card text-center">
            <div className="text-sm text-white/70">Infranova</div>
            <div className="text-2xl font-bold">{counts['INFRANOVA']}</div>
          </div>
          <div className="card text-center">
            <div className="text-sm text-white/70">Unknown</div>
            <div className="text-2xl font-bold">{counts['UNKNOWN']}</div>
          </div>
        </div>

        {loading ? (
          <div className="card">Loading registrations…</div>
        ) : error ? (
          <div className="card text-red-400">Error: {error}</div>
        ) : items.length === 0 ? (
          <div className="card">No registrations found.</div>
        ) : (
          <div className="space-y-4">
            {items.map((r) => (
              <div key={r.id} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-lg">{r.teamName || '—'}</div>
                    <div className="text-sm text-white/70">{r.college || '—'}</div>
                    <div className="text-sm text-white/60">Track: {r.track || '—'} • Size: {r.teamSize || '—'}</div>
                  </div>
                  <div className="text-right text-sm text-white/70">
                    <div>Leader: {r.leader?.name || '—'}</div>
                    <div>{r.leader?.email || ''}</div>
                    <div>{r.leader?.phone || ''}</div>
                  </div>
                </div>
                {r.members && r.members.length > 0 && (
                  <div className="mt-3 text-sm text-white/70">
                    Members: {r.members.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
