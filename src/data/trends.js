/**
 * Trends and future outlook data
 */

export const trendsData = [
  {
    id: 'multimodal-ai',
    name: 'Multimodal AI',
    timeframe: '2025-2026',
    probability: 'high',
    impact: 'high',
    description: 'AI systems that can process multiple types of input (text, images, audio, video) simultaneously.'
  },
  {
    id: 'agentic-systems',
    name: 'Agentic AI Systems',
    timeframe: '2025-2027',
    probability: 'high',
    impact: 'very-high',
    description: 'AI systems that can autonomously plan, execute, and adapt their actions to achieve goals.'
  }
];

export const getTrendById = (id) => {
  return trendsData.find(trend => trend.id === id);
};