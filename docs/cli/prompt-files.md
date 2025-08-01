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

## How It Works

- Each prompt in the file is treated as a separate input
- Prompts are joined with double newlines (`\n\n`) to create a single input
- Empty lines are automatically filtered out
- The CLI processes all prompts in a single session

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