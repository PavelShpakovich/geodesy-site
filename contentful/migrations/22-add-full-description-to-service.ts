import type { MigrationFunction } from 'contentful-migration';

/**
 * Adds fullDescription (Rich Text) field to Service content type.
 * This allows detailed content on individual service pages,
 * while the short description is used on the services listing.
 */
const migration: MigrationFunction = (migration) => {
  const service = migration.editContentType('service');

  service.createField('fullDescription', {
    name: 'Full Description',
    type: 'RichText',
    required: false,
    validations: [
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
      },
      {
        enabledMarks: ['bold', 'italic', 'underline'],
      },
    ],
  });

  service.changeFieldControl('fullDescription', 'builtin', 'richTextEditor', {
    helpText: 'Detailed description for the individual service page. Supports headings, lists, and images.',
  });

  service.moveField('fullDescription').afterField('description');
};

module.exports = migration;
