import * as fs from 'fs';
import * as path from 'path';

const exerciseName = process.argv[2];

if (!exerciseName) {
  console.error('Please provide an exercise name: npm run create-exercise <name>');
  process.exit(1);
}

const srcDir = './src';
const testsDir = './tests';

const solutionFilePath = path.join(srcDir, `${exerciseName}.ts`);
const testFilePath = path.join(testsDir, `${exerciseName}.test.ts`);

// Create solution file
if (!fs.existsSync(solutionFilePath)) {
  fs.writeFileSync(solutionFilePath, `export function ${exerciseName}() {\n  // TODO: Implement your solution here\n}\n`);
  console.log(`Created solution file: ${solutionFilePath}`);
} else {
  console.log(`Solution file already exists: ${solutionFilePath}`);
}

// Create test file
if (!fs.existsSync(testFilePath)) {
  fs.writeFileSync(testFilePath, `import { ${exerciseName} } from '../src/${exerciseName}';\nimport { describe, it, expect } from 'vitest';\n\ndescribe('${exerciseName}', () => {\n  it('should pass', () => {\n    expect(${exerciseName}()).toBeUndefined();\n  });\n});\n`);
  console.log(`Created test file: ${testFilePath}`);
} else {
  console.log(`Test file already exists: ${testFilePath}`);
}
