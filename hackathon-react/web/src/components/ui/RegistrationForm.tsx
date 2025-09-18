import { useMemo, useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'

type FormData = {
  teamName: string
  college: string
  track: '💻 BYTE-BUILDERS (CSE & Allied Branches)' | '⚡ WATT-WORKS (ECE & EEE Branches)' | ''
  teamSize: '4' | '5' | ''
  leaderName: string
  leaderEmail: string
  leaderPhone: string
  member2?: string
  member3?: string
  member4?: string
  member5?: string
  agree: boolean
}

const initialState: FormData = {
  teamName: '',
  college: '',
  track: '',
  teamSize: '',
  leaderName: '',
  leaderEmail: '',
  leaderPhone: '',
  member2: '',
  member3: '',
  member4: '',
  member5: '',
  agree: false,
}

export default function RegistrationForm() {
  const [data, setData] = useState<FormData>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const FORM_URL = import.meta.env.VITE_REGISTRATION_FORM_URL as string | undefined

  const hasExternalForm = useMemo(() => typeof FORM_URL === 'string' && FORM_URL.length > 0, [FORM_URL])

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!data.teamName.trim()) e.teamName = 'Team name is required'
    if (!data.college.trim()) e.college = 'College/University is required'
    if (!data.track) e.track = 'Please select a track'
  if (!data.teamSize) e.teamSize = 'Select team size (4–5)'
    if (!data.leaderName.trim()) e.leaderName = 'Team leader name is required'
    if (!/^\S+@\S+\.\S+$/.test(data.leaderEmail)) e.leaderEmail = 'Valid email is required'
    if (!/^\+?[0-9]{7,15}$/.test(data.leaderPhone.replace(/\s|-/g, ''))) e.leaderPhone = 'Valid phone is required'

  const sizeNum = parseInt(data.teamSize || '0', 10)
  if (sizeNum >= 4 && !data.member2?.trim()) e.member2 = 'Provide teammate name'
  if (sizeNum >= 4 && !data.member3?.trim()) e.member3 = 'Provide teammate name'
  if (sizeNum >= 4 && !data.member4?.trim()) e.member4 = 'Provide teammate name'
  if (sizeNum >= 5 && !data.member5?.trim()) e.member5 = 'Provide teammate name'

    if (!data.agree) e.agree = 'You must agree to the rules'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    // Prefer external official form if configured
    if (hasExternalForm && FORM_URL) {
      window.open(FORM_URL, '_blank', 'noopener')
      return
    }

    // Otherwise store in Firestore
    ;(async () => {
      try {
        setSubmitting(true)
        setSubmitError('')
        const sizeNum = parseInt(data.teamSize || '0', 10)
        await addDoc(collection(db, 'registrations'), {
          teamName: data.teamName.trim(),
          college: data.college.trim(),
          track: data.track,
          teamSize: sizeNum,
          leader: {
            name: data.leaderName.trim(),
            email: data.leaderEmail.trim(),
            phone: data.leaderPhone.trim(),
          },
          members: [data.member2, data.member3, data.member4, data.member5].filter(Boolean),
          agree: data.agree,
          createdAt: serverTimestamp(),
        })
        setSubmitted(true)
        setData(initialState)
      } catch (err: any) {
        console.error('Registration submit failed', err)
        setSubmitError(err?.message || 'Failed to submit. Please try again later.')
      } finally {
        setSubmitting(false)
      }
    })()
  }

  const set = (k: keyof FormData, v: string | boolean) => setData(d => ({ ...d, [k]: v }))

  return (
    <div className="card">
      {submitted ? (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Registration submitted</h4>
          <p className="text-white/80">Thank you! We have received your registration. We’ll email the team leader with further details.</p>
        </div>
      ) : hasExternalForm ? (
        <div className="space-y-4">
          <p className="text-white/80">Complete your registration using the form below.</p>
          <div className="w-full aspect-[4/5] max-h-[80vh]">
            {/* Embedded external form (e.g., Google Forms). Adjust height as needed. */}
            <iframe
              src={FORM_URL}
              title="Registration Form"
              className="w-full h-full rounded-lg border border-white/10"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-white/60">Having trouble? <a className="text-primary underline" href={FORM_URL} target="_blank" rel="noreferrer">Open the form in a new tab</a>.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Team Name</label>
              <input className="input" value={data.teamName} onChange={e => set('teamName', e.target.value)} placeholder="e.g., Code Crusaders" />
              {errors.teamName && <p className="error">{errors.teamName}</p>}
            </div>
            <div>
              <label className="label">College / University</label>
              <input className="input" value={data.college} onChange={e => set('college', e.target.value)} placeholder="e.g., VVIT Guntur" />
              {errors.college && <p className="error">{errors.college}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Track</label>
              <select className="input" value={data.track} onChange={e => set('track', e.target.value)}>
                <option value="">Select a track</option>
                <option>💻 BYTE-BUILDERS (CSE & Allied Branches)</option>
                <option>⚡ WATT-WORKS (ECE & EEE Branches)</option>
              </select>
              {errors.track && <p className="error">{errors.track}</p>}
            </div>
            <div>
              <label className="label">Team Size</label>
              <select className="input" value={data.teamSize} onChange={e => set('teamSize', e.target.value)}>
                <option value="">Select</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.teamSize && <p className="error">{errors.teamSize}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Leader Name</label>
              <input className="input" value={data.leaderName} onChange={e => set('leaderName', e.target.value)} placeholder="Full name" />
              {errors.leaderName && <p className="error">{errors.leaderName}</p>}
            </div>
            <div>
              <label className="label">Leader Email</label>
              <input className="input" type="email" value={data.leaderEmail} onChange={e => set('leaderEmail', e.target.value)} placeholder="name@email.com" />
              {errors.leaderEmail && <p className="error">{errors.leaderEmail}</p>}
            </div>
            <div>
              <label className="label">Leader Phone</label>
              <input className="input" value={data.leaderPhone} onChange={e => set('leaderPhone', e.target.value)} placeholder="e.g., +91 98765 43210" />
              {errors.leaderPhone && <p className="error">{errors.leaderPhone}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Member 2</label>
              <input className="input" value={data.member2} onChange={e => set('member2', e.target.value)} placeholder="Full name" />
              {errors.member2 && <p className="error">{errors.member2}</p>}
            </div>
            <div>
              <label className="label">Member 3</label>
              <input className="input" value={data.member3} onChange={e => set('member3', e.target.value)} placeholder="Full name" />
              {errors.member3 && <p className="error">{errors.member3}</p>}
            </div>
            <div>
              <label className="label">Member 4</label>
              <input className="input" value={data.member4} onChange={e => set('member4', e.target.value)} placeholder="Full name" />
              {errors.member4 && <p className="error">{errors.member4}</p>}
            </div>
            <div>
              <label className="label">Member 5 (only for team of 5)</label>
              <input className="input" value={data.member5} onChange={e => set('member5', e.target.value)} placeholder="Full name" />
              {errors.member5 && <p className="error">{errors.member5}</p>}
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-white/80">
            <input type="checkbox" checked={data.agree} onChange={e => set('agree', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent" />
            <span>
              I confirm that our team will adhere to the hackathon rules, code of conduct, and any venue policies during the event.
            </span>
          </label>
          {errors.agree && <p className="error">{errors.agree}</p>}

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-blue-600 transition disabled:opacity-60" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Registration'}
            </button>
            <p className="text-xs text-white/60">Tip: Set VITE_REGISTRATION_FORM_URL to embed an official form.</p>
          </div>
          {submitError && <p className="error">{submitError}</p>}
        </form>
      )}
    </div>
  )
}

// Reusable Tailwind utility classes
// Using small class shortcuts via globals.css layer components
