#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const output = 'lib/contentful/types-generated.ts';

if (!spaceId || !token) {
  console.error('Error: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set');
  process.exit(1);
}

const command = `npx cf-content-types-generator -s ${spaceId} -t ${token} -o ${output} -X`;

console.log('Generating Contentful types...');
try {
  execSync(command, { stdio: 'inherit' });
  console.log('✅ Types generated successfully!');
} catch (error) {
  console.error('❌ Failed to generate types');
  process.exit(1);
}
