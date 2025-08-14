/**
 * Hardware Module - Hardware simulator and specs
 */
export class HardwareModule {
  constructor() {
    this.isInitialized = false;
    this.currentTab = 'cpu';
  }

  async init() {
    try {
      this.initializeHardwareTabs();
      this.setupPerformanceChart();
      
      this.isInitialized = true;
      console.log('✓ Hardware module initialized with interactive simulator');
    } catch (error) {
      console.error('Failed to initialize hardware module:', error);
    }
  }

  initializeHardwareTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return; // No hardware section present
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        this.switchTab(tabName);
      });
    });
    
    // Initialize first tab as active
    this.switchTab('cpu');
  }

  switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.querySelector(`#${tabName}-tab`);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
    
    this.currentTab = tabName;
    this.animateHardwareVisuals(tabName);
  }

  animateHardwareVisuals(tabName) {
    const visual = document.querySelector(`#${tabName}-tab .spec-visual`);
    if (!visual) return;
    
    // Add animation class
    visual.style.animation = 'none';
    visual.offsetHeight; // Trigger reflow
    visual.style.animation = 'scaleIn 0.5s ease-out';
    
    // Animate cores based on type
    const cores = visual.querySelectorAll('.core, .mini-core, .array-cell');
    cores.forEach((core, index) => {
      setTimeout(() => {
        core.style.animation = 'pulse 1s ease-in-out infinite';
        core.style.animationDelay = `${index * 0.1}s`;
      }, 200);
    });
  }

  setupPerformanceChart() {
    const chartContainer = document.querySelector('#hardwarePerformanceChart');
    if (!chartContainer || !window.Chart) return;
    
    const ctx = chartContainer.getContext('2d');
    
    const performanceData = {
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

    const config = {
      type: 'radar',
      data: performanceData,
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

    new Chart(ctx, config);
  }

  handleResponsiveChange(isMobile) {
    const hardwareSpecs = document.querySelectorAll('.hardware-specs');
    hardwareSpecs.forEach(spec => {
      if (isMobile) {
        spec.style.gridTemplateColumns = '1fr';
        spec.style.gap = 'var(--spacing-md)';
      } else {
        spec.style.gridTemplateColumns = '1fr 2fr';
        spec.style.gap = 'var(--spacing-xl)';
      }
    });
  }

  closeModals() {
    // Close any open modals in hardware section
  }

  destroy() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
      button.removeEventListener('click', () => {});
    });
    
    this.isInitialized = false;
  }
}