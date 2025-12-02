import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const review = migration
    .createContentType('review')
    .name('Review')
    .description('Client reviews and testimonials')
    .displayField('authorName');

  // Author Name
  review
    .createField('authorName')
    .name('Author Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { min: 2, max: 100 },
      },
    ]);

  // Author Location (optional)
  review
    .createField('authorLocation')
    .name('Author Location')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  // Rating (1-5 stars)
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

  // Review Text
  review
    .createField('text')
    .name('Review Text')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { min: 10, max: 1000 },
      },
    ]);

  // Published Date
  review.createField('publishedAt').name('Published Date').type('Date').required(true);

  // Is Active (for soft-delete/hiding)
  review.createField('isActive').name('Is Active').type('Boolean').required(true);

  // Field controls
  review.changeFieldControl('authorName', 'builtin', 'singleLine', {
    helpText: 'Name of the person who left the review (e.g., "Иван Иванов" or "Александр М.")',
  });

  review.changeFieldControl('authorLocation', 'builtin', 'singleLine', {
    helpText: 'Optional: City or district (e.g., "г. Брест", "Брестский район")',
  });

  review.changeFieldControl('rating', 'builtin', 'rating', {
    helpText: 'Rating from 1 to 5 stars',
    stars: 5,
  });

  review.changeFieldControl('text', 'builtin', 'multipleLine', {
    helpText: 'The review text (10-1000 characters)',
  });

  review.changeFieldControl('publishedAt', 'builtin', 'datePicker', {
    helpText: 'Date when the review was received/published',
  });

  review.changeFieldControl('isActive', 'builtin', 'boolean', {
    helpText: 'Uncheck to hide this review from the website',
    trueLabel: 'Visible',
    falseLabel: 'Hidden',
  });
};

module.exports = migration;
