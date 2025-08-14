/**
 * Platforms Module - Handles platform comparison and deployment calculator
 */
import { $, $$, createElement } from '@utils/dom.js';
import { platformData, calculateDeploymentCost } from '@data/platforms.js';

export class PlatformsModule {
  constructor() {
    this.platformGrid = null;
    this.platformFilter = null;
    this.providerFilter = null;
    this.filteredData = [...platformData];
  }

  /**
   * Initialize platforms module
   */
  async init() {
    try {
      this.setupElements();
      this.setupEventListeners();
      this.renderPlatformGrid();
      this.setupDeploymentCalculator();
      
      console.log('✓ Platforms module initialized');
    } catch (error) {
      console.error('Failed to initialize platforms module:', error);
      // Don't throw to prevent app failure
    }
  }

  /**
   * Setup DOM elements
   */
  setupElements() {
    this.platformGrid = $('#platformGrid');
    this.platformFilter = $('#platformFilter');
    this.providerFilter = $('#providerFilter');
    
    // Create platform comparison container if it doesn't exist
    if (!$('#platformComparison')) {
      this.createPlatformComparisonSection();
    }
  }

  /**
   * Create platform comparison section
   */
  createPlatformComparisonSection() {
    const section = $('#serverless-apis');
    if (!section) return;

    const comparisonHtml = `
      <div class="platform-comparison" id="platformComparison">
        <h4>Interactive Platform Comparison</h4>
        <div class="comparison-controls">
          <div class="filter-group">
            <label for="platformFilter">Filter by Focus:</label>
            <select id="platformFilter">
              <option value="all">All Platforms</option>
              <option value="enterprise">Enterprise</option>
              <option value="developer">Developer-Focused</option>
              <option value="cost-effective">Cost-Effective</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="providerFilter">Provider Type:</label>
            <select id="providerFilter">
              <option value="all">All Providers</option>
              <option value="major-cloud">Major Cloud</option>
              <option value="specialized">Specialized</option>
            </select>
          </div>
        </div>
        <div class="platform-grid" id="platformGrid">
          <!-- Platform cards will be populated by JavaScript -->
        </div>
      </div>
    `;

    section.insertAdjacentHTML('beforeend', comparisonHtml);
    
    // Re-setup elements after creation
    this.setupElements();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (this.platformFilter) {
      this.platformFilter.addEventListener('change', () => {
        this.filterPlatforms();
      });
    }

    if (this.providerFilter) {
      this.providerFilter.addEventListener('change', () => {
        this.filterPlatforms();
      });
    }
  }

  /**
   * Filter platforms based on selected criteria
   */
  filterPlatforms() {
    const focusFilter = this.platformFilter?.value || 'all';
    const providerFilter = this.providerFilter?.value || 'all';

    this.filteredData = platformData.filter(platform => {
      const matchesFocus = focusFilter === 'all' || platform.focus === focusFilter;
      const matchesProvider = providerFilter === 'all' || platform.type === providerFilter;
      
      return matchesFocus && matchesProvider;
    });

    this.renderPlatformGrid();
  }

  /**
   * Render platform grid
   */
  renderPlatformGrid() {
    if (!this.platformGrid) return;

    if (this.filteredData.length === 0) {
      this.platformGrid.innerHTML = `
        <div class="no-results">
          <p>No platforms match the selected criteria.</p>
        </div>
      `;
      return;
    }

    const cardsHtml = this.filteredData.map(platform => 
      this.createPlatformCard(platform)
    ).join('');

    this.platformGrid.innerHTML = cardsHtml;
  }

  /**
   * Create platform card HTML
   */
  createPlatformCard(platform) {
    const strengthsList = platform.strengths
      ?.map(strength => `<li>${strength}</li>`)
      .join('') || '';
    
    const limitationsList = platform.limitations
      ?.map(limitation => `<li>${limitation}</li>`)
      .join('') || '';

    return `
      <div class="platform-card" data-platform="${platform.id}">
        <div class="platform-header">
          <h5>${platform.name}</h5>
          <span class="platform-badge ${platform.focus}">${platform.focus}</span>
        </div>
        
        <div class="platform-details">
          <div class="platform-info">
            <div class="info-item">
              <strong>Models:</strong>
              <span>${platform.models}</span>
            </div>
            <div class="info-item">
              <strong>Pricing:</strong>
              <span>${platform.pricing}</span>
            </div>
            <div class="info-item">
              <strong>Features:</strong>
              <span>${platform.features}</span>
            </div>
          </div>
          
          ${strengthsList ? `
            <div class="platform-strengths">
              <h6>✅ Strengths:</h6>
              <ul>${strengthsList}</ul>
            </div>
          ` : ''}
          
          ${limitationsList ? `
            <div class="platform-limitations">
              <h6>⚠️ Limitations:</h6>
              <ul>${limitationsList}</ul>
            </div>
          ` : ''}
          
          <div class="platform-actions">
            <button class="calculate-cost-btn" data-platform="${platform.id}">
              Calculate Costs
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Setup deployment calculator
   */
  setupDeploymentCalculator() {
    const calculatorContainer = $('.deployment-calculator');
    if (!calculatorContainer) {
      this.createDeploymentCalculator();
    }

    this.setupCalculatorEvents();
  }

  /**
   * Create deployment calculator
   */
  createDeploymentCalculator() {
    const section = $('#serverless-apis');
    if (!section) return;

    const calculatorHtml = `
      <div class="deployment-calculator">
        <h4>Deployment Cost Calculator</h4>
        <div class="calculator-container">
          <div class="calculator-inputs">
            <div class="input-group">
              <label for="deploymentType">Deployment Type:</label>
              <select id="deploymentType">
                <option value="serverless">Serverless API</option>
                <option value="dedicated">Dedicated Instance</option>
                <option value="self-hosted">Self-Hosted</option>
              </select>
            </div>
            <div class="input-group">
              <label for="requestsPerMonth">Requests per Month:</label>
              <input type="number" id="requestsPerMonth" value="100000" min="1000" step="1000">
            </div>
            <div class="input-group">
              <label for="avgTokensPerRequest">Avg Tokens per Request:</label>
              <input type="number" id="avgTokensPerRequest" value="1000" min="100" step="100">
            </div>
            <div class="input-group">
              <label for="modelSize">Model Complexity:</label>
              <select id="modelSize">
                <option value="small">Small (7B parameters)</option>
                <option value="medium">Medium (70B parameters)</option>
                <option value="large">Large (405B+ parameters)</option>
              </select>
            </div>
            <button id="calculateCost" class="calculate-btn">Calculate Costs</button>
          </div>
          
          <div class="cost-breakdown" id="costBreakdown">
            <p>Select parameters and click "Calculate Costs" to see pricing breakdown.</p>
          </div>
        </div>
      </div>
    `;

    section.insertAdjacentHTML('beforeend', calculatorHtml);
  }

  /**
   * Setup calculator event listeners
   */
  setupCalculatorEvents() {
    const calculateBtn = $('#calculateCost');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        this.calculateAndDisplayCosts();
      });
    }

    // Auto-calculate on input change
    const inputs = $$('#deploymentType, #requestsPerMonth, #avgTokensPerRequest, #modelSize');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        this.calculateAndDisplayCosts();
      });
    });
  }

  /**
   * Calculate and display costs
   */
  calculateAndDisplayCosts() {
    try {
      const params = {
        deploymentType: $('#deploymentType')?.value,
        requestsPerMonth: parseInt($('#requestsPerMonth')?.value) || 0,
        avgTokensPerRequest: parseInt($('#avgTokensPerRequest')?.value) || 0,
        modelSize: $('#modelSize')?.value,
        platform: 'aws-bedrock' // Default platform
      };

      if (params.requestsPerMonth <= 0 || params.avgTokensPerRequest <= 0) {
        this.displayError('Please enter valid values for requests and tokens.');
        return;
      }

      const costResult = calculateDeploymentCost(params);
      this.displayCostResult(costResult);

    } catch (error) {
      console.error('Cost calculation error:', error);
      this.displayError('Error calculating costs. Please check your inputs.');
    }
  }

  /**
   * Display cost calculation result
   */
  displayCostResult(result) {
    const costBreakdown = $('#costBreakdown');
    if (!costBreakdown) return;

    const formatCurrency = (amount) => 
      new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(amount);

    const breakdownHtml = `
      <div class="cost-result">
        <h5>Cost Estimate</h5>
        <div class="cost-summary">
          <div class="cost-item total">
            <span>Monthly Total:</span>
            <strong>${formatCurrency(result.monthlyCost)}</strong>
          </div>
          <div class="cost-item">
            <span>Cost per Request:</span>
            <span>${formatCurrency(result.costPerRequest)}</span>
          </div>
          <div class="cost-item">
            <span>Cost per Token:</span>
            <span>${formatCurrency(result.costPerToken)}</span>
          </div>
        </div>
        
        <div class="cost-details">
          <h6>Configuration:</h6>
          <ul>
            <li>Platform: ${result.platform}</li>
            <li>Deployment: ${result.deploymentType}</li>
            <li>Model: ${result.modelSize}</li>
            <li>Requests/month: ${result.requestsPerMonth.toLocaleString()}</li>
            <li>Total tokens/month: ${result.totalTokens.toLocaleString()}</li>
          </ul>
        </div>
      </div>
    `;

    costBreakdown.innerHTML = breakdownHtml;
  }

  /**
   * Display error message
   */
  displayError(message) {
    const costBreakdown = $('#costBreakdown');
    if (!costBreakdown) return;

    costBreakdown.innerHTML = `
      <div class="cost-error">
        <p>⚠️ ${message}</p>
      </div>
    `;
  }

  /**
   * Handle responsive changes
   */
  handleResponsiveChange(isMobile) {
    // Adjust layout for mobile if needed
    if (isMobile && this.platformGrid) {
      this.platformGrid.classList.add('mobile-layout');
    } else if (this.platformGrid) {
      this.platformGrid.classList.remove('mobile-layout');
    }
  }

  /**
   * Get platform by ID
   */
  getPlatform(id) {
    return platformData.find(platform => platform.id === id);
  }

  /**
   * Get filtered platforms
   */
  getFilteredPlatforms() {
    return [...this.filteredData];
  }

  /**
   * Destroy platforms module
   */
  destroy() {
    this.filteredData = [];
    this.platformGrid = null;
    this.platformFilter = null;
    this.providerFilter = null;
  }
}