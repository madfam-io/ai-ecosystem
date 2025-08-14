/**
 * Deep Learning Frameworks data
 */

export const frameworks = {
  pytorch: {
    id: 'pytorch',
    name: 'PyTorch',
    badge: 'Research Favorite',
    className: 'pytorch',
    strengths: [
      'Pythonic design',
      'Eager execution',
      'Easy debugging',
      'Academic standard'
    ],
    bestFor: 'Research, prototyping, and iterative development',
    popularity: {
      percentage: 85,
      description: 'Research adoption',
      className: 'pytorch-bar'
    }
  },
  tensorflow: {
    id: 'tensorflow',
    name: 'TensorFlow',
    badge: 'Production Ready',
    className: 'tensorflow',
    strengths: [
      'Static computation graphs',
      'Production optimization',
      'Mobile deployment',
      'Ecosystem maturity'
    ],
    bestFor: 'Large-scale production deployments',
    popularity: {
      percentage: 70,
      description: 'Production use',
      className: 'tensorflow-bar'
    }
  },
  jax: {
    id: 'jax',
    name: 'JAX',
    badge: 'High Performance',
    className: 'jax',
    strengths: [
      'NumPy-like API',
      'JIT compilation',
      'Functional programming',
      'XLA optimization'
    ],
    bestFor: 'High-performance numerical computing',
    popularity: {
      percentage: 25,
      description: 'Growing adoption',
      className: 'jax-bar'
    }
  }
};

export const getFrameworkById = (id) => {
  return frameworks[id];
};

export const getAllFrameworks = () => {
  return Object.values(frameworks);
};