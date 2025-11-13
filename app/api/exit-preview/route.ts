import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Exit Preview API Route
 * Disables Contentful preview mode
 *
 * Usage: /api/exit-preview?redirect=/path-to-redirect
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get('redirect') || '/';

  // Disable Draft Mode
  (await draftMode()).disable();

  // Redirect to the specified path
  redirect(redirectPath);
}
