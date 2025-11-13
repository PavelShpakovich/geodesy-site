import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const companyInfo = migration
    .createContentType('companyInfo')
    .name('Company Information')
    .description('General company information (Single Type)')
    .displayField('name');

  companyInfo
    .createField('name')
    .name('Company Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  companyInfo
    .createField('description')
    .name('Description')
    .type('Text')
    .required(true)
    .validations([
      {
        size: { max: 500 },
      },
    ]);

  companyInfo
    .createField('address')
    .name('Address')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  companyInfo
    .createField('phone')
    .name('Phone')
    .type('Symbol')
    .required(true)
    .validations([
      {
        regexp: {
          pattern: '^\\+?\\d[\\d\\s\\-()]+$',
        },
      },
    ]);

  companyInfo
    .createField('email')
    .name('Email')
    .type('Symbol')
    .required(true)
    .validations([
      {
        regexp: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        },
      },
    ]);

  companyInfo
    .createField('workHours')
    .name('Work Hours')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: { max: 100 },
      },
    ]);

  companyInfo
    .createField('telegram')
    .name('Telegram')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  companyInfo
    .createField('viber')
    .name('Viber')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  companyInfo
    .createField('whatsapp')
    .name('WhatsApp')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  companyInfo.changeFieldControl('name', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('description', 'builtin', 'multipleLine');
  companyInfo.changeFieldControl('address', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('phone', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('email', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('workHours', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('telegram', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('viber', 'builtin', 'singleLine');
  companyInfo.changeFieldControl('whatsapp', 'builtin', 'singleLine');
};

module.exports = migration;
