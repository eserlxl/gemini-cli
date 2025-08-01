/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

/**
 * Reads prompts from a YAML file.
 * Each line in the file is treated as a separate prompt.
 * 
 * @param filePath - Path to the YAML file containing prompts
 * @returns Array of prompts from the file
 * @throws Error if file cannot be read or parsed
 */
export function readPromptsFromFile(filePath: string): string[] {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    
    // Parse YAML content
    const parsed = parse(fileContent);
    
    // Handle different YAML structures
    if (Array.isArray(parsed)) {
      // If it's an array, return it directly
      return parsed.map(prompt => String(prompt));
    } else if (typeof parsed === 'object' && parsed !== null) {
      // If it's an object, look for a 'prompts' key
      if (parsed.prompts && Array.isArray(parsed.prompts)) {
        return parsed.prompts.map((prompt: unknown) => String(prompt));
      }
      // If no 'prompts' key, treat the entire object as a single prompt
      return [JSON.stringify(parsed)];
    } else if (typeof parsed === 'string') {
      // If it's a string, split by newlines and filter out empty lines
      return parsed
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    } else {
      // Fallback: treat as string
      return [String(parsed)];
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read prompt file '${filePath}': ${error.message}`);
    }
    throw new Error(`Failed to read prompt file '${filePath}'`);
  }
}

/**
 * Validates that a prompt file exists and can be read.
 * 
 * @param filePath - Path to the YAML file
 * @returns true if file exists and is readable
 */
export function validatePromptFile(filePath: string): boolean {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    parse(fileContent); // Test parsing
    return true;
  } catch {
    return false;
  }
} 