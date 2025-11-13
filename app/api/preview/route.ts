import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

/**
 * Preview API Route
 * Enables Contentful preview mode for draft content
 *
 * Usage: /api/preview?secret=YOUR_SECRET&slug=/path-to-preview
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '/';

  // Check the secret and next parameters
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode
  (await draftMode()).enable();

  // Redirect to the path from the fetched post
  redirect(slug);
}
