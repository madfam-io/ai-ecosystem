/**
 * Hardware data for the AI ecosystem report
 */

export const hardwareTypes = {
  cpu: {
    id: 'cpu',
    name: 'Central Processing Unit (CPU)',
    description: '4-16 powerful cores',
    specs: {
      architecture: 'Few powerful cores',
      optimizedFor: 'Sequential processing',
      aiTrainingTime: 'Months to years',
      bestFor: 'General computing tasks'
    },
    visualization: {
      type: 'cores',
      count: 4,
      className: 'cpu-cores'
    }
  },
  gpu: {
    id: 'gpu',
    name: 'Graphics Processing Unit (GPU)',
    description: 'Thousands of parallel cores',
    specs: {
      architecture: 'Thousands of smaller cores',
      optimizedFor: 'Parallel processing',
      aiTrainingTime: 'Days to weeks',
      bestFor: 'Matrix multiplications, AI training'
    },
    visualization: {
      type: 'grid',
      count: 6,
      className: 'gpu-cores'
    }
  },
  tpu: {
    id: 'tpu',
    name: 'Tensor Processing Unit (TPU)',
    description: 'Systolic array architecture',
    specs: {
      architecture: 'Specialized systolic arrays',
      optimizedFor: 'Neural network computations',
      aiTrainingTime: 'Hours to days',
      bestFor: 'Large-scale AI model training'
    },
    visualization: {
      type: 'array',
      count: 4,
      className: 'tpu-array'
    }
  }
};

export const performanceData = {
  labels: ['Training Speed', 'Energy Efficiency', 'Cost Effectiveness', 'Parallel Processing'],
  datasets: [
    {
      label: 'CPU',
      data: [20, 60, 80, 30],
      backgroundColor: 'rgba(0, 35, 73, 0.6)',
      borderColor: 'rgba(0, 35, 73, 1)',
      borderWidth: 2
    },
    {
      label: 'GPU',
      data: [80, 40, 60, 90],
      backgroundColor: 'rgba(74, 144, 226, 0.6)',
      borderColor: 'rgba(74, 144, 226, 1)',
      borderWidth: 2
    },
    {
      label: 'TPU',
      data: [95, 80, 40, 95],
      backgroundColor: 'rgba(255, 107, 107, 0.6)',
      borderColor: 'rgba(255, 107, 107, 1)',
      borderWidth: 2
    }
  ]
};

export const cudaEcosystem = {
  title: 'The NVIDIA CUDA Ecosystem',
  layers: [
    {
      id: 'cuda-core',
      title: 'CUDA Core',
      description: 'Parallel computing platform',
      className: 'cuda-core'
    },
    {
      id: 'cuda-libraries',
      title: 'Optimized Libraries',
      description: 'High-performance computing libraries',
      className: 'cuda-libraries',
      items: ['cuDNN', 'cuBLAS', 'TensorRT']
    },
    {
      id: 'cuda-frameworks',
      title: 'AI Frameworks',
      description: 'Deep learning frameworks with CUDA support',
      className: 'cuda-frameworks',
      items: ['PyTorch', 'TensorFlow', 'JAX']
    }
  ]
};

export const chartConfig = {
  type: 'radar',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Hardware Performance Comparison'
      }
    }
  }
};