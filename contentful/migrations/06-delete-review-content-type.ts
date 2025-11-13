import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration: Delete Review Content Type
 *
 * Removes the review content type as we'll use external review platforms
 * (Google My Business, Yandex.Maps, etc.) instead of manual reviews
 */
const migration: MigrationFunction = (migration) => {
  // Delete the review content type
  migration.deleteContentType('review');
};

module.exports = migration;
