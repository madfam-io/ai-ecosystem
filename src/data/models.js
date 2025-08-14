/**
 * Models data and comparisons
 */

export const modelData = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    parameters: '1.76T',
    category: 'foundation',
    strengths: ['Reasoning', 'Code', 'Multimodal'],
    limitations: ['Context window', 'Cost'],
    pricing: 0.03
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    parameters: 'Unknown',
    category: 'foundation',
    strengths: ['Analysis', 'Writing', 'Safety'],
    limitations: ['Speed', 'Availability'],
    pricing: 0.015
  }
];

export const getModelById = (id) => {
  return modelData.find(model => model.id === id);
};