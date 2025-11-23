/**
 * Application-wide configuration constants
 */

/**
 * Revalidation time for ISR (Incremental Static Regeneration)
 * Pages will be revalidated every hour (3600 seconds)
 *
 * Note: Must be a literal number for Next.js segment config exports
 */
export const REVALIDATE_TIME = 3600 as const;

/**
 * Common page configuration
 */
export const PAGE_CONFIG = {
  CONTAINER_CLASSES: 'container py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6',
  CONTENT_GAP_CLASSES: 'flex flex-col gap-10 sm:gap-12 lg:gap-16',
} as const;
