import type { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const advantage = migration.editContentType('advantage');

  advantage
    .createField('icon')
    .name('Icon')
    .type('Symbol')
    .required(false)
    .validations([
      {
        in: [
          'Satellite',
          'UserCheck',
          'Clock',
          'ShieldCheck',
          'BadgePercent',
          'FileText',
          'Award',
          'CheckCircle',
          'Star',
          'Zap',
          'Target',
          'ThumbsUp',
          'Heart',
          'Shield',
          'Lock',
          'Briefcase',
          'Calculator',
          'Map',
          'MapPin',
          'Compass',
          'Ruler',
          'PenTool',
          'Settings',
          'Wrench',
          'Phone',
          'Mail',
          'MessageSquare',
          'Users',
          'Building',
          'Home',
          'Landmark',
          'TreePine',
          'Mountain',
        ],
      },
    ]);

  advantage.changeFieldControl('icon', 'builtin', 'dropdown', {
    helpText: 'Select an icon to display with this advantage. Icons are from Lucide library.',
  });

  // Move icon field after title
  advantage.moveField('icon').afterField('title');
};

module.exports = migration;
