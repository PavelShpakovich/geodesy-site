import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const service = migration.editContentType('service');

  service
    .createField('metaDescription')
    .name('Meta Description')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 160 },
      },
    ]);

  service.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText: 'SEO meta description for the service page (max 160 characters). If empty, uses the main description.',
  });

  // Move metaDescription after description for logical ordering
  service.moveField('metaDescription').afterField('description');
};

module.exports = migration;
