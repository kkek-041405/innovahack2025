import QRCode from 'qrcode'
import nodemailer from 'nodemailer'

async function testEmail() {
    // Gmail SMTP configuration (same as Cloud Function)
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ewbvvit@gmail.com',
            pass: 'loqmewnohivnknnz', // App password without spaces
        }
    });

    // Real data structure from Firestore
    const registrationId = 'INNOVA2025-001'
    const data = {
        college: 'Vvitu guntur',
        leader: { 
            name: 'Sahithi', 
            email: 'ewbvvit@gmail.com',
            phone: '9959934447'
        },
        teamName: 'Code crusader',
        teamSize: 5,
        track: '💻 BYTE-BUILDERS (CSE & Allied Branches)',
        members: ['Amrutha ', 'Medha', 'Deepika ', 'Priyanka '],
        createdAt: new Date('2025-09-18T15:18:19.000Z')
    }

    // Generate QR code (same as Cloud Function)
    const qrPayload = JSON.stringify({
        registrationId,
        teamName: data.teamName,
        leader: data.leader?.name,
        email: data.leader?.email,
        college: data.college,
        createdAt: Date.now(),
    })
    const qrDataUrl = await QRCode.toDataURL(qrPayload, { width: 512, margin: 1 })

    // Email template with updated data structure
    const siteUrl = 'https://innovahack2025.web.app'
    const emailFrom = 'Innova Hack 2025 <ewbvvit@gmail.com>'
    const subject = `Innova Hack 2025 Registration Confirmed – ${registrationId}`
    const html = `
<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
line-height:1.6;color:#111;margin:0;padding:0;background:#f4f4f4;">
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; margin: 20px 0 !important; }
      .content { padding: 16px !important; }
      .header h1 { font-size: 22px !important; }
      .team-table td { display: block; width: 100% !important; margin-bottom: 8px; }
      .cta-button { padding: 10px 20px !important; font-size: 16px !important; }
      ul { padding-left: 16px !important; }
      .qr-container { padding: 12px !important; }
      .qr-container img { max-width: 180px !important; }
    }
  </style>

  <table class="container" style="width:90%;max-width:900px;margin:40px auto;
  border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;
  overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td class="header" style="padding:24px;text-align:center;
      background:linear-gradient(90deg, #4CAF50, #45A049);color:#fff;">
        <h1 style="margin:0;font-size:26px;">🎉 Welcome to Innova Hack 2025!</h1>
        <p style="margin:8px 0 0 0;font-size:14px;opacity:0.9;">Your registration is confirmed</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td class="content" style="padding:24px;">
        <p style="margin:0 0 16px 0;font-size:16px;">Hi <strong>${data.leader?.name || 'Participant'}</strong>,</p>
        <p style="margin:0 0 16px 0;font-size:16px;">
          Congratulations! You're officially registered for <strong>Innova Hack 2025</strong>. 
          Your registration ID is <strong style="color:#4CAF50;">${registrationId}</strong>.
        </p>
        
        <!-- Event Details Box -->
        <div style="background:#f8f9fa;border-left:4px solid #4CAF50;padding:16px;margin:16px 0;border-radius:8px;">
          <h3 style="margin:0 0 8px 0;font-size:16px;color:#333;">📅 Event Details</h3>
          <p style="margin:0;font-size:14px;color:#666;">
            <strong>Date:</strong> February 1-2, 2025<br>
            <strong>Venue:</strong> VVIT Campus, Guntur<br>
            <strong>Duration:</strong> 24 Hours
          </p>
        </div>

        <p style="margin:16px 0;font-size:16px;">
          <strong>Important:</strong> Please present this QR code during check-in:
        </p>

        <!-- QR Code card -->
        <div class="qr-container" style="text-align:center;margin:20px auto;padding:20px;
        border:2px dashed #4CAF50;border-radius:16px;display:inline-block;
        background:linear-gradient(180deg, #fff 70%, #f9fff9 100%);
        box-shadow:0 4px 12px rgba(0,0,0,0.1);max-width:280px;">
          <p style="margin:0 0 12px 0;font-size:14px;color:#666;font-weight:500;">Check-in QR Code</p>
          <img src="${qrDataUrl}" alt="QR Code for ${registrationId}" 
          style="max-width:220px;border:1px solid #eee;padding:8px;
          border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.1);
          width:100%;height:auto;" />
          <p style="margin:8px 0 0 0;font-size:12px;color:#888;">ID: ${registrationId}</p>
        </div>

        <!-- Team Info -->
        <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin:20px 0;">
          <h3 style="margin:0 0 16px 0;font-size:18px;color:#333;">👥 Team Information</h3>
          <table class="team-table" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="font-size:15px;padding:8px 0;border-bottom:1px solid #eee;">
                <strong>Team Name:</strong> ${data.teamName || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;padding:8px 0;border-bottom:1px solid #eee;">
                <strong>Track:</strong> ${data.track || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;padding:8px 0;border-bottom:1px solid #eee;">
                <strong>College:</strong> ${data.college || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;padding:8px 0;">
                <strong>Team Size:</strong> ${data.teamSize || 'N/A'} members
              </td>
            </tr>
          </table>
        </div>

        <!-- Team Members -->
        <h3 style="margin:20px 0 12px 0;font-size:18px;color:#333;">🏆 Team Members</h3>
        <ul style="padding-left:20px;margin:0 0 24px 0;background:#f8f9fa;border-radius:8px;padding:16px;">
          ${[data.leader?.name + ' (Team Leader)', ...(data.members || [])]
            .filter(Boolean)
            .map(name => `<li style="font-size:15px;margin:6px 0;color:#555;">${name}</li>`)
            .join('')}
        </ul>

        <!-- Next Steps -->
        <div style="background:linear-gradient(90deg, #e8f5e8, #f0f8f0);border-radius:12px;padding:20px;margin:20px 0;">
          <h3 style="margin:0 0 12px 0;font-size:18px;color:#333;">🚀 What's Next?</h3>
          <ul style="margin:0;padding-left:20px;">
            <li style="margin:6px 0;font-size:14px;">Save this QR code for event check-in</li>
            <li style="margin:6px 0;font-size:14px;">Join our WhatsApp group for updates</li>
            <li style="margin:6px 0;font-size:14px;">Prepare your innovative ideas</li>
            <li style="margin:6px 0;font-size:14px;">Bring your laptops and chargers</li>
          </ul>
        </div>

        <!-- CTA Buttons -->
        <div style="text-align:center;margin:24px 0;">
          <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" 
          class="cta-button" style="display:inline-block;padding:12px 24px;margin:0 8px 8px 0;
          background:#4CAF50;color:#fff;text-decoration:none;font-weight:bold;
          border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            🌐 Visit Website
          </a>
          <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer" 
          class="cta-button" style="display:inline-block;padding:12px 24px;margin:0 8px 8px 0;
          background:#25D366;color:#fff;text-decoration:none;font-weight:bold;
          border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            💬 Join WhatsApp
          </a>
        </div>

        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#555;margin:0;text-align:center;">
          Questions? Contact us at <a href="mailto:ewbvvit@gmail.com" style="color:#4CAF50;">ewbvvit@gmail.com</a><br>
          If you did not register, you can safely ignore this email.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:16px;text-align:center;font-size:12px;
      color:#999;background:#f9f9f9;">
        <div style="margin-bottom:8px;">
          🏆 <strong>Innova Hack 2025</strong> | 24-Hour Innovation Challenge
        </div>
        <div>
          Powered by <strong>VVIT IUCEE Student Chapter</strong> | Guntur, Andhra Pradesh
        </div>
      </td>
    </tr>
  </table>
</div>
`

    // Send email to the actual participant
    const info = await transport.sendMail({
        from: emailFrom,
        to: data.leader.email, // Send to actual participant
        subject,
        html,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log(`Email sent to: ${data.leader.email}`);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}

testEmail().catch(console.error);