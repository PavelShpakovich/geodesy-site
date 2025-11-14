import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const companyInfo = migration.editContentType('companyInfo');

  // УНП (Учетный номер плательщика)
  companyInfo
    .createField('unp')
    .name('УНП')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 20 },
      },
    ]);

  // Полное юридическое название
  companyInfo
    .createField('legalName')
    .name('Юридическое название')
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
    .name('Название банка')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 200 },
      },
    ]);

  companyInfo
    .createField('bankAccount')
    .name('Расчетный счет')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 50 },
      },
    ]);

  companyInfo
    .createField('bic')
    .name('БИК банка')
    .type('Symbol')
    .required(false)
    .validations([
      {
        size: { max: 20 },
      },
    ]);

  // Field controls
  companyInfo.changeFieldControl('unp', 'builtin', 'singleLine', {
    helpText: 'Учетный номер плательщика (УНП)',
  });

  companyInfo.changeFieldControl('legalName', 'builtin', 'singleLine', {
    helpText: 'Полное юридическое название организации',
  });

  companyInfo.changeFieldControl('bankName', 'builtin', 'singleLine', {
    helpText: 'Название банка для расчетов',
  });

  companyInfo.changeFieldControl('bankAccount', 'builtin', 'singleLine', {
    helpText: 'Номер расчетного счета',
  });

  companyInfo.changeFieldControl('bic', 'builtin', 'singleLine', {
    helpText: 'БИК банка',
  });
};

module.exports = migration;
