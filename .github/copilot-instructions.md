# Copilot Instructions for innovahack2025

Concise, project-specific guidance to help AI agents contribute effectively. Keep changes focused, incremental, and aligned with existing patterns.

## Architecture Overview
- **Framework**: Next.js 14 App Router (TypeScript, React 18) with client-heavy Firebase usage (Auth, Firestore, Storage, Cloud Functions) and Tailwind CSS for styling.
- **Monorepo-style layout**: Root Next.js app plus `functions/` (Firebase Cloud Functions in TypeScript) deployed separately. No shared build tooling beyond TypeScript + ESLint.
- **Data model (implicit)**:
  - `users/{uid}`: email, name, role, timestamps (created by `onAuthCreate`).
  - `teams/{teamId}` with fields: name, challengeId, ownerId, memberCount, createdAt.
  - `teamMembers/{teamId_uid}`: teamId, uid, roleInTeam (owner/member), joinedAt.
  - `invites/{token}`: teamId, createdBy, createdAt, expiresAt (client-created, short random token).
  - `submissions/{teamId}`: submission content + status + submittedAt (written via callable function `finalizeSubmission`).
  - `settings/app`: contains flags like `submissionOpen`.
- **Callable API pattern**: Single HTTPS callable function `api` multiplexes actions by `action` string; client wrapper in `lib/functions.ts` centralizes calls.

## Core Files & Responsibilities
- `lib/firebase.ts`: Lazy, browser-only initialization. Throws if used server-side; always gate calls with `typeof window` or within client components.
- `lib/useAuth.ts`: Simple `onAuthStateChanged` hook returning `{ user, loading }`.
- `lib/functions.ts`: `callApi` + specific action helpers. Extend by adding a new case server-side and a helper here.
- `functions/src/index.ts`: Server logic (role enforcement, transactional team joins, submission gating). Keep new actions inside the existing `switch` with explicit validation and Firestore atomicity (batch/transaction) where needed.
- `app/*`: Route segments. Most dynamic logic lives in client components via `'use client'` directive.
- `components/ui/*`: Presentational + lightweight interactive components (animations, nav, accordions, reveal effects). Follow existing naming and class utility approach.

## Conventions & Patterns
- **Client-only Firebase**: Do not import Firebase SDK in server components; wrap new interactive pages/components with `'use client'` when they access auth, Firestore, or callable functions.
- **API Extension**:
  1. Add a new `case` in `functions/src/index.ts` inside the `switch (action)`; enforce auth, validate payload, perform DB writes safely.
  2. Return a minimal JSON `{ ok: true, ... }` or typed data.
  3. Add typed helper in `lib/functions.ts` inside `actions` map.
  4. Consume in client code via `await actions.yourNewAction(...)` with optimistic UI states (`status` pattern used in `team/page.tsx`).
- **Firestore Writes**: Use transactions for multi-document consistency (`joinTeamViaInvite`) or batch for grouped initial writes (`createTeam`). Mirror that approach for any multi-document invariants (e.g., counters, membership constraints).
- **IDs & Tokens**: Invite token = `crypto.randomUUID().slice(0, 8)` (short, non-guessable). Team member doc ID concatenation: `${teamId}_${uid}`.
- **Role Management**: Only admins (custom claim `role: 'admin'`) can mutate other user roles. Maintain parity by updating both auth custom claims and Firestore user doc.
- **Styling**: Tailwind utility classes; custom theme extends `primary`, animations (`fade-in-up`, etc.), and `card` / `section-title` utility class patterns (implicit via global styles). Preserve semantic, minimal markup.
- **Suspense for Search Params**: `join/page.tsx` uses `<Suspense>` wrapper to allow `useSearchParams` in client child.

## Environment & Runtime
- Required env vars: `NEXT_PUBLIC_FB_*` (see `README.md`). Missing measurement ID is handled gracefully.
- Production build: `npm run build` then `npm start`.
- Functions build: inside `functions/` run `npm run build`; deploy selective functions via `npm run deploy` (which maps to `firebase deploy --only functions:api,functions:onAuthCreate`).

## Typical Workflows
- **Add New Callable Action**: Update `functions/src/index.ts` + `lib/functions.ts`; optionally add a UI form with loading state and basic error surface.
- **Add Protected Page**: Create client page, call `useAuth()`, redirect to `/login` if no user (see `join/JoinClient.tsx`). Avoid SSR data dependencies for user-specific content.
- **Add Firestore Collection**: Define shape inline (no centralized schema). Ensure server-side security via Firestore rules (`firebase/firestore.rules`) if sensitive (rules file not yet customized beyond defaults—update if adding write-sensitive data).

## Guardrails for AI Changes
- Do NOT move Firebase initialization server-side; SSR is purposefully avoided to prevent env mismatch.
- Keep `functions/src/index.ts` lean: no large external libs without justification; validate inputs before writes.
- Maintain action name uniqueness; reject ambiguous overloading.
- When adding multi-step server operations affecting counts or membership, use a transaction or atomic FieldValue increments.
- Respect current naming casing (`camelCase` for actions, lower kebab for files, React PascalCase components).

## Examples
- Create Team Flow: client (`team/page.tsx`) → `actions.createTeam` → `api` `createTeam` case → batch writes `teams` + `teamMembers` docs.
- Join Team Flow: `JoinClient` effect triggers `actions.joinTeamViaInvite` → server transaction validates capacity (max 4) → increments memberCount → membership doc added → invite deleted.

## When Unsure
Prefer reading analogous existing code (e.g., `createTeam` or `joinTeamViaInvite`) before writing new logic. Keep responses small & composable; ask for clarification only if a requirement can't be inferred.

---
If any of these sections need refinement (e.g., missing rule specifics, styling tokens, or deployment nuances) let me know what to clarify next.
