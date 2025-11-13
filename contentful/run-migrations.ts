import { runMigration } from 'contentful-migration';
import * as path from 'path';
import * as fs from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('📝 Loading environment from:', envPath);

const result = config({ path: envPath });

if (result.error) {
  console.error('⚠️  Warning: Could not load .env.local file');
  console.error('   Make sure .env.local exists in the project root');
}

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('\n❌ Error: Missing required environment variables');
  console.error('   CONTENTFUL_SPACE_ID:', SPACE_ID ? '✓ Set' : '✗ Missing');
  console.error('   CONTENTFUL_MANAGEMENT_TOKEN:', MANAGEMENT_TOKEN ? '✓ Set' : '✗ Missing');
  console.error('\n   Please ensure these are set in .env.local');
  process.exit(1);
}

console.log('✅ Environment variables loaded\n');

const migrationsDir = path.join(__dirname, 'migrations');
const migrationsLogPath = path.join(__dirname, '.migrations-log.json');

// Load or initialize migrations log
function loadMigrationsLog(): string[] {
  try {
    if (fs.existsSync(migrationsLogPath)) {
      const content = fs.readFileSync(migrationsLogPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    console.warn('⚠️  Could not read migrations log, starting fresh');
  }
  return [];
}

// Save migrations log
function saveMigrationsLog(completedMigrations: string[]) {
  fs.writeFileSync(migrationsLogPath, JSON.stringify(completedMigrations, null, 2), 'utf-8');
}

async function runMigrations() {
  console.log('🚀 Starting Contentful migrations...\n');

  // Load completed migrations
  const completedMigrations = loadMigrationsLog();
  
  if (completedMigrations.length > 0) {
    console.log(`📋 ${completedMigrations.length} migration(s) already applied:\n`);
    completedMigrations.forEach(m => console.log(`   ✓ ${m}`));
    console.log();
  }

  // Get all migration files
  const allFiles = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .sort();

  // Filter out already completed migrations
  const pendingFiles = allFiles.filter(file => !completedMigrations.includes(file));

  if (pendingFiles.length === 0) {
    console.log('✨ No new migrations to run. All migrations are up to date!\n');
    return;
  }

  console.log(`Found ${pendingFiles.length} pending migration(s) to run:\n`);
  pendingFiles.forEach(f => console.log(`   → ${f}`));
  console.log();

  for (const file of pendingFiles) {
    const migrationPath = path.join(migrationsDir, file);
    console.log(`📝 Running migration: ${file}`);

    try {
      await runMigration({
        spaceId: SPACE_ID,
        accessToken: MANAGEMENT_TOKEN,
        environmentId: ENVIRONMENT_ID,
        filePath: migrationPath,
        yes: true,
      });

      console.log(`✅ Completed: ${file}\n`);
      
      // Mark migration as completed
      completedMigrations.push(file);
      saveMigrationsLog(completedMigrations);
      
    } catch (error) {
      console.error(`❌ Failed: ${file}`);
      console.error(error);
      console.error('\n💡 Tip: If this migration should be skipped, manually add it to contentful/.migrations-log.json');
      process.exit(1);
    }
  }

  console.log('✨ All migrations completed successfully!\n');
  console.log('Next steps:');
  console.log('  1. Run: npm run contentful:types');
  console.log('  2. Add content in Contentful');
  console.log('  3. Run: npm run dev\n');
}

runMigrations().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
