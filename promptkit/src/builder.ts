import { Message, PromptFormat, PromptVariables } from './types';
import { renderTemplate } from './template';
import { formatInstructions } from './formats';
import { validateVariables } from './validators';

export class PromptBuilder {
  private messages: Message[] = [];
  private variables: PromptVariables = {};
  private targetFormat?: PromptFormat;
  private maxTokenLimit?: number;

  /**
   * Add a system message.
   */
  system(content: string): this {
    this.messages.push({ role: 'system', content });
    return this;
  }

  /**
   * Add a user message.
   */
  user(content: string): this {
    this.messages.push({ role: 'user', content });
    return this;
  }

  /**
   * Add an assistant message.
   */
  assistant(content: string): this {
    this.messages.push({ role: 'assistant', content });
    return this;
  }

  /**
   * Set a variable for template interpolation.
   */
  var(key: string, value: any): this {
    this.variables[key] = value;
    return this;
  }

  /**
   * Set multiple variables at once.
   */
  vars(variables: PromptVariables): this {
    this.variables = { ...this.variables, ...variables };
    return this;
  }

  /**
   * Request a specific output format.
   */
  format(format: PromptFormat): this {
    this.targetFormat = format;
    return this;
  }

  /**
   * Set a maximum token limit for validation.
   */
  maxTokens(limit: number): this {
    this.maxTokenLimit = limit;
    return this;
  }

  /**
   * Build the final messages array with variables interpolated.
   */
  build(): Message[] {
    validateVariables(this.messages, this.variables);

    let finalMessages = this.messages.map((msg) => ({
      role: msg.role,
      content: renderTemplate(msg.content, this.variables),
    }));

    if (this.targetFormat) {
      const formatInstruction = formatInstructions(this.targetFormat);
      
      // Append format instruction to the last system message if it exists,
      // otherwise prepend a new system message or append to the last user message.
      const lastSystemIndex = [...finalMessages].reverse().findIndex(m => m.role === 'system');
      
      if (lastSystemIndex !== -1) {
        const actualIndex = finalMessages.length - 1 - lastSystemIndex;
        finalMessages[actualIndex].content += `\n\n${formatInstruction}`;
      } else {
        finalMessages = [
          { role: 'system', content: formatInstruction },
          ...finalMessages
        ];
      }
    }

    return finalMessages;
  }
  
  /**
   * Get the messages as a single string (useful for completion APIs).
   */
  toString(): string {
    return this.build()
      .map(m => `${m.role.toUpperCase()}:\n${m.content}`)
      .join('\n\n');
  }
}
