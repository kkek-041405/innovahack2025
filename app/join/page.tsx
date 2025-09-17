import { Suspense } from 'react'
import JoinClient from './JoinClient'

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-16">
          <h1 className="section-title">Join Team</h1>
          <div className="card max-w-md">Loading...</div>
        </div>
      }
    >
      <JoinClient />
    </Suspense>
  )
}
