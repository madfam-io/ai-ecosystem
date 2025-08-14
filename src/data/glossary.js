/**
 * Comprehensive Glossary data for the AI ecosystem
 */

export const glossaryData = [
  {
    id: 'ai',
    term: 'Artificial Intelligence',
    definition: 'The simulation of human intelligence processes by machines, including learning, reasoning, and self-correction.',
    category: 'core-concepts',
    difficulty: 'beginner',
    examples: ['Virtual assistants like Siri', 'Recommendation systems', 'Autonomous vehicles'],
    relatedTerms: ['machine-learning', 'deep-learning', 'neural-networks']
  },
  {
    id: 'llm',
    term: 'Large Language Model',
    definition: 'A type of AI model trained on vast amounts of text data to understand and generate human language.',
    category: 'architectures',
    difficulty: 'intermediate',
    examples: ['GPT-4', 'Claude', 'Gemini'],
    relatedTerms: ['transformer', 'token', 'prompt']
  },
  {
    id: 'agent',
    term: 'AI Agent',
    definition: 'An autonomous system that can perceive its environment, make decisions, and take actions to achieve specific goals.',
    category: 'applications',
    difficulty: 'intermediate',
    examples: ['Autonomous trading bots', 'Smart home systems', 'Game AI characters'],
    relatedTerms: ['agentic-ai', 'tool-use', 'mcp']
  },
  {
    id: 'transformer',
    term: 'Transformer',
    definition: 'A neural network architecture that revolutionized natural language processing through attention mechanisms.',
    category: 'architectures',
    difficulty: 'advanced',
    examples: ['BERT', 'GPT series', 'T5'],
    relatedTerms: ['attention', 'encoder-decoder', 'self-attention']
  },
  {
    id: 'embedding',
    term: 'Embedding',
    definition: 'Numerical representations that capture the semantic meaning of words, sentences, or other data in a vector space.',
    category: 'core-concepts',
    difficulty: 'intermediate',
    examples: ['Word2Vec', 'Sentence embeddings', 'Image embeddings'],
    relatedTerms: ['vector-space', 'semantic-search', 'rag']
  },
  {
    id: 'machine-learning',
    term: 'Machine Learning',
    definition: 'A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.',
    category: 'core-concepts',
    difficulty: 'beginner',
    examples: ['Email spam detection', 'Product recommendations', 'Medical diagnosis'],
    relatedTerms: ['supervised-learning', 'unsupervised-learning', 'reinforcement-learning']
  },
  {
    id: 'neural-networks',
    term: 'Neural Networks',
    definition: 'Computing systems inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information.',
    category: 'architectures',
    difficulty: 'intermediate',
    examples: ['Feedforward networks', 'Convolutional networks', 'Recurrent networks'],
    relatedTerms: ['deep-learning', 'backpropagation', 'activation-function']
  },
  {
    id: 'deep-learning',
    term: 'Deep Learning',
    definition: 'A subset of machine learning using neural networks with multiple layers to model and understand complex patterns.',
    category: 'core-concepts',
    difficulty: 'intermediate',
    examples: ['Image recognition', 'Speech synthesis', 'Language translation'],
    relatedTerms: ['neural-networks', 'cnn', 'rnn']
  },
  {
    id: 'token',
    term: 'Token',
    definition: 'The basic unit of text that language models process, which can be words, subwords, or characters.',
    category: 'training',
    difficulty: 'intermediate',
    examples: ['Word tokens: "hello"', 'Subword tokens: "ing"', 'Character tokens: "a"'],
    relatedTerms: ['tokenization', 'vocabulary', 'context-window']
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning',
    definition: 'The process of adapting a pre-trained model for a specific task by training it on task-specific data.',
    category: 'training',
    difficulty: 'intermediate',
    examples: ['ChatGPT from GPT-3.5', 'Domain-specific BERT', 'Custom image classifiers'],
    relatedTerms: ['transfer-learning', 'pre-training', 'rlhf']
  },
  {
    id: 'rag',
    term: 'Retrieval-Augmented Generation',
    definition: 'A technique that combines information retrieval with text generation to provide more accurate and up-to-date responses.',
    category: 'applications',
    difficulty: 'advanced',
    examples: ['Document Q&A systems', 'Knowledge bases', 'Research assistants'],
    relatedTerms: ['vector-database', 'semantic-search', 'embedding']
  },
  {
    id: 'mcp',
    term: 'Model Context Protocol',
    definition: 'A standardized way for AI applications to connect with external data sources and tools.',
    category: 'business',
    difficulty: 'advanced',
    examples: ['Database connections', 'API integrations', 'Tool orchestration'],
    relatedTerms: ['agent', 'tool-use', 'integration']
  }
];

export const categories = {
  'core-concepts': 'Core Concepts',
  'architectures': 'Model Architectures',
  'training': 'Training & Learning',
  'applications': 'Applications',
  'business': 'Business & Ethics'
};

export const difficulties = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

export const quickReferenceCards = [
  {
    id: 'ai',
    icon: '🤖',
    title: 'Artificial Intelligence',
    definition: 'The simulation of human intelligence processes by machines',
    tags: ['Machine Learning', 'Deep Learning', 'Neural Networks']
  },
  {
    id: 'llm',
    icon: '📝',
    title: 'Large Language Model',
    definition: 'AI trained on vast text data to understand and generate human language',
    tags: ['Transformer', 'GPT', 'Token']
  },
  {
    id: 'agent',
    icon: '🎯',
    title: 'AI Agent',
    definition: 'A system that can perceive its environment and take autonomous actions',
    tags: ['Agentic AI', 'Tool Use', 'MCP']
  },
  {
    id: 'training',
    icon: '🎓',
    title: 'Machine Learning',
    definition: 'The process of teaching computers to learn patterns from data',
    tags: ['Training Data', 'Algorithm', 'Model']
  },
  {
    id: 'transformer',
    icon: '🔄',
    title: 'Transformer',
    definition: 'The architecture that revolutionized natural language processing',
    tags: ['Attention', 'BERT', 'GPT']
  },
  {
    id: 'embedding',
    icon: '📊',
    title: 'Embedding',
    definition: 'Numerical representations that capture the meaning of words or data',
    tags: ['Vector', 'Semantic Search', 'RAG']
  }
];

export const getTermById = (id) => {
  return glossaryData.find(term => term.id === id);
};

export const getTermsByCategory = (category) => {
  if (category === 'all') return glossaryData;
  return glossaryData.filter(term => term.category === category);
};

export const getTermsByDifficulty = (difficulty) => {
  if (difficulty === 'all') return glossaryData;
  return glossaryData.filter(term => term.difficulty === difficulty);
};

export const searchTerms = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return glossaryData.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) ||
    term.definition.toLowerCase().includes(lowercaseQuery) ||
    (term.examples && term.examples.some(example => 
      example.toLowerCase().includes(lowercaseQuery)
    ))
  );
};