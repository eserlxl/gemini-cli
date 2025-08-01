# API Request Delay and Prompt Injection Features

This document describes two new features added to the Gemini CLI:

1. **API Request Delay** - Configurable delay after each API request
2. **Prompt Injection** - Automatic injection of prompts into user messages

## API Request Delay

The API request delay feature adds a configurable delay after each successful API request to the Gemini API. This can be useful for:

- Rate limiting compliance
- Testing and debugging
- Reducing API usage costs
- Simulating slower network conditions

### Configuration

Add the following to your settings file (`.gemini/settings.json`):

```json
{
  "apiRequestDelay": 1000
}
```

- `apiRequestDelay`: Delay in milliseconds (0 = no delay, default)

### Example

```json
{
  "apiRequestDelay": 2000
}
```

This will add a 2-second delay after each API request.

## Prompt Injection

The prompt injection feature automatically injects a configured prompt into each user message before sending it to the Gemini API. This can be used for:

- Setting consistent behavior across all interactions
- Adding context or instructions to every message
- Implementing custom personas or roles
- Adding safety instructions or guidelines

### Configuration

Add the following to your settings file (`.gemini/settings.json`):

```json
{
  "promptInjection": {
    "enabled": true,
    "prompt": "You are a helpful AI assistant. Always be concise and clear in your responses.",
    "position": "prepend"
  }
}
```

### Parameters

- `enabled`: Boolean to enable/disable prompt injection (default: false)
- `prompt`: The text to inject into each message
- `position`: Where to inject the prompt
  - `"prepend"`: Add the prompt before the user's message
  - `"append"`: Add the prompt after the user's message

### Examples

#### Prepend Example
```json
{
  "promptInjection": {
    "enabled": true,
    "prompt": "You are a coding expert. Always provide code examples when relevant.",
    "position": "prepend"
  }
}
```

When a user types: "How do I create a function in JavaScript?"

The actual message sent to Gemini becomes:
```
You are a coding expert. Always provide code examples when relevant.

How do I create a function in JavaScript?
```

#### Append Example
```json
{
  "promptInjection": {
    "enabled": true,
    "prompt": "Please provide a brief summary of your response.",
    "position": "append"
  }
}
```

When a user types: "Explain machine learning"

The actual message sent to Gemini becomes:
```
Explain machine learning

Please provide a brief summary of your response.
```

## Combined Configuration

You can use both features together:

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

## Testing

You can test these features using the provided test script:

```bash
node test-workflows/api-delay-prompt-injection.test.js
```

This script will:
1. Create a test configuration
2. Start the CLI with the test settings
3. Allow you to interact and observe the features
4. Clean up the test configuration when done

## Implementation Details

### API Request Delay

The delay is implemented in the retry utility (`packages/core/src/utils/retry.ts`) and is applied after each successful API call. The delay is configured through the `RetryOptions.apiRequestDelay` parameter and is passed to all API calls made by the Gemini client.

### Prompt Injection

The prompt injection is implemented in the main CLI flow (`packages/cli/src/ui/hooks/useGeminiStream.ts`) in the `prepareQueryForGemini` function. It processes user messages before they are sent to the Gemini API, applying the configured injection based on the position setting.

## Use Cases

### API Request Delay Use Cases

1. **Rate Limiting**: When working with APIs that have strict rate limits
2. **Cost Control**: To reduce API usage and associated costs
3. **Testing**: To simulate real-world network conditions
4. **Debugging**: To observe API behavior with controlled timing

### Prompt Injection Use Cases

1. **Consistent Behavior**: Ensure the AI always follows certain guidelines
2. **Role Definition**: Define specific roles or personas for the AI
3. **Safety**: Add safety instructions or content guidelines
4. **Context**: Provide consistent context or background information
5. **Formatting**: Ensure responses follow a specific format or style

## Limitations

- The API request delay only applies to successful API calls, not failed ones
- Prompt injection is applied to all user messages, including those that might not need it
- The injected prompt counts towards the total token usage
- These features are CLI-specific and don't affect other interfaces

## Troubleshooting

### Delay Not Working
- Check that `apiRequestDelay` is set to a value greater than 0
- Verify the setting is in the correct location in your settings file
- Restart the CLI after changing the configuration

### Prompt Injection Not Working
- Ensure `promptInjection.enabled` is set to `true`
- Check that `promptInjection.prompt` contains the desired text
- Verify the `position` is set to either "prepend" or "append"
- Restart the CLI after changing the configuration 