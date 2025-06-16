import { execSync } from 'child_process';
import * as path from 'path';

const exerciseName = process.argv[2];

if (!exerciseName) {
  console.error('Please provide an exercise name: npm run test-exercise <name>');
  process.exit(1);
}

const testFilePath = path.join(__dirname, `../tests/${exerciseName}.test.ts`);

try {
  // Use `vitest run` to execute tests for a specific file
  execSync(`npx vitest run ${testFilePath}`, { stdio: 'inherit' });
} catch (error) {
  console.error(`Tests for ${exerciseName} failed.`);
  process.exit(1);
}
