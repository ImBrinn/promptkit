import { describe, it, expect } from 'vitest';
import { prompt } from '../src/index';

describe('PromptBuilder', () => {
  it('should build a simple prompt', () => {
    const result = prompt()
      .system('You are a helpful assistant.')
      .user('Hello!')
      .build();

    expect(result).toEqual([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello!' }
    ]);
  });

  it('should interpolate variables', () => {
    const result = prompt()
      .user('Hello {{name}}!')
      .var('name', 'World')
      .build();

    expect(result).toEqual([
      { role: 'user', content: 'Hello World!' }
    ]);
  });

  it('should apply formats', () => {
    const result = prompt()
      .system('You are an API.')
      .user('Get data')
      .format('json')
      .build();

    expect(result[0].content).toContain('valid JSON');
  });
});
