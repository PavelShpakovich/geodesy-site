import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const service = migration
    .createContentType('service')
    .name('Service')
    .description('Geodesy services offered')
    .displayField('title');

  service
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  service.createField('description').name('Description').type('Text').required(true);

  service
    .createField('price')
    .name('Price')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  service
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

  service
    .createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ]);

  service.changeFieldControl('title', 'builtin', 'singleLine');
  service.changeFieldControl('description', 'builtin', 'multipleLine');
  service.changeFieldControl('price', 'builtin', 'singleLine');
  service.changeFieldControl('slug', 'builtin', 'slugEditor');
  service.changeFieldControl('image', 'builtin', 'assetLinkEditor');
};

module.exports = migration;
