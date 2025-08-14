/**
 * Glossary data
 */

export const glossaryData = [
  {
    id: 'ai',
    term: 'Artificial Intelligence',
    definition: 'The simulation of human intelligence processes by machines.',
    category: 'core-concepts',
    difficulty: 'beginner'
  },
  {
    id: 'llm',
    term: 'Large Language Model',
    definition: 'A type of AI model designed to understand and generate human language.',
    category: 'architectures',
    difficulty: 'intermediate'
  }
];

export const getTermById = (id) => {
  return glossaryData.find(term => term.id === id);
};