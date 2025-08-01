# Prompt Files

The Gemini CLI supports reading prompts from YAML files, allowing you to batch multiple prompts or maintain a collection of frequently used prompts.

## Quick Start

Use the `--prompt-file` (or `-f`) option to specify a YAML file containing prompts:

```bash
gemini --prompt-file prompts.yaml
```

## Table of Contents

- [YAML File Formats](#yaml-file-formats)
- [Multiline Prompts](#multiline-prompts)
- [How It Works](#how-it-works)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Limitations](#limitations)
- [Best Practices](#best-practices)

## YAML File Formats

The CLI supports several YAML formats for organizing your prompts:

### 1. Simple Array Format

```yaml
- "Write a Python function to calculate fibonacci numbers"
- "Explain the concept of recursion"
- "Create a simple REST API endpoint"
```

### 2. Object with Prompts Key

```yaml
prompts:
  - "Write a Python function to calculate fibonacci numbers"
  - "Explain the concept of recursion"
  - "Create a simple REST API endpoint"
```

### 3. Plain Text Format

If YAML parsing fails, the CLI will fall back to treating the file as plain text:

```text
Write a Python function to calculate fibonacci numbers
Explain the concept of recursion
Create a simple REST API endpoint
```

**Note:** This format is useful for simple prompt lists, but YAML formats are recommended for better structure and multiline support.

## Multiline Prompts

The CLI fully supports multiline prompts using YAML's multiline string features:

### Quoted Multiline Strings

```yaml
- "This is a multiline prompt
  that spans multiple lines
  within double quotes"
```

### Literal Block Scalars (`|`)

Preserves exact formatting and newlines:

```yaml
- |
  This is a literal block scalar
  that preserves newlines exactly
  as they appear in the YAML file.
  
  It can have multiple paragraphs
  and preserve all whitespace.
```

### Folded Block Scalars (`>`)

Folds newlines to spaces but preserves paragraph breaks:

```yaml
- >
  This is a folded block scalar
  that folds newlines to spaces
  but preserves paragraph breaks.
```

### With Escape Sequences

```yaml
- "This prompt uses \n explicit line breaks \n within quoted strings"
```

### Complex Examples

```yaml
- |
  Write a Python function that:
  
  1. Takes a list of numbers as input
  2. Returns the sum of all even numbers
  3. Handles edge cases like empty lists
  
  Example usage:
  
  result = sum_even_numbers([1, 2, 3, 4, 5])
  print(result)  # Should output: 6
```

## How It Works

- Each prompt in the file is treated as a separate input
- Prompts are joined with double newlines (`\n\n`) to create a single input
- Empty lines are automatically filtered out
- The CLI processes all prompts in a single session
- **Multiline prompts are fully supported** using YAML's multiline string features
- Newlines within individual prompts are preserved as intended

## Examples

### Basic Usage

Create a file `my-prompts.yaml`:

```yaml
- "What is the difference between let and const in JavaScript?"
- "Write a function to reverse a string"
- "Explain async/await in JavaScript"
```

Run the CLI:

```bash
gemini --prompt-file my-prompts.yaml
```

### With Additional Options

```bash
gemini --prompt-file prompts.yaml --model gemini-1.5-flash
```

### Advanced Example

```yaml
# Programming Fundamentals
- "Explain the difference between stack and heap memory"
- "What are the benefits of using TypeScript over JavaScript?"

# Code Generation
- |
  Write a function to validate email addresses:
  
  Requirements:
  - Must check for valid email format
  - Handle edge cases like empty strings
  - Return boolean result
  
  Example:
  
  isValidEmail("user@example.com") // true
  isValidEmail("invalid-email")    // false

# System Design
- "Design a simple caching system for a web application"
- "Explain the trade-offs between different database types"
```

## Error Handling

The CLI will exit with an error if:

- The specified file doesn't exist
- The YAML file is malformed
- The file contains no valid prompts

### Common Error Messages

```
Error: Failed to read prompt file 'nonexistent.yaml': ENOENT: no such file or directory
Error: Failed to read prompt file 'invalid.yaml': Unexpected scalar at node end
Error: No prompts found in file: empty.yaml
```

## Limitations

- Cannot be used with `--prompt` or `--prompt-interactive` options
- All prompts are processed in a single session
- The file must be valid YAML format

## Best Practices

### 1. **Use Descriptive Prompts**
Make your prompts clear and specific:

```yaml
# Good
- "Write a Python function that calculates the factorial of a number using recursion"

# Avoid
- "Write a function"
```

### 2. **Group Related Prompts**
Organize prompts by topic or purpose:

```yaml
# Frontend Development
- "Explain the Virtual DOM concept in React"
- "What are React hooks and when should you use them?"

# Backend Development
- "Design a RESTful API for a blog system"
- "Explain database normalization with examples"
```

### 3. **Keep Prompts Focused**
Each prompt should have a single, clear objective:

```yaml
# Good - Single focus
- "Explain the concept of closures in JavaScript"

# Avoid - Multiple topics
- "Explain closures, promises, and async/await in JavaScript"
```

### 4. **Use Comments**
Add YAML comments to document your prompt collection:

```yaml
# JavaScript Fundamentals
- "Explain the difference between var, let, and const"
- "What is hoisting and how does it work?"

# Advanced JavaScript
- "Explain the event loop and how it works"
- "What are generators and when should you use them?"
```

### 5. **Leverage Multiline for Complex Prompts**
Use multiline formats for detailed instructions:

```yaml
- |
  Create a comprehensive testing strategy for a React component:
  
  Requirements:
  - Unit tests for individual functions
  - Integration tests for component interactions
  - Accessibility testing
  - Performance testing
  
  Include examples of test cases and testing tools.
```

## Related Documentation

- [CLI Commands](./commands.md) - Overview of all CLI options
- [Configuration](./configuration.md) - CLI configuration options
- [Authentication](./authentication.md) - Setting up authentication 
