/**
 * AI Ecosystem Interactive Report - Main Entry Point
 * Modern Vite-based application with modular architecture
 */

import './styles/main.css';
import { PerformanceMonitor } from '@utils/performance.js';
import { AccessibilityHelper } from '@utils/accessibility.js';

// Core modules
import { NavigationManager } from '@modules/navigation/navigation.js';
import { DashboardModule } from '@modules/dashboard/dashboard.js';
import { HardwareModule } from '@modules/hardware/hardware.js';
import { FrameworksModule } from '@modules/frameworks/frameworks.js';
import { ModelsModule } from '@modules/models/models.js';
import { AgentsModule } from '@modules/agents/agents.js';
import { PlatformsModule } from '@modules/platforms/platforms.js';
import { ApplicationsModule } from '@modules/applications/applications.js';
import { FutureModule } from '@modules/future/future.js';
import { GlossaryModule } from '@modules/glossary/glossary.js';

// Global utilities
import { ScrollManager } from '@utils/scroll.js';
import { SearchManager } from '@utils/search.js';

/**
 * Application class managing the entire ecosystem report
 */
class AIEcosystemApp {
  constructor() {
    this.performanceMonitor = new PerformanceMonitor();
    this.accessibilityHelper = new AccessibilityHelper();
    this.modules = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      this.performanceMonitor.start('app-init');
      
      console.log('🚀 AI Ecosystem Interactive Report - Initializing...');
      
      // Initialize core systems
      await this.initializeCoreServices();
      
      // Initialize modules
      await this.initializeModules();
      
      // Setup global features
      this.setupGlobalFeatures();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Hide loading overlay
      this.hideLoadingOverlay();
      
      this.performanceMonitor.end('app-init');
      console.log('✅ All modules initialized successfully');
      
      // Announce to screen readers
      this.accessibilityHelper.announce('AI Ecosystem Report loaded successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      this.hideLoadingOverlay();
      this.handleInitializationError(error);
    }
  }

  /**
   * Hide the loading overlay
   */
  hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.add('hidden');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Initialize core services
   */
  async initializeCoreServices() {
    // Initialize performance monitoring
    this.performanceMonitor.init();
    
    // Initialize accessibility features
    this.accessibilityHelper.init();
    
    // Setup error handling
    this.setupErrorHandling();
  }

  /**
   * Initialize all feature modules
   */
  async initializeModules() {
    const moduleConfigs = [
      { name: 'navigation', module: NavigationManager, priority: 1 },
      { name: 'dashboard', module: DashboardModule, priority: 2 },
      { name: 'hardware', module: HardwareModule, priority: 3 },
      { name: 'frameworks', module: FrameworksModule, priority: 3 },
      { name: 'models', module: ModelsModule, priority: 3 },
      { name: 'agents', module: AgentsModule, priority: 3 },
      { name: 'platforms', module: PlatformsModule, priority: 3 },
      { name: 'applications', module: ApplicationsModule, priority: 3 },
      { name: 'future', module: FutureModule, priority: 3 },
      { name: 'glossary', module: GlossaryModule, priority: 4 }
    ];

    // Sort by priority and initialize
    moduleConfigs.sort((a, b) => a.priority - b.priority);

    for (const config of moduleConfigs) {
      try {
        const moduleInstance = new config.module();
        await moduleInstance.init();
        this.modules.set(config.name, moduleInstance);
        console.log(`✓ ${config.name} module initialized`);
      } catch (error) {
        console.warn(`⚠️ Failed to initialize ${config.name} module:`, error);
      }
    }
  }

  /**
   * Setup global application features
   */
  setupGlobalFeatures() {
    // Initialize scroll management
    this.scrollManager = new ScrollManager();
    this.scrollManager.init();

    // Initialize search functionality
    this.searchManager = new SearchManager();
    this.searchManager.init();

    // Setup keyboard navigation
    this.setupKeyboardNavigation();

    // Setup responsive handlers
    this.setupResponsiveHandlers();
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Skip navigation (Ctrl/Cmd + Shift + K)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'K') {
        event.preventDefault();
        this.accessibilityHelper.focusSkipLink();
      }

      // Global search (Ctrl/Cmd + K)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        this.searchManager.focusSearch();
      }

      // Escape to close modals/menus
      if (event.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  /**
   * Setup responsive design handlers
   */
  setupResponsiveHandlers() {
    const mediaQueryList = window.matchMedia('(max-width: 768px)');
    
    const handleMediaChange = (e) => {
      this.modules.forEach(module => {
        if (module.handleResponsiveChange) {
          module.handleResponsiveChange(e.matches);
        }
      });
    };

    mediaQueryList.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQueryList); // Initial call
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.performanceMonitor.recordError(event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.performanceMonitor.recordError(event.reason);
    });
  }

  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'init-error';
    errorContainer.innerHTML = `
      <div class="error-content">
        <h2>🚫 Application Failed to Initialize</h2>
        <p>We encountered an error while loading the AI Ecosystem Report.</p>
        <details>
          <summary>Error Details</summary>
          <pre>${error.message}</pre>
        </details>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `;
    document.body.prepend(errorContainer);
  }

  /**
   * Close all open modals and menus
   */
  closeAllModals() {
    this.modules.forEach(module => {
      if (module.closeModals) {
        module.closeModals();
      }
    });
  }

  /**
   * Get module instance by name
   */
  getModule(name) {
    return this.modules.get(name);
  }

  /**
   * Cleanup and destroy the application
   */
  destroy() {
    this.modules.forEach(module => {
      if (module.destroy) {
        module.destroy();
      }
    });
    this.modules.clear();
    this.isInitialized = false;
  }
}

// Content visibility is now handled by inline CSS in HTML head

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  window.aiEcosystemApp = new AIEcosystemApp();
  await window.aiEcosystemApp.init();
});

// Fallback for when DOMContentLoaded has already fired
if (document.readyState === 'loading') {
  // Do nothing, DOMContentLoaded will fire
} else {
  // DOM is already ready
  window.aiEcosystemApp = new AIEcosystemApp();
  window.aiEcosystemApp.init();
}

// Hot Module Replacement support for development
if (import.meta.hot) {
  import.meta.hot.accept();
}

export default AIEcosystemApp;