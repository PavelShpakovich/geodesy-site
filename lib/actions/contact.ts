'use server';

import nodemailer from 'nodemailer';
import { revalidatePath } from 'next/cache';
import { FORM } from '@/lib/constants/text';

// Types
interface FormState {
  success: boolean;
  message: string;
  errors?: string[];
}

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

// Validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{10,20}$/;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

/**
 * Check rate limit for IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Reset if window expired
  if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Check if limit exceeded
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  // Increment counter
  userLimit.count++;
  return true;
}

/**
 * Create SMTP transporter
 */
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  const port = parseInt(SMTP_PORT);
  const secure = SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: secure, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  });
}

/**
 * Server Action for contact form submission
 */
export async function submitContactForm(prevState: FormState | null, formData: FormData): Promise<FormState> {
  try {
    // Extract form data
    const name = formData.get('name')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validation
    const errors: string[] = [];

    if (!name || name.length < 2 || name.length > 100) {
      errors.push(FORM.VALIDATION.NAME_LENGTH);
    }

    if (!phone || !PHONE_REGEX.test(phone)) {
      errors.push(FORM.VALIDATION.PHONE_INVALID);
    }

    if (email && !EMAIL_REGEX.test(email)) {
      errors.push(FORM.VALIDATION.EMAIL_INVALID);
    }

    if (!message || message.length < 10 || message.length > 2000) {
      errors.push(FORM.VALIDATION.MESSAGE_LENGTH);
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: FORM.VALIDATION.FORM_ERRORS,
        errors,
      };
    }

    // Rate limiting (get IP from headers in middleware or pass as hidden field)
    // For now, we'll use a simple check - in production, handle this properly
    const ip = 'server-action'; // In real app, get from headers via middleware

    if (!checkRateLimit(ip)) {
      return {
        success: false,
        message: FORM.ERRORS.RATE_LIMIT,
        errors: [FORM.ERRORS.RATE_LIMIT_DETAIL],
      };
    }

    // Create email transporter
    const transporter = createTransporter();

    if (!transporter) {
      console.error('SMTP not configured');
      return {
        success: false,
        message: FORM.ERRORS.SMTP_NOT_CONFIGURED,
        errors: [FORM.ERRORS.SMTP_ERROR],
      };
    }

    // Prepare email
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.SMTP_FROM;

    const mailOptions = {
      from: fromEmail,
      to: contactEmail,
      subject: FORM.EMAIL.SUBJECT,
      text: `
${FORM.EMAIL.HEADING}

Имя: ${name}
Телефон: ${phone}
Email: ${email || FORM.EMAIL.NOT_PROVIDED}

Сообщение:
${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #64748b; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #64748b; }
    .message { white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">${FORM.EMAIL.EMAIL_HEADING}</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Имя:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Телефон:</div>
        <div class="value">${phone}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email || FORM.EMAIL.NOT_PROVIDED}</div>
      </div>
      <div class="field">
        <div class="label">Сообщение:</div>
        <div class="value message">${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Contact form submitted:', { name, phone, email: email || 'N/A' });

    // Revalidate contacts page cache
    revalidatePath('/contacts');

    return {
      success: true,
      message: FORM.SUCCESS.MESSAGE,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);

    return {
      success: false,
      message: FORM.ERRORS.SERVER_ERROR,
      errors: [FORM.ERRORS.INTERNAL_ERROR],
    };
  }
}
