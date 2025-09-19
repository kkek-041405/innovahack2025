import * as admin from 'firebase-admin'
import { getFirestore, FieldValue, Transaction, DocumentData } from 'firebase-admin/firestore'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
// import { defineSecret } from 'firebase-functions/params' - removed for direct values
import QRCode from 'qrcode'
import nodemailer from 'nodemailer'

admin.initializeApp()
const db = getFirestore()

// Helper: get or create a counter doc to increment sequential IDs safely
async function getNextSequence(name: string): Promise<number> {
  const ref = db.collection('_counters').doc(name)
  const res = await db.runTransaction(async (tx: Transaction) => {
    const snap = await tx.get(ref)
    const curr = snap.exists ? (snap.data()!.value as number) : 0
    const next = curr + 1
    tx.set(ref, { value: next }, { merge: true })
    return next
  })
  return res
}

function pad(num: number, width = 3): string {
  const s = String(num)
  return s.length >= width ? s : '0'.repeat(width - s.length) + s
}

// Declare secrets (v2) - commented out for direct values
// const SMTP_HOST = defineSecret('SMTP_HOST')
// const SMTP_PORT = defineSecret('SMTP_PORT')
// const SMTP_SECURE = defineSecret('SMTP_SECURE')
// const SMTP_USER = defineSecret('SMTP_USER')
// const SMTP_PASS = defineSecret('SMTP_PASS')
// const SMTP_FROM = defineSecret('SMTP_FROM')
// const PUBLIC_SITE_URL = defineSecret('PUBLIC_SITE_URL')
// const REG_PREFIX = defineSecret('REG_PREFIX')

function getEnv(key: string, fallback = ''): string {
  // Direct values instead of secrets
  switch (key) {
    case 'SMTP_HOST': return 'smtp.gmail.com'
    case 'SMTP_PORT': return '465'
    case 'SMTP_SECURE': return 'true'
    case 'SMTP_USER': return 'ewbvvit@gmail.com'
    case 'SMTP_PASS': return 'loqmewnohivnknnz'
    case 'SMTP_FROM': return 'Innova Hack 2025 <ewbvvit@gmail.com>'
    case 'PUBLIC_SITE_URL': return 'https://innovahack2025.web.app'
    case 'REG_PREFIX': return 'INNOVA2025-'
    default: return process.env[key] ?? fallback
  }
}

// Configure email provider dynamically
type EmailAttachment = { filename: string; content: string | Buffer; contentType?: string; cid?: string }

function getEmailClient() {
  // Gmail SMTP via Nodemailer
  const host = getEnv('SMTP_HOST')
  const user = getEnv('SMTP_USER')
  const pass = getEnv('SMTP_PASS')
  if (host && user && pass) {
    const transport = nodemailer.createTransport({
      host,
      port: Number(getEnv('SMTP_PORT', '587')),
      secure: getEnv('SMTP_SECURE', 'false') === 'true',
      auth: { user, pass },
    })
    return {
      async send(opts: { to: string; from: string; subject: string; html: string; attachments?: EmailAttachment[] }) {
        const attachments = opts.attachments?.map(a => ({
          filename: a.filename,
          content: typeof a.content === 'string' ? Buffer.from(a.content, 'base64') : a.content,
          contentType: a.contentType || 'application/octet-stream',
          cid: a.cid,
        }))
        await transport.sendMail({ to: opts.to, from: opts.from, subject: opts.subject, html: opts.html, attachments })
      },
      provider: 'smtp' as const,
    }
  }

  throw new Error('No email provider configured. Set SMTP_* env vars.')
}

export const onRegistrationCreate = onDocumentCreated({
  document: 'registrations/{docId}',
  region: 'us-central1',
  // secrets: [] - removed since using direct values
}, async (event) => {
  const snap = event.data
  if (!snap) return
  const data = snap.data() as DocumentData

    // Safety: idempotency check
    if (data.registrationId && data.emailSent) {
      return
    }

    // Determine recipient email
    const to = data?.leader?.email || data?.email
    if (!to) return

    // Generate new sequential registrationId
    const seq = await getNextSequence('registrations')
    const regPrefix = getEnv('REG_PREFIX', 'INNOVA2025-')
    const randomSuffix = Math.random().toString(36).substring(2,5).toUpperCase();
    const registrationId = `${regPrefix}${pad(seq, 3)}-${randomSuffix}`

    // Create QR code PNG as buffer for CID attachment
    const qrPayload = JSON.stringify({
      registrationId,
      teamName: data.teamName,
      leader: data.leader?.name,
      email: to,
      createdAt: Date.now(),
    })
    const qrDataUrl = await QRCode.toDataURL(qrPayload, { width: 512, margin: 1 })
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64')

    // Prepare email
    const siteUrl = getEnv('PUBLIC_SITE_URL', 'https://innovahack2025.web.app')
    const emailFrom = getEnv('SMTP_FROM') || getEnv('SMTP_USER') || 'Innova Hack 2025 <noreply@example.com>'
    const subject = `Innova Hack 2025 Registration Confirmed – ${registrationId}`
    const html = `<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#111;margin:0;padding:0;background:#f4f4f4;">
      <style>
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; margin: 20px 0 !important; }
          .content { padding: 16px !important; }
          .header h1 { font-size: 22px !important; }
          .team-table td { display: block; width: 100% !important; margin-bottom: 8px; }
          .cta-button { padding: 10px 20px !important; font-size: 16px !important; }
          ul { padding-left: 16px !important; }
        }
      </style>

      <table class="container" style="max-width:600px;margin:40px auto 40px auto;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);width:100%;">
        <!-- Header -->
        <tr>
          <td class="header" style="padding:24px;text-align:center;background:linear-gradient(90deg, #4CAF50, #45A049);color:#fff;">
            <h1 style="margin:0;font-size:26px;">You're In! 🎉</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="content" style="padding:24px;">
            <p style="margin:0 0 16px 0;font-size:16px;">Hi <strong>${data.leader?.name || 'Participant'}</strong>,</p>
            <p style="margin:0 0 16px 0;font-size:16px;">
              Thanks for registering for <strong>Innova Hack 2025</strong>! Your registration ID is <strong>${registrationId}</strong>.
            </p>
            <p style="margin:0 0 16px 0;font-size:16px;">Please present this QR code during check-in:</p>

            <!-- QR Code card -->
            <div style="text-align:center;margin:16px 0;padding:16px;border:2px dashed #4CAF50;border-radius:16px;display:inline-block;background:linear-gradient(180deg, #fff 70%, #f9fff9 100%);box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              <img src="cid:qr-code-${registrationId}" alt="QR Code" style="max-width:220px;border:1px solid #eee;padding:8px;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.1);width:100%;height:auto;" />
            </div>

            <!-- Team Info -->
            <table class="team-table" style="width:100%;margin:16px 0;border-collapse:collapse;">
              <tr>
                <td style="font-size:16px;"><strong>Team:</strong> ${data.teamName || 'N/A'}</td>
                <td style="font-size:16px;"><strong>Track:</strong> ${data.track || 'N/A'}</td>
              </tr>
            </table>

            <!-- Team Members -->
            <h3 style="margin:16px 0 8px 0;font-size:18px;color:#333;">Team Members</h3>
            <ul style="padding-left:20px;margin:0 0 24px 0;">
              ${[data.leader?.name, ...(data.members || [])]
                .filter(Boolean)
                .map(name => `<li style="font-size:15px;margin:4px 0;">${name}</li>`)
                .join('')}
            </ul>

            <!-- CTA Button -->
            <p style="text-align:center;margin:24px 0;">
              <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" class="cta-button" style="display:inline-block;padding:12px 24px;background:#4CAF50;color:#fff;text-decoration:none;font-weight:bold;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">Visit Event Website</a>
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="font-size:12px;color:#555;margin:0;">If you did not register, you can safely ignore this email.</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:12px;text-align:center;font-size:12px;color:#999;background:#f9f9f9;">
            &copy; 2025 Innova Hack | Powered by VVIT IUCEE Student Chapter
          </td>
        </tr>
      </table>
    </div>`

    const emailClient = getEmailClient()

    // Send email with CID inline attachment for QR code
    await emailClient.send({
      to,
      from: emailFrom,
      subject,
      html,
      attachments: [{
        filename: `${registrationId}.png`,
        content: qrBuffer,
        contentType: 'image/png',
        cid: `qr-code-${registrationId}` // Content-ID for inline embedding
      }],
    })

    // Update doc with registrationId and emailSent flag
    await snap.ref.set(
      {
        registrationId,
        emailSent: true,
        qr: {
          contentType: 'image/png',
          dataUrl: qrDataUrl,
          buffer: qrBuffer.toString('base64'), // Store base64 for potential future use
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
})
