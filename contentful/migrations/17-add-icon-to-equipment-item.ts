import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration: Add icon field to Equipment Item content type
 *
 * Allows selecting an icon from a predefined list of Lucide icons
 * relevant to geodesy/surveying equipment.
 */

const migration: MigrationFunction = (migration) => {
  const equipmentItem = migration.editContentType('equipmentItem');

  equipmentItem
    .createField('icon')
    .name('Icon')
    .type('Symbol')
    .required(false)
    .validations([
      {
        in: [
          // GPS/Satellite equipment
          'Satellite',
          'Radio',
          'Signal',
          'Wifi',
          // Surveying/Measurement
          'Ruler',
          'Target',
          'Crosshair',
          'Focus',
          'ScanLine',
          'Aperture',
          // Technical equipment
          'Settings',
          'Wrench',
          'Cog',
          'CircuitBoard',
          // Camera/Scanning
          'Camera',
          'ScanSearch',
          'Scan',
          'View',
          // Navigation/Location
          'Compass',
          'MapPin',
          'Map',
          'Navigation',
          'LocateFixed',
          // Data/Computer
          'Monitor',
          'Laptop',
          'HardDrive',
          'Cpu',
          // Measurement tools
          'Scale',
          'Gauge',
          'Activity',
          'TrendingUp',
          // Other relevant
          'Telescope',
          'Binoculars',
          'Mountain',
          'TreePine',
          'Building',
          'Landmark',
        ],
      },
    ]);

  equipmentItem.changeFieldControl('icon', 'builtin', 'dropdown', {
    helpText: 'Select an icon to display with this equipment. Icons are from Lucide library.',
  });

  // Move icon field after name
  equipmentItem.moveField('icon').afterField('name');
};

module.exports = migration;
