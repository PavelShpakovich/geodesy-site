import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const blogPost = migration
    .createContentType('blogPost')
    .name('Blog Post')
    .description('Blog articles for SEO and customer education')
    .displayField('title');

  // Title
  blogPost
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  // Slug for URL
  blogPost
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
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
          flags: 'i',
        },
        message: 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)',
      },
      {
        size: { max: 100 },
      },
    ]);

  // Short excerpt for previews
  blogPost
    .createField('excerpt')
    .name('Excerpt')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 300 },
      },
    ]);

  // Main content (Rich Text)
  blogPost
    .createField('content')
    .name('Content')
    .type('RichText')
    .required(true)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, underline, and code marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-2',
          'heading-3',
          'heading-4',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-asset-block',
          'hyperlink',
        ],
        message: 'Only specified node types are allowed',
      },
    ]);

  // Cover image
  blogPost
    .createField('coverImage')
    .name('Cover Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ]);

  // Published date
  blogPost.createField('publishedAt').name('Published Date').type('Date').required(true);

  // Author name
  blogPost
    .createField('author')
    .name('Author')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  // Reading time (calculated or manual)
  blogPost
    .createField('readingTime')
    .name('Reading Time (minutes)')
    .type('Integer')
    .required(false)
    .validations([
      {
        range: { min: 1, max: 60 },
      },
    ]);

  // SEO meta description (optional override)
  blogPost
    .createField('metaDescription')
    .name('Meta Description')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 160 },
      },
    ]);

  // Field controls
  blogPost.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The title of the blog post',
  });

  blogPost.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText: 'URL-friendly identifier (auto-generated from title)',
    trackingFieldId: 'title',
  });

  blogPost.changeFieldControl('excerpt', 'builtin', 'multipleLine', {
    helpText: 'Short summary for blog listing and social sharing (max 300 characters)',
  });

  blogPost.changeFieldControl('content', 'builtin', 'richTextEditor', {
    helpText: 'Main content of the blog post',
  });

  blogPost.changeFieldControl('coverImage', 'builtin', 'assetLinkEditor', {
    helpText: 'Featured image for the blog post (recommended: 1200x630px)',
  });

  blogPost.changeFieldControl('publishedAt', 'builtin', 'datePicker', {
    helpText: 'Publication date (used for sorting)',
  });

  blogPost.changeFieldControl('author', 'builtin', 'singleLine', {
    helpText: 'Author name (optional, defaults to company name)',
  });

  blogPost.changeFieldControl('readingTime', 'builtin', 'numberEditor', {
    helpText: 'Estimated reading time in minutes',
  });

  blogPost.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText: 'Custom meta description for SEO (optional, defaults to excerpt)',
  });
};

module.exports = migration;
