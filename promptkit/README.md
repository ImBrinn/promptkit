# 🧩 PromptKit

[![npm version](https://img.shields.io/npm/v/promptkit)](https://www.npmjs.com/package/promptkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, type-safe builder for structured LLM prompts with **zero dependencies**.

## Why PromptKit?
When working with LLMs (OpenAI, Anthropic, Gemini), managing complex prompts with variables, formats, and multi-turn conversations becomes messy fast. PromptKit gives you a clean, fluent API to build prompts predictably.

- **Zero dependencies:** Tiny footprint, runs anywhere (Node, Edge, Browser).
- **Fluent API:** Chainable methods for building prompts.
- **Variable interpolation:** Clean `{{variable}}` syntax with defaults.
- **Format enforcement:** Built-in instructions for JSON, Markdown, etc.
- **Type-safe:** Written in TypeScript.

## Quick Start

```bash
npm install promptkit
```

```typescript
import { prompt } from 'promptkit';

const messages = prompt()
  .system('You are an expert {{topic}} tutor.')
  .user('Explain {{concept}} to a 5-year-old.')
  .vars({
    topic: 'Physics',
    concept: 'Gravity'
  })
  .format('json')
  .build();

// Use `messages` directly with the OpenAI/Anthropic API!
```

## Advanced Usage

### Multi-turn conversations
```typescript
const chat = prompt()
  .system('You are a helpful assistant.')
  .user('What is 2+2?')
  .assistant('It is 4.')
  .user('And multiply that by 3?')
  .build();
```

### Variable Defaults
```typescript
// If name is not provided, it falls back to 'Guest'
prompt().user('Hello {{name:Guest}}').build();
```

## Output Formats
PromptKit can automatically inject strict formatting instructions into your system prompt:

- `.format('json')`
- `.format('markdown')`
- `.format('xml')`
- `.format('list')`

## License
MIT
