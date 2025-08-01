# Prompt Files

The Gemini CLI supports reading prompts from YAML files, allowing you to batch multiple prompts or maintain a collection of frequently used prompts.

## Usage

Use the `--prompt-file` (or `-f`) option to specify a YAML file containing prompts:

```bash
gemini --prompt-file prompts.yaml
```

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

```yaml
Write a Python function to calculate fibonacci numbers
Explain the concept of recursion
Create a simple REST API endpoint
```

## Multiline Prompts

The CLI fully supports multiline prompts using YAML's multiline string features:

### Quoted Multiline Strings

```yaml
- "This is a multiline prompt
  that spans multiple lines
  within double quotes"
```

### Literal Block Scalars (|)

Preserves exact formatting and newlines:

```yaml
- |
  This is a literal block scalar
  that preserves newlines exactly
  as they appear in the YAML file.
  
  It can have multiple paragraphs
  and preserve all whitespace.
```

### Folded Block Scalars (>)

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
  ```python
  result = sum_even_numbers([1, 2, 3, 4, 5])
  print(result)  # Should output: 6
  ```
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

## Error Handling

The CLI will exit with an error if:

- The specified file doesn't exist
- The YAML file is malformed
- The file contains no valid prompts

## Limitations

- Cannot be used with `--prompt` or `--prompt-interactive` options
- All prompts are processed in a single session
- The file must be valid YAML format

## Best Practices

1. **Use descriptive prompt names**: Make your prompts clear and specific
2. **Group related prompts**: Organize prompts by topic or purpose
3. **Keep prompts focused**: Each prompt should have a single, clear objective
4. **Use comments**: Add YAML comments to document your prompt collection

```yaml
# Programming Questions
- "Explain the difference between stack and heap memory"
- "What are the benefits of using TypeScript over JavaScript?"

# Code Generation
- "Write a function to validate email addresses"
- "Create a simple CRUD API with Express.js"
``` 