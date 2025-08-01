/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { IPromptProcessor } from './types.js';
import { CommandContext } from '../../ui/commands/types.js';

/**
 * A prompt processor that injects a configured prompt into user messages.
 * This can be used to prepend or append a specific prompt to all user inputs.
 */
export class PromptInjectionProcessor implements IPromptProcessor {
  constructor(
    private readonly injectionPrompt: string,
    private readonly position: 'prepend' | 'append' = 'prepend',
  ) {}

  async process(prompt: string, context: CommandContext): Promise<string> {
    if (!this.injectionPrompt.trim()) {
      return prompt;
    }

    if (this.position === 'prepend') {
      return `${this.injectionPrompt}\n\n${prompt}`;
    } else {
      return `${prompt}\n\n${this.injectionPrompt}`;
    }
  }
} 