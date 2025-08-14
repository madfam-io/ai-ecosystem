/**
 * Search functionality manager
 */
import { $, $$, debounce } from '@utils/dom.js';

export class SearchManager {
  constructor() {
    this.searchInput = null;
    this.searchBtn = null;
    this.currentHighlights = [];
    this.searchIndex = new Map();
    this.minSearchLength = 2;
  }

  /**
   * Initialize search functionality
   */
  init() {
    this.setupSearchElements();
    this.buildSearchIndex();
    this.setupEventListeners();
  }

  /**
   * Setup search DOM elements
   */
  setupSearchElements() {
    this.searchInput = $('#globalSearch');
    this.searchBtn = $('#searchBtn');

    if (!this.searchInput || !this.searchBtn) {
      console.warn('Search elements not found');
      return;
    }
  }

  /**
   * Build search index from content
   */
  buildSearchIndex() {
    const sections = $$('.content-section');
    
    sections.forEach((section, index) => {
      const id = section.id;
      const title = section.querySelector('h2, h3, h4')?.textContent || '';
      const content = this.extractTextContent(section);
      
      this.searchIndex.set(id, {
        id,
        title,
        content: content.toLowerCase(),
        element: section,
        index
      });
    });

    console.log(`📚 Search index built with ${this.searchIndex.size} sections`);
  }

  /**
   * Extract clean text content from element
   */
  extractTextContent(element) {
    // Clone element to avoid modifying original
    const clone = element.cloneNode(true);
    
    // Remove script and style elements
    $$('script, style', clone).forEach(el => el.remove());
    
    // Get text content and clean it up
    return clone.textContent
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (!this.searchInput || !this.searchBtn) return;

    const debouncedSearch = debounce((query) => {
      this.performSearch(query);
    }, 300);

    // Search button click
    this.searchBtn.addEventListener('click', () => {
      this.performSearch(this.searchInput.value);
    });

    // Enter key search
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(this.searchInput.value);
      }
    });

    // Live search as user types
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length >= this.minSearchLength) {
        debouncedSearch(query);
      } else {
        this.clearHighlights();
      }
    });

    // Clear search on escape
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });
  }

  /**
   * Perform search and highlight results
   */
  performSearch(query) {
    if (!query || query.length < this.minSearchLength) {
      this.showSearchNotification('Please enter at least 2 characters');
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const results = this.searchContent(cleanQuery);

    if (results.length === 0) {
      this.showSearchNotification(`No results found for "${query}"`);
      return;
    }

    // Clear previous highlights
    this.clearHighlights();

    // Scroll to first result
    const firstResult = results[0];
    this.scrollToResult(firstResult);

    // Highlight all results
    this.highlightResults(results, cleanQuery);

    this.showSearchNotification(`Found ${results.length} result(s) for "${query}"`);
  }

  /**
   * Search through content index
   */
  searchContent(query) {
    const results = [];
    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);

    this.searchIndex.forEach((item) => {
      let score = 0;
      let matches = 0;

      queryTerms.forEach((term) => {
        // Title matches get higher score
        if (item.title.toLowerCase().includes(term)) {
          score += 10;
          matches++;
        }

        // Content matches
        if (item.content.includes(term)) {
          score += 1;
          matches++;
        }
      });

      // Only include if all terms match
      if (matches === queryTerms.length) {
        results.push({
          ...item,
          score,
          matches
        });
      }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Scroll to search result
   */
  scrollToResult(result) {
    const element = result.element;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Add temporary highlight to section
      element.classList.add('search-highlight');
      setTimeout(() => {
        element.classList.remove('search-highlight');
      }, 2000);
    }
  }

  /**
   * Highlight search terms in results
   */
  highlightResults(results, query) {
    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);

    results.forEach((result) => {
      this.highlightTermsInElement(result.element, queryTerms);
    });
  }

  /**
   * Highlight specific terms in an element
   */
  highlightTermsInElement(element, terms) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if parent is already highlighted or is a script/style tag
          if (node.parentNode.tagName === 'MARK' || 
              ['SCRIPT', 'STYLE'].includes(node.parentNode.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      let text = textNode.textContent;
      let highlightedText = text;
      let hasMatch = false;

      terms.forEach((term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        if (regex.test(text)) {
          highlightedText = highlightedText.replace(regex, '<mark class="search-match">$1</mark>');
          hasMatch = true;
        }
      });

      if (hasMatch) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = highlightedText;
        textNode.parentNode.replaceChild(wrapper, textNode);
        this.currentHighlights.push(wrapper);
      }
    });
  }

  /**
   * Escape special regex characters
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Clear all search highlights
   */
  clearHighlights() {
    // Remove highlight marks
    $$('mark.search-match').forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });

    // Remove highlight wrappers
    this.currentHighlights.forEach(wrapper => {
      if (wrapper.parentNode) {
        wrapper.parentNode.replaceChild(
          document.createTextNode(wrapper.textContent), 
          wrapper
        );
      }
    });

    this.currentHighlights = [];

    // Remove section highlights
    $$('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
  }

  /**
   * Clear search input and highlights
   */
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.clearHighlights();
    this.hideSearchNotification();
  }

  /**
   * Focus search input
   */
  focusSearch() {
    if (this.searchInput) {
      this.searchInput.focus();
      this.searchInput.select();
    }
  }

  /**
   * Show search notification
   */
  showSearchNotification(message) {
    this.hideSearchNotification();

    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.textContent = message;

    // Position near search input
    if (this.searchInput) {
      const rect = this.searchInput.getBoundingClientRect();
      notification.style.position = 'fixed';
      notification.style.top = `${rect.bottom + 5}px`;
      notification.style.left = `${rect.left}px`;
      notification.style.zIndex = '10000';
    }

    document.body.appendChild(notification);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.hideSearchNotification();
    }, 3000);
  }

  /**
   * Hide search notification
   */
  hideSearchNotification() {
    const existing = $('.search-notification');
    if (existing) {
      existing.remove();
    }
  }

  /**
   * Get search statistics
   */
  getSearchStats() {
    return {
      indexSize: this.searchIndex.size,
      currentHighlights: this.currentHighlights.length
    };
  }

  /**
   * Destroy search manager
   */
  destroy() {
    this.clearHighlights();
    this.hideSearchNotification();
    this.searchIndex.clear();
  }
}