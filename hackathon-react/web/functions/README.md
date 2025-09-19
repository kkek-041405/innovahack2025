# Firebase Functions for Innova Hack 2025

This functions package handles post-registration automation:

- Firestore onCreate trigger for `registrations/*`
- Generates sequential `registrationId` like `INNOVA2025-001`
- Creates a QR code (PNG) with essential payload
- Sends confirmation email with QR attached (SendGrid or SMTP)

## Setup

1. Install tools (Windows PowerShell):

```
npm install -g firebase-tools
```

2. Install function deps:

```
cd functions
npm install
```

3. Configure env. Preferred: SendGrid. Set environment variables for Functions:

```
firebase functions:secrets:set SENDGRID_API_KEY
firebase functions:secrets:set EMAIL_FROM
firebase functions:secrets:set PUBLIC_SITE_URL
firebase functions:secrets:set REG_PREFIX
# Or SMTP if not using SendGrid
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_SECURE
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase functions:secrets:set SMTP_FROM
```

4. Deploy:

```
npm run build
firebase deploy --only functions
```

## Local emulation

To run Firestore + Functions locally:

```
cd functions
npm run serve
```

Note: email sending may still call external providers; prefer testing with SMTP to a dev inbox.
