export type Role = 'system' | 'user' | 'assistant' | 'function' | 'tool';

export interface Message {
  role: Role;
  content: string;
  name?: string;
}

export interface PromptVariables {
  [key: string]: any;
}

export type PromptFormat = 'json' | 'xml' | 'markdown' | 'list' | 'csv';
