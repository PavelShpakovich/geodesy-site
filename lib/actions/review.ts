'use server';

import nodemailer from 'nodemailer';
import { FORM, REVIEW_FORM } from '@/lib/constants/text';

interface ReviewFormState {
  success: boolean;
  message: string;
  errors?: string[];
}

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 2;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

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
    secure: secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

function generateStarRating(rating: number): string {
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return filled + empty;
}

export async function submitReviewForm(
  prevState: ReviewFormState | null,
  formData: FormData
): Promise<ReviewFormState> {
  try {
    const name = formData.get('name')?.toString().trim() || '';
    const location = formData.get('location')?.toString().trim() || '';
    const rating = parseInt(formData.get('rating')?.toString() || '0');
    const text = formData.get('text')?.toString().trim() || '';

    const errors: string[] = [];

    if (!name || name.length < 2 || name.length > 100) {
      errors.push(REVIEW_FORM.VALIDATION.NAME_LENGTH);
    }

    if (location && (location.length < 2 || location.length > 100)) {
      errors.push(REVIEW_FORM.VALIDATION.LOCATION_LENGTH);
    }

    if (!rating || rating < 1 || rating > 5) {
      errors.push(REVIEW_FORM.VALIDATION.RATING_REQUIRED);
    }

    if (!text || text.length < 20 || text.length > 1000) {
      errors.push(REVIEW_FORM.VALIDATION.TEXT_LENGTH);
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: FORM.VALIDATION.FORM_ERRORS,
        errors,
      };
    }

    if (!checkRateLimit('review-form')) {
      return {
        success: false,
        message: FORM.ERRORS.RATE_LIMIT,
        errors: [FORM.ERRORS.RATE_LIMIT_DETAIL],
      };
    }

    const transporter = createTransporter();

    if (!transporter) {
      console.error('SMTP not configured');
      return {
        success: false,
        message: FORM.ERRORS.SMTP_NOT_CONFIGURED,
        errors: [FORM.ERRORS.SMTP_ERROR],
      };
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.SMTP_FROM;
    const starRating = generateStarRating(rating);

    const mailOptions = {
      from: fromEmail,
      to: contactEmail,
      subject: `${REVIEW_FORM.EMAIL.SUBJECT} - ${starRating} от ${name}`,
      text: `
${REVIEW_FORM.EMAIL.HEADING}

Имя: ${name}
Город/район: ${location || 'Не указан'}
Оценка: ${starRating} (${rating}/5)

Текст отзыва:
${text}

---
Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' })}

Для публикации добавьте этот отзыв в Contentful.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f59e0b; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #f59e0b; }
    .stars { font-size: 24px; color: #f59e0b; }
    .review-text { white-space: pre-wrap; font-style: italic; }
    .notice { margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 5px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">⭐ ${REVIEW_FORM.EMAIL.HEADING}</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Имя:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Город/район:</div>
        <div class="value">${location || 'Не указан'}</div>
      </div>
      <div class="field">
        <div class="label">Оценка:</div>
        <div class="value">
          <span class="stars">${starRating}</span>
          <span style="color: #666; margin-left: 10px;">(${rating} из 5)</span>
        </div>
      </div>
      <div class="field">
        <div class="label">Текст отзыва:</div>
        <div class="value review-text">"${text}"</div>
      </div>
      <div class="notice">
        📋 <strong>Для публикации:</strong> Добавьте этот отзыв в Contentful CMS.<br>
        📅 <strong>Дата получения:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' })}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    console.log('Review submitted:', { name, location, rating });

    return {
      success: true,
      message: REVIEW_FORM.SUCCESS.MESSAGE,
    };
  } catch (error) {
    console.error('Error submitting review:', error);

    return {
      success: false,
      message: FORM.ERRORS.SERVER_ERROR,
      errors: [FORM.ERRORS.INTERNAL_ERROR],
    };
  }
}
