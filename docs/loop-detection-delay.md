# Loop Detection Delay Mode

## Overview

The Gemini CLI now supports a configurable loop detection system that can either halt processing (default behavior) or delay and continue processing when a potential loop is detected.

## Problem

Previously, when the Gemini CLI detected a potential infinite loop (due to repetitive tool calls or content patterns), it would immediately halt the request with the message:

```
A potential loop was detected. This can happen due to repetitive tool calls or other model behavior. The request has been halted.
```

This behavior, while protective, could be frustrating when legitimate repetitive patterns are detected as loops.

## Solution

The new loop detection system supports two modes:

1. **Halt Mode** (default): Stops processing immediately when a loop is detected
2. **Delay Mode**: Shows a warning message, waits for a configurable delay, then resends the original prompt

## Configuration

You can configure loop detection behavior in your settings file (`~/.gemini/settings.json`):

```json
{
  "loopDetection": {
    "enabled": true,
    "mode": "delay",
    "delayMs": 2000,
    "warningMessage": "A potential loop was detected. Continuing after a delay..."
  }
}
```

### Configuration Options

- **`enabled`** (boolean, default: `true`): Enable or disable loop detection entirely
- **`mode`** (`'halt'` | `'delay'`, default: `'halt'`): 
  - `'halt'`: Stop processing immediately when loop is detected
  - `'delay'`: Show warning, wait for delay, then continue
- **`delayMs`** (number, default: `2000`): Delay in milliseconds when using delay mode
- **`warningMessage`** (string, optional): Custom warning message to display

## Usage Examples

### Default Behavior (Halt Mode)

```json
{
  "loopDetection": {
    "mode": "halt"
  }
}
```

When a loop is detected:
```
A potential loop was detected. This can happen due to repetitive tool calls or other model behavior. The request has been halted.
```

### Delay Mode

```json
{
  "loopDetection": {
    "mode": "delay",
    "delayMs": 3000
  }
}
```

When a loop is detected:
```
A potential loop was detected. This can happen due to repetitive tool calls or other model behavior. Continuing after a 3000ms delay...
```

After the delay, the original prompt is resent with a prefix: `[Retry after loop detection delay]`

### Disable Loop Detection

```json
{
  "loopDetection": {
    "enabled": false
  }
}
```

## Loop Detection Types

The system detects several types of loops:

1. **Consecutive Identical Tool Calls**: Same tool called repeatedly with same arguments
2. **Content Chanting**: Repetitive text patterns in the response
3. **LLM-Detected Loops**: AI model identifies conversation loops

## Testing

You can test the loop detection delay mode using the provided test script:

```bash
node test-workflows/loop-detection-delay-test.js
```

## Implementation Details

### Core Changes

1. **Configuration**: Added `LoopDetectionSettings` interface and configuration options
2. **Loop Detection Service**: Enhanced to support delay mode and configurable behavior
3. **Client**: Modified to handle delay mode events and continue processing
4. **UI**: Updated to show appropriate messages and handle delays

### Event Flow

1. Loop detection service monitors tool calls and content
2. When loop detected, checks configuration mode
3. If delay mode: yields `LoopDetected` event with delay info, waits for delay, then resends original prompt
4. If halt mode: yields `LoopDetected` event, stops processing
5. UI displays appropriate message and handles delay if needed

## Migration

Existing installations will continue to use the default halt mode. To enable delay mode, add the configuration to your settings file.

## Troubleshooting

### Loop Detection Too Sensitive

If legitimate repetitive patterns are being flagged as loops:

1. Increase the loop detection thresholds in the code
2. Use delay mode instead of halt mode
3. Disable loop detection entirely for specific use cases

### Delay Mode Not Working

1. Verify the configuration is correct in your settings file
2. Check that the `mode` is set to `'delay'`
3. Ensure `delayMs` is a positive number
4. Restart the Gemini CLI after changing settings

## Future Enhancements

Potential improvements to consider:

1. **Per-command configuration**: Allow different loop detection settings for different commands
2. **Adaptive delays**: Adjust delay time based on loop severity
3. **User confirmation**: Ask user whether to continue or halt when loop detected
4. **Loop history**: Track and report loop patterns for analysis 