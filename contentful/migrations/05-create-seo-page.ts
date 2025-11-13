import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const seoPage = migration
    .createContentType('seoPage')
    .name('SEO Page')
    .description('SEO metadata for pages')
    .displayField('slug');

  seoPage
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[a-z0-9-]+$',
        },
        message: 'Slug must be lowercase letters, numbers, and hyphens only',
      },
    ]);

  seoPage
    .createField('title')
    .name('SEO Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 60 },
      },
    ]);

  seoPage
    .createField('description')
    .name('SEO Description')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 160 },
      },
    ]);

  seoPage.changeFieldControl('slug', 'builtin', 'slugEditor');
  seoPage.changeFieldControl('title', 'builtin', 'singleLine');
  seoPage.changeFieldControl('description', 'builtin', 'multipleLine');
};

module.exports = migration;
