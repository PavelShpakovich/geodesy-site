import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Contentful Webhook Handler
 * Revalidates cache when content is published/unpublished in Contentful
 *
 * Webhook URL: https://your-domain.com/api/revalidate
 * Secret: Set in environment variable CONTENTFUL_REVALIDATE_SECRET
 */

// Content type to cache tag mapping
const CONTENT_TYPE_TAGS: Record<string, string[]> = {
  companyInfo: ['contentful', 'company-info'],
  service: ['contentful', 'services'],
  advantage: ['contentful', 'advantages'],
  seoPage: ['contentful', 'seo'],
};

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const secret = request.headers.get('x-contentful-webhook-secret');
    const expectedSecret = process.env.CONTENTFUL_REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error('CONTENTFUL_REVALIDATE_SECRET not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
    }

    if (secret !== expectedSecret) {
      console.error('Invalid webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse webhook payload
    const payload = await request.json();

    // Extract content type from payload
    const contentType = payload?.sys?.contentType?.sys?.id;
    const entryId = payload?.sys?.id;
    const topic = request.headers.get('x-contentful-topic');

    console.log('Contentful webhook received:', {
      contentType,
      entryId,
      topic,
    });

    // Get tags to revalidate based on content type
    const tags = CONTENT_TYPE_TAGS[contentType];

    if (!tags) {
      console.log(`No cache tags configured for content type: ${contentType}`);
      return NextResponse.json({
        success: true,
        message: 'No revalidation needed',
      });
    }

    // Revalidate all tags for this content type
    for (const tag of tags) {
      revalidateTag(tag, 'max'); // 'max' profile for immediate expiration
      console.log(`Revalidated cache tag: ${tag}`);
    }

    // For SEO pages, also revalidate specific page cache
    if (contentType === 'seoPage' && payload?.fields?.slug) {
      const slug = payload.fields.slug['en-US'] || payload.fields.slug;
      if (slug) {
        revalidateTag(`seo-${slug}`, 'max');
        console.log(`Revalidated cache tag: seo-${slug}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated',
      contentType,
      tags,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contentful revalidation webhook is active',
    timestamp: new Date().toISOString(),
  });
}
