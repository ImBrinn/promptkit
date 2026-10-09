import { PromptVariables } from './types';

/**
 * A lightweight template engine.
 * Supports:
 * - Simple interpolation: {{varName}}
 * - Default values: {{varName:defaultValue}}
 */
export function renderTemplate(template: string, variables: PromptVariables): string {
  if (!template) return '';

  return template.replace(/\{\{\s*([\w.]+)(?:\s*:\s*([^}]+))?\s*\}\}/g, (match, key, defaultValue) => {
    const value = getNestedValue(variables, key);
    
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    if (defaultValue !== undefined) {
      return defaultValue.trim();
    }
    
    // If we want strict mode, we could throw here. For now, leave the tag or empty string.
    return '';
  });
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}
