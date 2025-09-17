'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'

export default function AuthCta() {
  const { user } = useAuth()
  if (user) {
    return (
      <Link
        href="/team"
        className="inline-flex items-center rounded-lg border border-white/20 px-3 py-2 font-semibold hover:bg-white/10 transition-all duration-300"
      >
        Team
      </Link>
    )
  }
  return (
    <Link
      href="/login"
      className="inline-flex items-center rounded-lg border border-white/20 px-3 py-2 font-semibold hover:bg-white/10 transition-all duration-300"
    >
      Login
    </Link>
  )
}
