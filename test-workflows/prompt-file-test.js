/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

// Test data
const testPrompts = [
  'Write a simple "Hello, World!" program in Python',
  'Explain what is machine learning in simple terms',
  'Create a function to calculate the factorial of a number'
];

// Create test YAML file
const testYamlContent = testPrompts.map(prompt => `- "${prompt}"`).join('\n');
const testFilePath = join(process.cwd(), 'test-prompts.yaml');

try {
  // Write test file
  writeFileSync(testFilePath, testYamlContent, 'utf8');
  console.log('✅ Created test YAML file');

  // Test the CLI with the prompt file
  console.log('🧪 Testing gemini-cli with prompt file...');
  
  const child = spawn('node', ['../bundle/gemini.js', '--prompt-file', testFilePath, '--help'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: process.cwd()
  });

  let output = '';
  let errorOutput = '';

  child.stdout.on('data', (data) => {
    output += data.toString();
  });

  child.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  child.on('close', (code) => {
    console.log(`Exit code: ${code}`);
    
    if (code === 0) {
      console.log('✅ CLI started successfully with prompt file option');
      
      // Check if the help output contains our new option
      if (output.includes('--prompt-file') || output.includes('-f')) {
        console.log('✅ --prompt-file option is available in CLI help');
      } else {
        console.log('❌ --prompt-file option not found in CLI help');
        console.log('Help output:', output);
      }
    } else {
      console.log('❌ CLI failed to start');
      console.log('Error output:', errorOutput);
    }
    
    // Clean up
    try {
      unlinkSync(testFilePath);
      console.log('✅ Cleaned up test file');
    } catch (err) {
      console.log('⚠️  Could not clean up test file:', err.message);
    }
  });

} catch (error) {
  console.error('❌ Test failed:', error.message);
  
  // Clean up on error
  try {
    unlinkSync(testFilePath);
  } catch (err) {
    // Ignore cleanup errors
  }
} 