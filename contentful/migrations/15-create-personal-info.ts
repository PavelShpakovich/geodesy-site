import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const personalInfo = migration
    .createContentType('personalInfo')
    .name('Personal Info')
    .description('Personal/professional information for About page (Single Type)')
    .displayField('name');

  // === BASIC INFO ===

  // Owner Name
  personalInfo
    .createField('name')
    .name('Full Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  // Professional Title
  personalInfo
    .createField('title')
    .name('Professional Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  // Photo
  personalInfo
    .createField('photo')
    .name('Photo')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ]);

  // Personal Story / Bio
  personalInfo
    .createField('story')
    .name('Story / Bio')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 2000 },
      },
    ]);

  // === STATISTICS ===

  // Years in Business
  personalInfo
    .createField('yearsInBusiness')
    .name('Years in Business')
    .type('Integer')
    .required(false)
    .validations([
      {
        range: { min: 0, max: 100 },
      },
    ]);

  // Projects Completed
  personalInfo
    .createField('projectsCompleted')
    .name('Projects Completed')
    .type('Integer')
    .required(false)
    .validations([
      {
        range: { min: 0, max: 100000 },
      },
    ]);

  // Clients Served
  personalInfo
    .createField('clientsServed')
    .name('Clients Served')
    .type('Integer')
    .required(false)
    .validations([
      {
        range: { min: 0, max: 100000 },
      },
    ]);

  // Regions Served
  personalInfo
    .createField('regionsServed')
    .name('Regions Served')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  // === CREDENTIALS ===

  // Education (formatted text)
  personalInfo
    .createField('education')
    .name('Education')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 2000 },
      },
    ]);

  // Certifications (formatted text)
  personalInfo
    .createField('certifications')
    .name('Certifications')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 2000 },
      },
    ]);

  // Licenses (formatted text)
  personalInfo
    .createField('licenses')
    .name('Licenses')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 2000 },
      },
    ]);

  // === EQUIPMENT ===

  // Equipment Description
  personalInfo
    .createField('equipmentDescription')
    .name('Equipment Description')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 500 },
      },
    ]);

  // Equipment List (formatted text - name, model, description per line)
  personalInfo
    .createField('equipmentList')
    .name('Equipment List')
    .type('Text')
    .required(false)
    .validations([
      {
        size: { max: 3000 },
      },
    ]);

  // === FIELD CONTROLS ===

  personalInfo.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: 'Your full name (e.g., "Павел Шпакович")',
  });

  personalInfo.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Your professional title (e.g., "Инженер-геодезист")',
  });

  personalInfo.changeFieldControl('photo', 'builtin', 'assetLinkEditor', {
    helpText: 'Professional photo (recommended: square, min 400x400px)',
  });

  personalInfo.changeFieldControl('story', 'builtin', 'multipleLine', {
    helpText: 'Your personal story, mission statement, or professional bio. Supports line breaks.',
  });

  personalInfo.changeFieldControl('yearsInBusiness', 'builtin', 'numberEditor', {
    helpText: 'Number of years in the industry',
  });

  personalInfo.changeFieldControl('projectsCompleted', 'builtin', 'numberEditor', {
    helpText: 'Approximate number of completed projects',
  });

  personalInfo.changeFieldControl('clientsServed', 'builtin', 'numberEditor', {
    helpText: 'Approximate number of clients served',
  });

  personalInfo.changeFieldControl('regionsServed', 'builtin', 'singleLine', {
    helpText: 'Regions you serve (e.g., "Брест и Брестская область")',
  });

  personalInfo.changeFieldControl('education', 'builtin', 'multipleLine', {
    helpText: 'Education details. Format: Institution | Degree | Year (one per line)',
  });

  personalInfo.changeFieldControl('certifications', 'builtin', 'multipleLine', {
    helpText: 'Certifications. Format: Title | Issuer | Year (one per line)',
  });

  personalInfo.changeFieldControl('licenses', 'builtin', 'multipleLine', {
    helpText: 'Licenses. Format: Title | Number | Valid Until (one per line)',
  });

  personalInfo.changeFieldControl('equipmentDescription', 'builtin', 'multipleLine', {
    helpText: 'Brief description of your equipment approach',
  });

  personalInfo.changeFieldControl('equipmentList', 'builtin', 'multipleLine', {
    helpText: 'Equipment list. Format: Name | Model | Description (one item per line)',
  });
};

module.exports = migration;
