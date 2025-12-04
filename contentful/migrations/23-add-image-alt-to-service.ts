import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const service = migration.editContentType('service');

  service
    .createField('imageAltText')
    .name('Image Alt Text')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  service.changeFieldControl('imageAltText', 'builtin', 'singleLine', {
    helpText: 'Alt text for the service image (for SEO and accessibility). Describe what is shown in the image.',
  });

  // Move imageAltText after image for logical ordering
  service.moveField('imageAltText').afterField('image');
};

module.exports = migration;
