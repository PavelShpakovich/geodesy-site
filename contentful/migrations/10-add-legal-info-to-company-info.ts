import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const companyInfo = migration.editContentType('companyInfo');

  companyInfo
    .createField('unp')
    .name('UNP')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 20 },
      },
    ]);

  companyInfo
    .createField('legalName')
    .name('Legal Name')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  // Банковские реквизиты
  companyInfo
    .createField('bankName')
    .name('Bank Name')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  companyInfo
    .createField('bankAccount')
    .name('Bank Account')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  companyInfo
    .createField('bic')
    .name('BIC')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 20 },
      },
    ]);

  // Field controls
  companyInfo.changeFieldControl('unp', 'builtin', 'singleLine', {
    helpText: 'Unified National Party number',
  });

  companyInfo.changeFieldControl('legalName', 'builtin', 'singleLine', {
    helpText: 'Full legal name of the organization',
  });

  companyInfo.changeFieldControl('bankName', 'builtin', 'singleLine', {
    helpText: 'Bank name for settlements',
  });

  companyInfo.changeFieldControl('bankAccount', 'builtin', 'singleLine', {
    helpText: 'Bank account number',
  });

  companyInfo.changeFieldControl('bic', 'builtin', 'singleLine', {
    helpText: 'Bank Identification Code',
  });
};

module.exports = migration;
