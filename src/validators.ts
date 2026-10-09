import { Message, PromptVariables } from './types';

/**
 * Validates that all required variables are present.
 * Extremely basic validation for now.
 */
export function validateVariables(messages: Message[], variables: PromptVariables): void {
  const missingVariables: string[] = [];
  
  for (const msg of messages) {
    const matches = msg.content.match(/\{\{\s*([\w.]+)(?:\s*:\s*([^}]+))?\s*\}\}/g);
    if (matches) {
      for (const match of matches) {
        // Extract the key part only
        const keyMatch = match.match(/\{\{\s*([\w.]+)/);
        if (keyMatch) {
          const key = keyMatch[1];
          // Check if it has a default
          const hasDefault = match.includes(':');
          
          if (!hasDefault && !getNestedValue(variables, key)) {
            missingVariables.push(key);
          }
        }
      }
    }
  }

  // Deduplicate and throw
  const uniqueMissing = [...new Set(missingVariables)];
  if (uniqueMissing.length > 0) {
    throw new Error(`Missing required variables in prompt: ${uniqueMissing.join(', ')}`);
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}
