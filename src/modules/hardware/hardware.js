/**
 * Hardware Module - Hardware simulator and specs
 */
import { hardwareTypes, performanceData, cudaEcosystem, chartConfig } from '@data/hardware.js';

export class HardwareModule {
  constructor() {
    this.isInitialized = false;
    this.currentTab = 'cpu';
    this.hardwareData = hardwareTypes;
    this.chart = null;
  }

  async init() {
    try {
      this.renderHardwareSimulator();
      this.initializeHardwareTabs();
      this.setupPerformanceChart();
      
      this.isInitialized = true;
      console.log('✓ Hardware module initialized with interactive simulator');
    } catch (error) {
      console.error('Failed to initialize hardware module:', error);
    }
  }

  renderHardwareSimulator() {
    const container = document.getElementById('hardwareSimulator');
    if (!container) return;

    // Generate the complete hardware simulator HTML
    container.innerHTML = `
      <h4>Interactive Hardware Comparison</h4>
      <div class="hardware-tabs">
        ${Object.keys(this.hardwareData).map((key, index) => 
          `<button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${key}">${this.hardwareData[key].name.split('(')[1].replace(')', '')}</button>`
        ).join('')}
      </div>
      
      <div class="hardware-content">
        ${Object.entries(this.hardwareData).map(([key, hardware], index) => 
          `<div id="${key}-tab" class="tab-content ${index === 0 ? 'active' : ''}">
            <div class="hardware-specs">
              <div class="spec-visual">
                ${this.generateVisualization(hardware)}
                <p>${hardware.description}</p>
              </div>
              <div class="spec-details">
                <h5>${hardware.name}</h5>
                <ul>
                  <li><strong>Architecture:</strong> ${hardware.specs.architecture}</li>
                  <li><strong>Optimized for:</strong> ${hardware.specs.optimizedFor}</li>
                  <li><strong>AI Training Time:</strong> ${hardware.specs.aiTrainingTime}</li>
                  <li><strong>Best for:</strong> ${hardware.specs.bestFor}</li>
                </ul>
              </div>
            </div>
          </div>`
        ).join('')}
      </div>
      
      <!-- Performance Chart -->
      <div class="performance-chart">
        <canvas id="hardwarePerformanceChart"></canvas>
      </div>

      <!-- CUDA Ecosystem -->
      <div class="cuda-ecosystem">
        <h4>${cudaEcosystem.title}</h4>
        <div class="ecosystem-diagram">
          ${cudaEcosystem.layers.map(layer => 
            `<div class="cuda-layer ${layer.className}">
              <h5>${layer.title}</h5>
              <p>${layer.description}</p>
              ${layer.items ? `
                <div class="${layer.id === 'cuda-libraries' ? 'library-items' : 'framework-items'}">
                  ${layer.items.map(item => 
                    `<span class="${layer.id === 'cuda-libraries' ? 'library-item' : 'framework-item'}">${item}</span>`
                  ).join('')}
                </div>
              ` : ''}
            </div>`
          ).join('')}
        </div>
      </div>
    `;
  }

  generateVisualization(hardware) {
    const viz = hardware.visualization;
    
    switch (viz.type) {
      case 'cores':
        return `
          <div class="${viz.className}">
            ${Array(viz.count).fill(0).map(() => '<div class="core"></div>').join('')}
          </div>
        `;
      case 'grid':
        return `
          <div class="${viz.className}">
            <div class="core-grid">
              ${Array(viz.count).fill(0).map(() => '<div class="mini-core"></div>').join('')}
            </div>
          </div>
        `;
      case 'array':
        return `
          <div class="${viz.className}">
            <div class="systolic-array">
              ${Array(viz.count).fill(0).map(() => '<div class="array-cell"></div>').join('')}
            </div>
          </div>
        `;
      default:
        return '<div class="default-visual">Hardware Visualization</div>';
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
    
    const config = {
      ...chartConfig,
      data: performanceData
    };

    this.chart = new Chart(ctx, config);
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
    
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    
    this.isInitialized = false;
  }
}