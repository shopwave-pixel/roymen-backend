import nodemailer from 'nodemailer';

export interface SentEmailLog {
  id: string;
  to: string;
  subject: string;
  orderId: string;
  sentAt: string;
  previewUrl?: string;
  status: 'sent' | 'failed' | 'simulated';
}

// Memory array to log sent emails so that users can audit them via the Admin Cockpit
export const emailLogs: SentEmailLog[] = [];

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    console.log(`LOG: [ROYMEN] Production SMTP servers detected at ${smtpHost}. Dispatching real notifications.`);
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  }

  console.log("LOG: [ROYMEN] Running order email notifier in Ethereal Sandbox. Bootstrapping dynamic SMTP test account...");
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log(`LOG: [ROYMEN] Dynamic Ethereal test SMTP initialized. User credentials mapped: ${testAccount.user}`);
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } catch (error: any) {
    console.error("LOG: [ROYMEN] Ethereal on-the-fly registration failed, setting up mock fallback transporter. Details:", error.message || error);
    return {
      sendMail: async (options: any) => {
        console.log(`LOG: [ROYMEN_FALLBACK_SIMULATOR] Direct mail payload:\nTo: ${options.to}\nSubject: ${options.subject}\nBody length: ${options.html?.length} chars`);
        return { messageId: 'simulated-payload-' + Math.floor(Math.random() * 1000000) };
      }
    } as any;
  }
}

export async function sendOrderConfirmationEmail(order: any) {
  try {
    if (!transporterPromise) {
      transporterPromise = getTransporter();
    }
    const transporter = await transporterPromise;
    const recipientEmail = order.billingDetails?.email || 'customer@gmail.com';
    const recipientName = order.billingDetails?.name || 'Valued Customer';
    const orderId = order.id || order.orderId || 'ROY-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = order.subtotal || 0;
    const discount = order.discount || 0;
    const deliveryFee = order.deliveryFee || 0;
    const total = order.total || 0;
    const currency = '৳';
    
    // Process items html layout safely
    const itemsListHtml = (order.items || []).map((item: any) => `
      <tr style="border-bottom: 1px solid #f4f4f5;">
        <td style="padding: 12px 4px; font-size: 13px; color: #18181b; font-weight: 500;">
          <div style="font-weight: bold; color: #09090b;">${item.name}</div>
          <div style="color: #71717a; font-size: 11px; margin-top: 2px;">
            Size: <span style="color: #18181b; font-weight: 600;">${item.selectedSize || 'Standard'}</span> 
            | Color: <span style="color: #18181b; font-weight: 600;">${item.selectedColor || 'N/A'}</span>
          </div>
        </td>
        <td style="padding: 12px 4px; text-align: center; font-size: 13px; color: #71717a;">
          x${item.quantity}
        </td>
        <td style="padding: 12px 4px; text-align: right; font-size: 13px; color: #09090b; font-weight: bold; font-family: Courier, monospace;">
          ${currency}${item.price.toLocaleString()}
        </td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Invoice #${orderId}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.5; color: #18110b; -webkit-font-smoothing: antialiased; }
        </style>
      </head>
      <body style="background-color: #fafafa; margin: 0; padding: 24px 16px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ececec; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Banner Header -->
          <div style="background-color: #0d0d0d; border-bottom: 3px solid #d9a54e; padding: 36px 24px; text-align: center;">
            <div style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 0.35em; text-transform: uppercase; margin: 0;">ROYMEN</div>
            <div style="font-size: 10px; font-weight: bold; color: #d9a54e; letter-spacing: 0.18em; text-transform: uppercase; margin-top: 6px;">Luxury Menswear & Tailoring</div>
          </div>
          
          <!-- Wrapper Area -->
          <div style="padding: 32px 24px;">
            <div style="font-size: 18px; font-weight: bold; color: #09090b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Order Confirmed</div>
            <p style="font-size: 13.5px; color: #3f3f46; margin: 0 0 20px 0; line-height: 1.6;">
              Dear <strong>${recipientName}</strong>,
            </p>
            <p style="font-size: 13.5px; color: #3f3f46; margin: 0 0 24px 0; line-height: 1.6;">
              Thank you for choosing ROYMEN. Your luxury sartorial reservation is logged and is currently being hand-prepared. Below are your booking metadata status credentials and product line item breakdown:
            </p>

            <!-- Order Grid Card -->
            <div style="border: 1px solid #f4f4f5; background-color: #fafafa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
                <tr>
                  <td style="color: #71717a; padding: 4px 0; font-weight: 600;">Booking ID:</td>
                  <td style="color: #09090b; padding: 4px 0; text-align: right; font-family: monospace; font-weight: bold;">${orderId}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; padding: 4px 0; font-weight: 600;">Date/Timestamp:</td>
                  <td style="color: #09090b; padding: 4px 0; text-align: right;">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; padding: 4px 0; font-weight: 600;">Recipient Address:</td>
                  <td style="color: #09090b; padding: 4px 0; text-align: right; font-weight: 500;">${order.billingDetails?.address}, ${order.billingDetails?.district}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; padding: 4px 0; font-weight: 600;">Contact Phone:</td>
                  <td style="color: #09090b; padding: 4px 0; text-align: right; font-family: monospace;">${order.billingDetails?.phone}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; padding: 4px 0; font-weight: 600;">Payment Gateway:</td>
                  <td style="color: #09090b; padding: 4px 0; text-align: right; text-transform: uppercase; font-weight: bold;">${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</td>
                </tr>
              </table>
            </div>

            <!-- Attire Product Line Items -->
            <div style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid #09090b; padding-bottom: 6px; margin-bottom: 8px; color: #09090b;">Sartorial Order Items</div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="border-bottom: 1px solid #e4e4e7; font-size: 11px; text-transform: uppercase; color: #71717a;">
                  <th style="padding: 6px 4px; text-align: left;">Garment Description</th>
                  <th style="padding: 6px 4px; text-align: center; width: 60px;">Qty</th>
                  <th style="padding: 6px 4px; text-align: right; width: 100px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsListHtml}
              </tbody>
            </table>

            <!-- Financial Layout Table -->
            <div style="width: 100%; margin-left: auto; max-width: 260px;">
              <table style="width: 100%; font-size: 12.5px; border-collapse: collapse; line-height: 1.8;">
                <tr>
                  <td style="color: #71717a; padding: 2px 0;">Subtotal Value:</td>
                  <td style="color: #09090b; text-align: right; font-family: monospace;">${currency}${subtotal.toLocaleString()}</td>
                </tr>
                ${discount > 0 ? `
                <tr>
                  <td style="color: #ef4444; padding: 2px 0;">Coupon Discount (${discount === Math.round(subtotal * 0.15) ? '15%' : '10%'}):</td>
                  <td style="color: #ef4444; text-align: right; font-family: monospace;">-${currency}${discount.toLocaleString()}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #71717a; padding: 2px 0;">Delivery Logistics:</td>
                  <td style="color: #09090b; text-align: right; font-family: monospace;">${deliveryFee === 0 ? 'FREE' : `${currency}${deliveryFee}`}</td>
                </tr>
                <tr style="border-top: 1.5px solid #09090b; font-size: 14px; font-weight: bold;">
                  <td style="color: #09090b; padding: 8px 0 0 0; text-transform: uppercase;">Total Invoice BDT:</td>
                  <td style="color: #d9a54e; text-align: right; padding: 8px 0 0 0; font-family: monospace; font-size: 15px;">${currency}${total.toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- Call to action button -->
            <div style="text-align: center; margin-top: 36px; margin-bottom: 12px;">
              <a href="${process.env.APP_URL || 'https://roymen.com'}/orders" target="_blank" style="background-color: #09090b; border: 1px solid #1f1f1f; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; display: inline-block;">
                Track My Booking
              </a>
            </div>

          </div>

          <!-- Footer legal credentials -->
          <div style="background-color: #f7f7f7; border-top: 1px solid #ececec; padding: 20px 24px; text-align: center; font-size: 11px; color: #8e8e93; line-height: 1.5;">
            <p style="margin: 0 0 6px 0;">This email is an automatically dispatched transactional invoice of order creation.</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} ROYMEN Bangladesh Ltd. Banani Sector 11, Dhaka. All rights reserved.</p>
          </div>

        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'ROYMEN Concierge'}" <${process.env.SMTP_FROM_EMAIL || 'concierge@roymen.com'}>`,
      to: recipientEmail,
      subject: `[ROYMEN] Order Confirmation #${orderId}`,
      html: emailHtml
    });

    let previewUrl: string | undefined;
    if (info) {
      previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
      if (previewUrl) {
        console.log(`\n=======================================================\n🌟 [ROYMEN AUTO MAIL] Sandbox test email created!\nRecipient Customer email: ${recipientEmail}\nClick to preview email body: ${previewUrl}\n=======================================================\n`);
      } else {
        console.log(`LOG: [ROYMEN] Email successfully dispatched to ${recipientEmail} with id: ${info.messageId}`);
      }
    }

    const logEntry: SentEmailLog = {
      id: info?.messageId || 'email-' + Math.floor(Math.random() * 1000000),
      to: recipientEmail,
      subject: `[ROYMEN] Order Confirmation #${orderId}`,
      orderId,
      sentAt: new Date().toISOString(),
      previewUrl,
      status: previewUrl ? 'simulated' : 'sent'
    };

    emailLogs.push(logEntry);

  } catch (error: any) {
    console.error("LOG: [ROYMEN] Failed to automatically dispatch order email:", error.message || error);
    emailLogs.push({
      id: 'fail-' + Math.floor(Math.random() * 1000000),
      to: order.billingDetails?.email || 'unknown',
      subject: 'Fallback Order Notify Failure',
      orderId: order.id || order.orderId || 'unknown',
      sentAt: new Date().toISOString(),
      status: 'failed'
    });
  }
}
