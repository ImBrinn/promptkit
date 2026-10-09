export * from './builder';
export * from './template';
export * from './formats';
export * from './types';

import { PromptBuilder } from './builder';

/**
 * Create a new PromptBuilder instance.
 */
export function prompt(): PromptBuilder {
  return new PromptBuilder();
}
