import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const review = migration
    .createContentType('review')
    .name('Review')
    .description('Customer reviews')
    .displayField('author');

  review
    .createField('author')
    .name('Author')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  review
    .createField('text')
    .name('Review Text')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 500 },
      },
    ]);

  review
    .createField('rating')
    .name('Rating')
    .type('Integer')
    .required(true)
    .validations([
      {
        range: { min: 1, max: 5 },
      },
    ]);

  review.changeFieldControl('author', 'builtin', 'singleLine');
  review.changeFieldControl('text', 'builtin', 'multipleLine');
  review.changeFieldControl('rating', 'builtin', 'numberEditor');
};

module.exports = migration;
