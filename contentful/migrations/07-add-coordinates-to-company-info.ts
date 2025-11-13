import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const companyInfo = migration.editContentType('companyInfo');

  // Add latitude field
  companyInfo
    .createField('latitude')
    .name('Latitude')
    .type('Number')
    .required(false)
    .validations([
      {
        range: {
          min: -90,
          max: 90,
        },
      },
    ]);

  // Add longitude field
  companyInfo
    .createField('longitude')
    .name('Longitude')
    .type('Number')
    .required(false)
    .validations([
      {
        range: {
          min: -180,
          max: 180,
        },
      },
    ]);
};

module.exports = migration;
