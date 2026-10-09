import { describe, it, expect } from 'vitest';
import { renderTemplate } from '../src/template';

describe('Template Engine', () => {
  it('should render simple variables', () => {
    const result = renderTemplate('Hello {{name}}', { name: 'Alice' });
    expect(result).toBe('Hello Alice');
  });

  it('should handle missing variables with defaults', () => {
    const result = renderTemplate('Hello {{name:Guest}}', {});
    expect(result).toBe('Hello Guest');
  });

  it('should handle nested variables', () => {
    const result = renderTemplate('User: {{user.name}}', { user: { name: 'Bob' } });
    expect(result).toBe('User: Bob');
  });
});
