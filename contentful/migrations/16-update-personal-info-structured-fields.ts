import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration: Create separate content types for credentials and equipment
 *
 * This creates user-friendly content types with proper form fields:
 * - EducationItem: institution, degree, year
 * - CertificationItem: title, issuer, year
 * - LicenseItem: title, number, validUntil
 * - EquipmentItem: name, model, description
 *
 * Then updates PersonalInfo to reference these as linked entries.
 */

const migration: MigrationFunction = (migration) => {
  // =============================================
  // 1. CREATE EDUCATION ITEM CONTENT TYPE
  // =============================================
  const educationItem = migration
    .createContentType('educationItem')
    .name('Education Item')
    .description('Educational background entry')
    .displayField('institution');

  educationItem
    .createField('institution')
    .name('Institution')
    .type('Symbol')
    .required(true)
    .validations([{ size: { max: 200 } }]);

  educationItem
    .createField('degree')
    .name('Degree / Specialty')
    .type('Symbol')
    .required(true)
    .validations([{ size: { max: 200 } }]);

  educationItem
    .createField('year')
    .name('Year')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 20 } }]);

  educationItem.changeFieldControl('institution', 'builtin', 'singleLine', {
    helpText: 'Name of the educational institution',
  });
  educationItem.changeFieldControl('degree', 'builtin', 'singleLine', {
    helpText: 'Degree or specialty obtained',
  });
  educationItem.changeFieldControl('year', 'builtin', 'singleLine', {
    helpText: 'Graduation year (e.g., "2010" or "2008-2010")',
  });

  // =============================================
  // 2. CREATE CERTIFICATION ITEM CONTENT TYPE
  // =============================================
  const certificationItem = migration
    .createContentType('certificationItem')
    .name('Certification Item')
    .description('Professional certification entry')
    .displayField('title');

  certificationItem
    .createField('title')
    .name('Certification Title')
    .type('Symbol')
    .required(true)
    .validations([{ size: { max: 200 } }]);

  certificationItem
    .createField('issuer')
    .name('Issuing Organization')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 200 } }]);

  certificationItem
    .createField('year')
    .name('Year')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 20 } }]);

  certificationItem.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Name of the certification',
  });
  certificationItem.changeFieldControl('issuer', 'builtin', 'singleLine', {
    helpText: 'Organization that issued the certification',
  });
  certificationItem.changeFieldControl('year', 'builtin', 'singleLine', {
    helpText: 'Year obtained',
  });

  // =============================================
  // 3. CREATE LICENSE ITEM CONTENT TYPE
  // =============================================
  const licenseItem = migration
    .createContentType('licenseItem')
    .name('License Item')
    .description('Professional license entry')
    .displayField('title');

  licenseItem
    .createField('title')
    .name('License Title')
    .type('Symbol')
    .required(true)
    .validations([{ size: { max: 200 } }]);

  licenseItem
    .createField('number')
    .name('License Number')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 100 } }]);

  licenseItem
    .createField('validUntil')
    .name('Valid Until')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 50 } }]);

  licenseItem.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Name/type of the license',
  });
  licenseItem.changeFieldControl('number', 'builtin', 'singleLine', {
    helpText: 'License registration number',
  });
  licenseItem.changeFieldControl('validUntil', 'builtin', 'singleLine', {
    helpText: 'Expiration date or "Бессрочно" for permanent',
  });

  // =============================================
  // 4. CREATE EQUIPMENT ITEM CONTENT TYPE
  // =============================================
  const equipmentItem = migration
    .createContentType('equipmentItem')
    .name('Equipment Item')
    .description('Professional equipment entry')
    .displayField('name');

  equipmentItem
    .createField('name')
    .name('Equipment Name')
    .type('Symbol')
    .required(true)
    .validations([{ size: { max: 100 } }]);

  equipmentItem
    .createField('model')
    .name('Model')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 100 } }]);

  equipmentItem
    .createField('description')
    .name('Description')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 300 } }]);

  equipmentItem.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: 'Type of equipment (e.g., "Тахеометр", "GPS-приёмник")',
  });
  equipmentItem.changeFieldControl('model', 'builtin', 'singleLine', {
    helpText: 'Brand and model (e.g., "Leica TS06")',
  });
  equipmentItem.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'Brief description of capabilities',
  });

  // =============================================
  // 5. UPDATE PERSONAL INFO - REMOVE OLD FIELDS
  // =============================================
  const personalInfo = migration.editContentType('personalInfo');

  personalInfo.deleteField('education');
  personalInfo.deleteField('certifications');
  personalInfo.deleteField('licenses');
  personalInfo.deleteField('equipmentList');

  // =============================================
  // 6. UPDATE PERSONAL INFO - ADD REFERENCE FIELDS
  // =============================================

  // Education references
  personalInfo
    .createField('education')
    .name('Education')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['educationItem'] }],
    })
    .required(false);

  personalInfo.changeFieldControl('education', 'builtin', 'entryLinksEditor', {
    helpText: 'Add your educational background',
    bulkEditing: false,
  });

  // Certifications references
  personalInfo
    .createField('certifications')
    .name('Certifications')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['certificationItem'] }],
    })
    .required(false);

  personalInfo.changeFieldControl('certifications', 'builtin', 'entryLinksEditor', {
    helpText: 'Add your professional certifications',
    bulkEditing: false,
  });

  // Licenses references
  personalInfo
    .createField('licenses')
    .name('Licenses')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['licenseItem'] }],
    })
    .required(false);

  personalInfo.changeFieldControl('licenses', 'builtin', 'entryLinksEditor', {
    helpText: 'Add your professional licenses',
    bulkEditing: false,
  });

  // Equipment references
  personalInfo
    .createField('equipmentList')
    .name('Equipment')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['equipmentItem'] }],
    })
    .required(false);

  personalInfo.changeFieldControl('equipmentList', 'builtin', 'entryLinksEditor', {
    helpText: 'Add your professional equipment',
    bulkEditing: false,
  });
};

module.exports = migration;
