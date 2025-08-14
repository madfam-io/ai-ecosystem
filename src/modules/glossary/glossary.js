/**
 * Glossary Module - Interactive glossary and search
 */
import { 
  glossaryData, 
  categories, 
  difficulties, 
  quickReferenceCards,
  getTermsByCategory,
  getTermsByDifficulty,
  searchTerms 
} from '@data/glossary.js';

export class GlossaryModule {
  constructor() {
    this.isInitialized = false;
    this.currentView = 'cards';
    this.currentCategory = 'all';
    this.currentDifficulty = 'all';
    this.currentSearchQuery = '';
    this.filteredTerms = glossaryData;
  }

  async init() {
    try {
      this.renderGlossary();
      this.setupEventListeners();
      this.isInitialized = true;
      console.log('✓ Glossary module initialized with interactive features');
    } catch (error) {
      console.error('Failed to initialize glossary module:', error);
    }
  }

  renderGlossary() {
    const container = document.getElementById('glossaryContainer');
    if (!container) return;

    container.innerHTML = `
      <!-- Glossary Controls -->
      <div class="glossary-controls">
        <div class="search-and-filters">
          <div class="glossary-search">
            <input type="text" id="glossarySearch" placeholder="Search terms, definitions, or examples..." class="glossary-search-input">
            <button id="glossarySearchBtn" class="glossary-search-btn">🔍</button>
          </div>
          
          <div class="glossary-filters">
            <div class="filter-group">
              <label for="categoryFilter">Category:</label>
              <select id="categoryFilter">
                <option value="all">All Categories</option>
                ${Object.entries(categories).map(([key, value]) => 
                  `<option value="${key}">${value}</option>`
                ).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label for="difficultyFilter">Difficulty:</label>
              <select id="difficultyFilter">
                <option value="all">All Levels</option>
                ${Object.entries(difficulties).map(([key, value]) => 
                  `<option value="${key}">${value}</option>`
                ).join('')}
              </select>
            </div>
            
            <div class="view-toggle">
              <button id="cardView" class="view-btn active">📇 Cards</button>
              <button id="listView" class="view-btn">📄 List</button>
            </div>
          </div>
        </div>
        
        <div class="glossary-stats">
          <span id="termCount">${glossaryData.length} terms</span>
          <span id="categoryCount">${Object.keys(categories).length} categories</span>
          <span class="accessibility-note">♿ Accessibility optimized</span>
        </div>
      </div>

      <!-- Glossary Content -->
      <div class="glossary-content">
        <!-- Letter Navigation -->
        <div class="letter-navigation">
          <div class="alphabet-nav">
            ${this.getAvailableLetters().map(letter => 
              `<button class="letter-btn" data-letter="${letter}">${letter}</button>`
            ).join('')}
          </div>
        </div>

        <!-- Terms Container -->
        <div class="glossary-terms" id="glossaryTerms">
          ${this.renderTerms(this.filteredTerms)}
        </div>
      </div>

      <!-- Quick Reference Cards -->
      <div class="quick-reference">
        <h3>Quick Reference: Key Concepts</h3>
        <div class="reference-grid">
          ${quickReferenceCards.map(card => `
            <div class="reference-card" data-concept="${card.id}">
              <h4>${card.icon} ${card.title}</h4>
              <p class="quick-definition">${card.definition}</p>
              <div class="related-terms">
                ${card.tags.map(tag => `<span class="term-tag">${tag}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderTerms(terms) {
    if (this.currentView === 'cards') {
      return `
        <div class="terms-grid">
          ${terms.map(term => `
            <div class="term-card" data-term-id="${term.id}">
              <div class="term-header">
                <h4>${term.term}</h4>
                <span class="difficulty-badge ${term.difficulty}">${difficulties[term.difficulty]}</span>
              </div>
              <div class="term-content">
                <p class="definition">${term.definition}</p>
                ${term.examples ? `
                  <div class="examples">
                    <h6>Examples:</h6>
                    <ul>
                      ${term.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${term.relatedTerms ? `
                  <div class="related-terms">
                    <h6>Related:</h6>
                    ${term.relatedTerms.map(related => `<span class="related-tag">${related}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="term-category">
                <span class="category-tag ${term.category}">${categories[term.category]}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      return `
        <div class="terms-list">
          ${terms.map(term => `
            <div class="term-list-item" data-term-id="${term.id}">
              <div class="term-list-header">
                <h4>${term.term}</h4>
                <div class="term-badges">
                  <span class="difficulty-badge ${term.difficulty}">${difficulties[term.difficulty]}</span>
                  <span class="category-tag ${term.category}">${categories[term.category]}</span>
                </div>
              </div>
              <p class="definition">${term.definition}</p>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  getAvailableLetters() {
    const letters = new Set();
    glossaryData.forEach(term => {
      letters.add(term.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('glossarySearch');
    const searchBtn = document.getElementById('glossarySearchBtn');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearchQuery = e.target.value;
        this.updateTerms();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.updateTerms();
      });
    }

    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');

    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.updateTerms();
      });
    }

    if (difficultyFilter) {
      difficultyFilter.addEventListener('change', (e) => {
        this.currentDifficulty = e.target.value;
        this.updateTerms();
      });
    }

    // View toggle
    const cardViewBtn = document.getElementById('cardView');
    const listViewBtn = document.getElementById('listView');

    if (cardViewBtn) {
      cardViewBtn.addEventListener('click', () => {
        this.currentView = 'cards';
        this.updateViewButtons();
        this.updateTerms();
      });
    }

    if (listViewBtn) {
      listViewBtn.addEventListener('click', () => {
        this.currentView = 'list';
        this.updateViewButtons();
        this.updateTerms();
      });
    }

    // Letter navigation
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('letter-btn')) {
        const letter = e.target.dataset.letter;
        this.filterByLetter(letter);
      }
    });
  }

  updateTerms() {
    let terms = glossaryData;

    // Apply search filter
    if (this.currentSearchQuery) {
      terms = searchTerms(this.currentSearchQuery);
    }

    // Apply category filter
    if (this.currentCategory !== 'all') {
      terms = terms.filter(term => term.category === this.currentCategory);
    }

    // Apply difficulty filter
    if (this.currentDifficulty !== 'all') {
      terms = terms.filter(term => term.difficulty === this.currentDifficulty);
    }

    this.filteredTerms = terms;
    this.updateTermsDisplay();
    this.updateStats();
  }

  updateTermsDisplay() {
    const termsContainer = document.getElementById('glossaryTerms');
    if (termsContainer) {
      termsContainer.innerHTML = this.renderTerms(this.filteredTerms);
    }
  }

  updateViewButtons() {
    const cardBtn = document.getElementById('cardView');
    const listBtn = document.getElementById('listView');

    if (cardBtn && listBtn) {
      cardBtn.classList.toggle('active', this.currentView === 'cards');
      listBtn.classList.toggle('active', this.currentView === 'list');
    }
  }

  updateStats() {
    const termCount = document.getElementById('termCount');
    if (termCount) {
      termCount.textContent = `${this.filteredTerms.length} terms`;
    }
  }

  filterByLetter(letter) {
    this.currentSearchQuery = '';
    const searchInput = document.getElementById('glossarySearch');
    if (searchInput) searchInput.value = '';
    
    this.filteredTerms = glossaryData.filter(term => 
      term.term.charAt(0).toUpperCase() === letter
    );
    this.updateTermsDisplay();
    this.updateStats();
  }

  handleResponsiveChange(isMobile) {
    const controls = document.querySelector('.glossary-controls');
    const filters = document.querySelector('.glossary-filters');
    
    if (controls && filters) {
      if (isMobile) {
        filters.style.flexDirection = 'column';
        filters.style.gap = 'var(--spacing-sm)';
      } else {
        filters.style.flexDirection = 'row';
        filters.style.gap = 'var(--spacing-md)';
      }
    }
  }

  closeModals() {
    // Close any open term details or modals
  }

  destroy() {
    this.isInitialized = false;
  }
}