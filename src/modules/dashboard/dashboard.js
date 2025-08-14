/**
 * Dashboard Module - Market metrics and overview
 */
export class DashboardModule {
  constructor() {
    this.isInitialized = false;
    this.metricCards = [];
    this.observers = [];
  }

  async init() {
    try {
      // Initialize interactive features
      await this.initializeMetricCards();
      this.setupScrollAnimations();
      this.setupEcosystemInteractions();
      this.initializeMarketMetrics();
      
      this.isInitialized = true;
      console.log('✓ Dashboard module initialized with interactive metrics');
    } catch (error) {
      console.error('Failed to initialize dashboard module:', error);
    }
  }


  async initializeMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
      const valueElement = card.querySelector('.metric-value');
      const target = parseInt(valueElement.dataset.target);
      
      if (target) {
        this.animateValue(valueElement, 0, target, 2000);
      }
    });
  }

  animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end < 100 && end % 1 !== 0;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      
      if (isDecimal) {
        element.textContent = `$${current.toFixed(2)}B`;
      } else if (end > 10) {
        element.textContent = `$${Math.floor(current)}B`;
      } else {
        element.textContent = Math.floor(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  setupScrollAnimations() {
    // Only add animations as progressive enhancement
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add enhancement animation class
          entry.target.classList.add('animate-in');
          
          // Trigger metric animations when dashboard comes into view
          if (entry.target.classList.contains('dashboard-container')) {
            this.animateMetricCards();
          }
          
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Only observe elements if animations are supported
    if (window.IntersectionObserver && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const dashboardElements = document.querySelectorAll('.dashboard-container, .ecosystem-layer, .timeline-item');
      dashboardElements.forEach(el => {
        observer.observe(el);
      });
      
      this.observers.push(observer);
    }
  }

  animateMetricCards() {
    // Separate method for metric animations
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100); // Stagger the animations
    });
  }

  setupEcosystemInteractions() {
    const ecosystemItems = document.querySelectorAll('.ecosystem-item');
    
    ecosystemItems.forEach(item => {
      item.addEventListener('click', () => {
        this.showItemDetails(item);
      });
      
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showItemDetails(item);
        }
      });
      
      // Make items focusable
      item.setAttribute('tabindex', '0');
    });
  }

  showItemDetails(item) {
    const itemText = item.textContent;
    const itemClass = item.classList[1]; // Get the brand class
    
    // Create a simple tooltip or highlight effect
    const existingTooltip = document.querySelector('.ecosystem-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'ecosystem-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <h5>${itemText}</h5>
        <p>Click to learn more about this ${this.getItemCategory(item)} platform</p>
      </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = item.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.zIndex = '1000';
    tooltip.style.background = 'var(--surface-color)';
    tooltip.style.border = '2px solid var(--border-color)';
    tooltip.style.borderRadius = 'var(--border-radius-md)';
    tooltip.style.padding = 'var(--spacing-sm)';
    tooltip.style.boxShadow = 'var(--shadow-lg)';
    tooltip.style.maxWidth = '200px';
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.remove();
      }
    }, 3000);
  }

  getItemCategory(item) {
    const layer = item.closest('.ecosystem-layer');
    const layerType = layer.dataset.layer;
    
    switch (layerType) {
      case 'proprietary': return 'proprietary model';
      case 'open-source': return 'open-source model';
      case 'platforms': return 'cloud platform';
      default: return 'AI platform';
    }
  }

  initializeMarketMetrics() {
    // Add dynamic updates to metrics
    const metrics = {
      'market-size': { value: 391, suffix: 'B', prefix: '$' },
      'enterprise-spending': { value: 26.65, suffix: 'B', prefix: '$' },
      'frontier-players': { value: 3, suffix: '', prefix: '' }
    };

    Object.entries(metrics).forEach(([key, data]) => {
      const card = document.querySelector(`[data-metric="${key}"]`);
      if (card) {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-6px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(-4px) scale(1.02)';
        });
      }
    });
  }

  handleResponsiveChange(isMobile) {
    const ecosystemGrid = document.querySelector('.ecosystem-grid');
    if (ecosystemGrid) {
      if (isMobile) {
        ecosystemGrid.style.gridTemplateColumns = '1fr';
      } else {
        ecosystemGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
      }
    }
  }

  closeModals() {
    const tooltip = document.querySelector('.ecosystem-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    const tooltip = document.querySelector('.ecosystem-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
    
    this.isInitialized = false;
  }
}
