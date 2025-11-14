import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const companyInfo = migration.editContentType('companyInfo');

  companyInfo
    .createField('instagram')
    .name('Instagram')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  companyInfo.changeFieldControl('instagram', 'builtin', 'singleLine', {
    helpText: 'Instagram username (e.g., geodesia.brest) or full URL',
  });
};

module.exports = migration;
