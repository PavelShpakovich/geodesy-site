import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration: Add hero background images to company info
 * Adds fields for desktop and mobile hero background images
 */
const migration: MigrationFunction = (migration) => {
  const companyInfo = migration.editContentType('companyInfo');

  // Add hero desktop image field
  companyInfo
    .createField('heroImageDesktop')
    .name('Hero Image (Desktop)')
    .type('Link')
    .linkType('Asset')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ]);

  // Add hero mobile image field
  companyInfo
    .createField('heroImageMobile')
    .name('Hero Image (Mobile)')
    .type('Link')
    .linkType('Asset')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ]);

  // Update help text
  companyInfo.changeFieldControl('heroImageDesktop', 'builtin', 'assetLinkEditor', {
    helpText: 'Background image for hero section on desktop (recommended: 1920x1080px, landscape orientation)',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  companyInfo.changeFieldControl('heroImageMobile', 'builtin', 'assetLinkEditor', {
    helpText: 'Background image for hero section on mobile (recommended: 1080x1920px, portrait orientation)',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });
};

module.exports = migration;
