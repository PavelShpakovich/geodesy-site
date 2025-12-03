import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration to delete the seoPage content type.
 *
 * IMPORTANT: Before running this migration, you must manually delete all
 * seoPage entries in Contentful:
 *
 * 1. Go to Contentful dashboard
 * 2. Navigate to Content > SEO Page
 * 3. Select all entries and delete them
 * 4. Empty the trash if needed
 * 5. Then run this migration
 *
 * We moved to hardcoded SEO data in code to simplify CMS management.
 */
const migration: MigrationFunction = (migration) => {
  migration.deleteContentType('seoPage');
};

module.exports = migration;
