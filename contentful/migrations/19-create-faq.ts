import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const faq = migration
    .createContentType('faq')
    .name('FAQ')
    .description('Frequently asked questions')
    .displayField('question');

  // Question
  faq
    .createField('question')
    .name('Question')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  // Answer
  faq
    .createField('answer')
    .name('Answer')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 1000 },
      },
    ]);

  // Order for sorting
  faq
    .createField('order')
    .name('Order')
    .type('Integer')
    .required(false)
    .validations([
      {
        range: { min: 0, max: 100 },
      },
    ]);

  // Field controls
  faq.changeFieldControl('question', 'builtin', 'singleLine', {
    helpText: 'The question text',
  });

  faq.changeFieldControl('answer', 'builtin', 'multipleLine', {
    helpText: 'The answer text (max 1000 characters)',
  });

  faq.changeFieldControl('order', 'builtin', 'numberEditor', {
    helpText: 'Display order (lower numbers appear first)',
  });
};

module.exports = migration;
