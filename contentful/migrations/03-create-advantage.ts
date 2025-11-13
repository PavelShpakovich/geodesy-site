import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const advantage = migration
    .createContentType('advantage')
    .name('Advantage')
    .description('Company advantages')
    .displayField('title');

  advantage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 60 },
      },
    ]);

  advantage
    .createField('description')
    .name('Description')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  advantage.changeFieldControl('title', 'builtin', 'singleLine');
  advantage.changeFieldControl('description', 'builtin', 'multipleLine');
};

module.exports = migration;
