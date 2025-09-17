# Agentic India Hackathon (Next.js + Firebase)

A polished Next.js 14 (App Router) site for the Agentic India hackathon with Firebase Auth + Firestore integration for teams, invites, and basic auth flows.

- Offline event at Anurag University, Hyderabad
- Teams: 2–4 members
- Google + Email Link auth
- Join teams via invite token using `/join?token=...`

## Tech stack
- Next.js 14 (App Router)
- React 18, TypeScript
- Tailwind CSS
- Firebase Web SDK (Auth, Firestore, Storage, Functions)
- Cloud Functions (Node 18, TypeScript)

## Local setup
1) Prereqs
- Node.js 18+
- Firebase CLI (optional for emulators/deploy): `npm i -g firebase-tools`

2) Install dependencies
- In repo root: `npm install`
- In `functions/`: `npm install`

3) Environment variables
Create a `.env.local` in the repo root using `.env.local.example`:

```
NEXT_PUBLIC_FB_API_KEY=...
NEXT_PUBLIC_FB_AUTH_DOMAIN=...
NEXT_PUBLIC_FB_PROJECT_ID=...
NEXT_PUBLIC_FB_STORAGE_BUCKET=...
NEXT_PUBLIC_FB_APP_ID=...
```

These come from Firebase console → Project settings → General.

4) Run dev server
`npm run dev` → http://localhost:3000

## Firebase: rules and functions

- Firestore rules: `firebase/firestore.rules`
- Storage rules: `firebase/storage.rules`
- Functions source: `functions/src/index.ts`

Deploy (requires `firebase-tools` and a configured project):

```
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules,storage:rules,functions
```

Emulators (optional):

```
firebase emulators:start
```

## Pages and flows
- `/` Landing page with schedule, FAQ, partners, etc.
- `/login` Sign in (Google or email magic link)
- `/team` Create a team and generate invite tokens
- `/join?token=...` Accept team invite and redirect to `/team`

## Production build
`npm run build` then `npm start` (or deploy to your platform). The build expects the `.env.local` vars above. We’ve made Firebase initialization client-only to avoid SSR/prerender issues if envs are missing.

## Customization
- Update content in `app/page.tsx`.
- Styles: `app/globals.css`, `tailwind.config.ts`.
- Remote images allowed from `storage.googleapis.com` and `reskilll.com` in `next.config.mjs`.

## Notes
- Replace demo copy/images with your own assets as needed.
