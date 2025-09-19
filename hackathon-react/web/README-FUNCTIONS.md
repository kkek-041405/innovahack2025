# How the registration flow works

1) Student fills the registration form in the React app (`src/components/ui/RegistrationForm.tsx`).
2) The app writes a document into Firestore collection `registrations` with team and leader info.
3) A Firebase Cloud Function triggers on new documents:
   - Generates a sequential `registrationId` like `INNOVA2025-001`.
   - Creates a QR code containing the registration payload.
   - Sends a confirmation email with the QR (inline + attachment) using SendGrid (preferred) or SMTP.
   - Updates the same document with `registrationId`, `emailSent: true`, and an embedded QR data URL.

## Deploying the backend

- Ensure Firebase CLI is installed and you're logged in: `npm install -g firebase-tools`; `firebase login`.
- Configure secrets for Functions (pick SendGrid or SMTP):
  - SendGrid: `SENDGRID_API_KEY`, `EMAIL_FROM`, `PUBLIC_SITE_URL`, `REG_PREFIX`.
  - SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- Deploy from the project root:

```
cd functions
npm install
npm run deploy
```

## Testing locally (optional)

- Start emulators for Firestore + Functions: `cd functions ; npm run serve`
- Add a test doc to `registrations` in the emulator; verify logs and email (for SMTP dev inbox).

## Notes

- The frontend already displays a success message after the write succeeds.
- If you also want to show the generated `registrationId` immediately in UI, you can listen to the document you just created and read back fields after the function updates it.
