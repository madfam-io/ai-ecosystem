/**
 * Frameworks Module - Deep learning frameworks comparison
 */
import { getAllFrameworks } from '@data/frameworks.js';

export class FrameworksModule {
  constructor() {
    this.isInitialized = false;
    this.frameworks = getAllFrameworks();
  }

  async init() {
    try {
      this.renderFrameworkComparison();
      this.isInitialized = true;
      console.log('✓ Frameworks module initialized');
    } catch (error) {
      console.error('Failed to initialize frameworks module:', error);
    }
  }

  renderFrameworkComparison() {
    const container = document.getElementById('frameworkComparison');
    if (!container) return;

    container.innerHTML = `
      <div class="framework-grid">
        ${this.frameworks.map(framework => `
          <div class="framework-card ${framework.className}">
            <div class="framework-header">
              <h4>${framework.name}</h4>
              <span class="framework-badge">${framework.badge}</span>
            </div>
            <div class="framework-content">
              <div class="framework-strengths">
                <h5>Strengths</h5>
                <ul>
                  ${framework.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
              </div>
              <div class="framework-use-case">
                <h5>Best for</h5>
                <p>${framework.bestFor}</p>
              </div>
            </div>
            <div class="framework-popularity">
              <div class="popularity-bar ${framework.popularity.className}"></div>
              <span>${framework.popularity.percentage}% ${framework.popularity.description}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  handleResponsiveChange(isMobile) {
    const grid = document.querySelector('.framework-grid');
    if (grid) {
      if (isMobile) {
        grid.style.gridTemplateColumns = '1fr';
      } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
      }
    }
  }

  closeModals() {
    // Close any open modals
  }

  destroy() {
    this.isInitialized = false;
  }
}