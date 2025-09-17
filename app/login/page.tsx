'use client'

import { getAuthClient, googleProvider } from '@/lib/firebase'
import { signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const auth = getAuthClient()
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const stored = window.localStorage.getItem('emailForSignIn')
      if (!stored) return
      signInWithEmailLink(auth, stored, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn')
        })
        .catch(() => {})
    }
  }, [])

  async function signInGoogle() {
    const auth = getAuthClient()
    await signInWithPopup(auth, googleProvider)
  }

  async function signInEmail(e: React.FormEvent) {
    e.preventDefault()
    const actionCodeSettings = {
      url: typeof window !== 'undefined' ? window.location.origin + '/login' : '',
      handleCodeInApp: true,
    }
    const auth = getAuthClient()
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
    setSent(true)
  }

  return (
    <div className="container py-16">
      <h1 className="section-title">Sign in</h1>
      <div className="card max-w-md">
        <button className="w-full mb-4 rounded-lg bg-primary px-4 py-3 font-semibold" onClick={signInGoogle}>
          Continue with Google
        </button>
        <form onSubmit={signInEmail} className="space-y-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
          />
          <button type="submit" className="w-full rounded-lg border border-white/20 px-4 py-2">
            Send magic link
          </button>
        </form>
        {sent && (
          <p className="mt-3 text-sm text-white/70">Check your inbox for the magic link.</p>
        )}
      </div>
    </div>
  )
}
