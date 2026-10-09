import { PromptFormat } from './types';

export function formatInstructions(format: PromptFormat): string {
  switch (format) {
    case 'json':
      return 'Please respond ONLY with valid JSON. Do not include any explanatory text before or after the JSON.';
    case 'xml':
      return 'Please respond ONLY with valid XML. Enclose your entire response in a root tag.';
    case 'markdown':
      return 'Please format your response using Markdown, including headers, lists, and code blocks where appropriate.';
    case 'list':
      return 'Please provide your response as a numbered or bulleted list.';
    case 'csv':
      return 'Please respond ONLY with valid CSV data, including a header row. Do not include any other text.';
    default:
      return '';
  }
}
