/**
 * Test workflow for API request delay and prompt injection features
 * 
 * This test demonstrates how to configure and use the new features:
 * 1. API request delay - adds a configurable delay after each API request
 * 2. Prompt injection - injects a configured prompt into each user message
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test configuration
const testConfig = {
  apiRequestDelay: 1000, // 1 second delay
  promptInjection: {
    enabled: true,
    prompt: "You are a helpful AI assistant. Always be concise and clear in your responses.",
    position: "prepend" // or "append"
  }
};

// Create test settings file
const settingsPath = path.join(process.cwd(), '.gemini', 'settings.json');
const settingsDir = path.dirname(settingsPath);

if (!fs.existsSync(settingsDir)) {
  fs.mkdirSync(settingsDir, { recursive: true });
}

const settings = {
  apiRequestDelay: testConfig.apiRequestDelay,
  promptInjection: testConfig.promptInjection
};

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

console.log('✅ Test configuration created:');
console.log(`   API Request Delay: ${testConfig.apiRequestDelay}ms`);
console.log(`   Prompt Injection: ${testConfig.promptInjection.enabled ? 'Enabled' : 'Disabled'}`);
console.log(`   Injection Position: ${testConfig.promptInjection.position}`);
console.log(`   Injection Prompt: "${testConfig.promptInjection.prompt}"`);
console.log('');

console.log('🧪 Testing features...');
console.log('');

// Test 1: Verify API request delay
console.log('Test 1: API Request Delay');
console.log('   - This should add a 1-second delay after each API request');
console.log('   - You should notice a pause between your message and the response');
console.log('');

// Test 2: Verify prompt injection
console.log('Test 2: Prompt Injection');
console.log('   - The configured prompt should be injected into each message');
console.log('   - Try asking: "What is 2+2?"');
console.log('   - The AI should respond as a helpful assistant (due to injected prompt)');
console.log('');

console.log('🚀 Starting Gemini CLI with test configuration...');
console.log('   Type your messages and observe the delay and prompt injection behavior');
console.log('   Press Ctrl+C to exit');
console.log('');

try {
  // Start the CLI with the test configuration
  execSync('npm run start', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  if (error.status !== 0) {
    console.log('Test completed or interrupted');
  }
}

// Cleanup
console.log('');
console.log('🧹 Cleaning up test configuration...');
if (fs.existsSync(settingsPath)) {
  fs.unlinkSync(settingsPath);
  console.log('✅ Test configuration removed');
} 