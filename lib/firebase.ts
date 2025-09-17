import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider, isSignInWithEmailLink, signInWithEmailLink, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getAnalytics, Analytics, isSupported as analyticsIsSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
} as const

let _app: FirebaseApp | undefined
export function getClientApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client is only available in the browser')
  }
  if (!_app) {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  }
  return _app
}

export function getAuthClient(): Auth {
  return getAuth(getClientApp())
}

export function getDb(): Firestore {
  return getFirestore(getClientApp())
}

export function getStorageClient(): FirebaseStorage {
  return getStorage(getClientApp())
}

let _analyticsPromise: Promise<Analytics | null> | undefined
export async function getAnalyticsClient(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null
  if (!firebaseConfig.measurementId) return null
  if (!_analyticsPromise) {
    _analyticsPromise = (async () => {
      const supported = await analyticsIsSupported().catch(() => false)
      if (!supported) return null
      return getAnalytics(getClientApp())
    })()
  }
  return _analyticsPromise
}

export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

export async function completeEmailLinkSignIn(email: string) {
  if (typeof window === 'undefined') return
  const auth = getAuthClient()
  if (isSignInWithEmailLink(auth, window.location.href)) {
    await signInWithEmailLink(auth, email, window.location.href)
  }
}
