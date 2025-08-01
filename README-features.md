# New Features: API Request Delay and Prompt Injection

This document provides a quick overview of the two new features added to the Gemini CLI.

## 🚀 Features Overview

### 1. API Request Delay
Adds a configurable delay after each successful API request to the Gemini API.

**Use cases:**
- Rate limiting compliance
- Cost control
- Testing and debugging
- Simulating network conditions

### 2. Prompt Injection
Automatically injects a configured prompt into each user message before sending to the API.

**Use cases:**
- Consistent AI behavior
- Custom personas/roles
- Safety instructions
- Context enhancement

## ⚙️ Quick Configuration

Add to your `.gemini/settings.json`:

```json
{
  "apiRequestDelay": 1000,
  "promptInjection": {
    "enabled": true,
    "prompt": "You are a helpful AI assistant. Be concise and accurate.",
    "position": "prepend"
  }
}
```

## 🧪 Testing

Run the test script to see the features in action:

```bash
node test-workflows/api-delay-prompt-injection.test.js
```

## 📚 Documentation

For detailed documentation, see:
- [API Delay and Prompt Injection Guide](docs/features/api-delay-prompt-injection.md)
- [Example Configuration](examples/api-delay-prompt-injection-settings.json)

## 🔧 Implementation

The features are implemented in:
- **API Delay**: `packages/core/src/utils/retry.ts`
- **Prompt Injection**: `packages/cli/src/ui/hooks/useGeminiStream.ts`
- **Configuration**: `packages/core/src/config/config.ts` and `packages/cli/src/config/settings.ts`

## 🎯 Examples

### API Delay Only
```json
{
  "apiRequestDelay": 2000
}
```

### Prompt Injection Only
```json
{
  "promptInjection": {
    "enabled": true,
    "prompt": "You are a coding expert. Always provide code examples.",
    "position": "prepend"
  }
}
```

### Combined Usage
```json
{
  "apiRequestDelay": 1000,
  "promptInjection": {
    "enabled": true,
    "prompt": "You are a helpful assistant. Be concise and accurate.",
    "position": "prepend"
  }
}
``` 