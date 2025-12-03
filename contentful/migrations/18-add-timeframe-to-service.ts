import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const service = migration.editContentType('service');

  service
    .createField('timeframe')
    .name('Timeframe')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  service.changeFieldControl('timeframe', 'builtin', 'singleLine', {
    helpText: 'Например: "1-3 дня" или "от 1 дня"',
  });

  // Move timeframe after price for logical ordering
  service.moveField('timeframe').afterField('price');
};

module.exports = migration;
