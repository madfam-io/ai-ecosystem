/**
 * Platform ecosystem data
 */

export const platformData = [
  {
    id: 'aws-bedrock',
    name: 'AWS Bedrock',
    type: 'major-cloud',
    focus: 'enterprise',
    models: 'Anthropic, Meta, Amazon, Cohere',
    pricing: 'Pay-per-token',
    features: 'Fully managed, integrated with AWS ecosystem, enterprise-grade security',
    strengths: ['Enterprise security', 'AWS integration', 'Multiple model providers'],
    limitations: ['AWS vendor lock-in', 'Limited customization'],
    costEstimate: { setup: 0, monthly: 500, perToken: 0.0008 }
  },
  {
    id: 'google-vertex-ai',
    name: 'Google Vertex AI',
    type: 'major-cloud',
    focus: 'enterprise',
    models: 'Google (Gemini), Anthropic, 150+ open-source models',
    pricing: 'Pay-per-token / Pay-per-hour',
    features: 'Model Garden, integrated MLOps tools, optimized for TPUs',
    strengths: ['TPU optimization', 'Model Garden', 'MLOps integration'],
    limitations: ['Google Cloud dependency', 'Complex pricing'],
    costEstimate: { setup: 0, monthly: 400, perToken: 0.0007 }
  },
  {
    id: 'azure-ai-foundry',
    name: 'Azure AI Foundry',
    type: 'major-cloud',
    focus: 'enterprise',
    models: 'OpenAI, Meta, Mistral',
    pricing: 'Pay-per-token',
    features: 'Deep integration with Microsoft services, access to latest OpenAI models',
    strengths: ['OpenAI partnership', 'Microsoft integration', 'Enterprise ready'],
    limitations: ['Microsoft ecosystem dependency', 'Limited model variety'],
    costEstimate: { setup: 0, monthly: 600, perToken: 0.001 }
  },
  {
    id: 'runpod',
    name: 'Runpod',
    type: 'specialized',
    focus: 'cost-effective',
    models: 'NVIDIA, AMD GPUs (various models)',
    pricing: 'Pay-per-hour GPU time',
    features: 'Flexible GPU instances, cost-effective, developer-friendly',
    strengths: ['Cost effective', 'Flexible deployment', 'Developer focused'],
    limitations: ['Limited enterprise features', 'Requires technical knowledge'],
    costEstimate: { setup: 50, monthly: 200, perToken: 0.0003 }
  },
  {
    id: 'together-ai',
    name: 'Together AI',
    type: 'specialized',
    focus: 'developer',
    models: 'Open-source models (Llama, Mistral, etc.)',
    pricing: 'Pay-per-token',
    features: 'Open-source focus, competitive pricing, fast inference',
    strengths: ['Open source models', 'Competitive pricing', 'Fast inference'],
    limitations: ['Limited proprietary models', 'Smaller scale'],
    costEstimate: { setup: 0, monthly: 100, perToken: 0.0002 }
  },
  {
    id: 'fireworks-ai',
    name: 'Fireworks AI',
    type: 'specialized',
    focus: 'developer',
    models: 'Fine-tuned and optimized open models',
    pricing: 'Pay-per-token',
    features: 'Optimized inference, custom fine-tuning, developer APIs',
    strengths: ['Optimized performance', 'Custom fine-tuning', 'Developer friendly'],
    limitations: ['Limited model selection', 'Newer platform'],
    costEstimate: { setup: 0, monthly: 150, perToken: 0.0004 }
  }
];

export const deploymentTypes = {
  serverless: {
    name: 'Serverless API',
    description: 'Pay-per-use with automatic scaling',
    pros: ['No infrastructure management', 'Automatic scaling', 'Pay only for usage'],
    cons: ['Cold start latency', 'Less control', 'Potential cost unpredictability'],
    bestFor: ['Variable workloads', 'Prototyping', 'Small to medium scale']
  },
  dedicated: {
    name: 'Dedicated Instance',
    description: 'Reserved compute capacity for consistent performance',
    pros: ['Predictable performance', 'Better for high volume', 'More control'],
    cons: ['Higher fixed costs', 'Need to manage scaling', 'Less cost efficient for low usage'],
    bestFor: ['High volume applications', 'Consistent workloads', 'Enterprise applications']
  },
  'self-hosted': {
    name: 'Self-Hosted',
    description: 'Deploy on your own infrastructure',
    pros: ['Full control', 'Data privacy', 'Potentially lower long-term costs'],
    cons: ['Infrastructure complexity', 'Ongoing maintenance', 'Higher technical requirements'],
    bestFor: ['Data-sensitive applications', 'High volume with technical expertise', 'Custom requirements']
  }
};

export const modelComplexity = {
  small: {
    name: 'Small (7B parameters)',
    description: 'Fast inference, lower costs, good for simple tasks',
    examples: ['Llama 2 7B', 'Mistral 7B', 'CodeLlama 7B'],
    costMultiplier: 1,
    performanceRating: 3
  },
  medium: {
    name: 'Medium (70B parameters)',
    description: 'Balanced performance and cost, suitable for most applications',
    examples: ['Llama 2 70B', 'Claude 3 Haiku', 'GPT-3.5 Turbo'],
    costMultiplier: 10,
    performanceRating: 4
  },
  large: {
    name: 'Large (405B+ parameters)',
    description: 'Highest quality, best for complex reasoning tasks',
    examples: ['GPT-4', 'Claude 3 Opus', 'Llama 3.1 405B'],
    costMultiplier: 50,
    performanceRating: 5
  }
};

/**
 * Calculate deployment costs based on parameters
 */
export function calculateDeploymentCost(params) {
  const {
    deploymentType,
    requestsPerMonth,
    avgTokensPerRequest,
    modelSize,
    platform = 'aws-bedrock'
  } = params;

  const platformInfo = platformData.find(p => p.id === platform);
  const deployment = deploymentTypes[deploymentType];
  const model = modelComplexity[modelSize];

  if (!platformInfo || !deployment || !model) {
    throw new Error('Invalid parameters for cost calculation');
  }

  const totalTokens = requestsPerMonth * avgTokensPerRequest;
  const baseTokenCost = platformInfo.costEstimate.perToken * model.costMultiplier;

  let monthlyCost = 0;
  let breakdown = {};

  switch (deploymentType) {
    case 'serverless':
      monthlyCost = totalTokens * baseTokenCost;
      breakdown = {
        tokenCost: monthlyCost,
        fixedCost: 0,
        total: monthlyCost
      };
      break;

    case 'dedicated':
      const dedicatedMultiplier = 0.7; // Dedicated instances are cheaper per token
      const fixedInstanceCost = platformInfo.costEstimate.monthly;
      const tokenCost = totalTokens * baseTokenCost * dedicatedMultiplier;
      
      monthlyCost = fixedInstanceCost + tokenCost;
      breakdown = {
        tokenCost: tokenCost,
        fixedCost: fixedInstanceCost,
        total: monthlyCost
      };
      break;

    case 'self-hosted':
      const infrastructureCost = 2000; // Estimated monthly infrastructure
      const maintenanceCost = 1500; // Estimated maintenance cost
      const setupCost = 10000; // One-time setup cost (amortized over 12 months)
      
      monthlyCost = infrastructureCost + maintenanceCost + (setupCost / 12);
      breakdown = {
        infrastructureCost,
        maintenanceCost,
        amortizedSetup: setupCost / 12,
        total: monthlyCost
      };
      break;
  }

  return {
    platform: platformInfo.name,
    deploymentType: deployment.name,
    modelSize: model.name,
    requestsPerMonth,
    avgTokensPerRequest,
    totalTokens,
    monthlyCost: Math.round(monthlyCost),
    breakdown,
    costPerRequest: monthlyCost / requestsPerMonth,
    costPerToken: monthlyCost / totalTokens
  };
}