/**
 * Navigation Manager - Handles sidebar navigation and scroll spy
 */
import { $, $$, addEventListenerWithCleanup } from '@utils/dom.js';
import { AccessibilityHelper } from '@utils/accessibility.js';

export class NavigationManager {
  constructor() {
    this.menuToggle = null;
    this.sidebarNav = null;
    this.navLinks = [];
    this.sections = [];
    this.currentActiveLink = null;
    this.observer = null;
    this.cleanupFunctions = [];
    this.accessibilityHelper = new AccessibilityHelper();
    this.isMobileMenuOpen = false;
  }

  /**
   * Initialize navigation system
   */
  async init() {
    try {
      this.setupElements();
      this.setupEventListeners();
      this.setupScrollSpy();
      this.setupKeyboardNavigation();
      this.setupResponsiveHandling();
      
      console.log('✓ Navigation module initialized');
    } catch (error) {
      console.error('Failed to initialize navigation:', error);
      throw error;
    }
  }

  /**
   * Setup DOM elements
   */
  setupElements() {
    this.menuToggle = $('#menu-toggle');
    this.sidebarNav = $('.sidebar-nav');
    this.navLinks = $$('.nav-link, .nav-sublink');
    this.sections = $$('.content-section');

    if (!this.sidebarNav) {
      throw new Error('Sidebar navigation not found');
    }

    // Add ARIA attributes for accessibility
    if (this.menuToggle) {
      this.accessibilityHelper.makeAccessible(this.menuToggle, {
        label: 'Toggle navigation menu',
        expanded: false,
        controls: 'navigation-menu'
      });
    }

    if (this.sidebarNav) {
      this.sidebarNav.id = 'navigation-menu';
      this.accessibilityHelper.makeAccessible(this.sidebarNav, {
        role: 'navigation',
        label: 'Report sections'
      });
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    if (this.menuToggle) {
      const cleanup = addEventListenerWithCleanup(
        this.menuToggle,
        'click',
        () => this.toggleMobileMenu()
      );
      this.cleanupFunctions.push(cleanup);
    }

    // Navigation links
    this.navLinks.forEach(link => {
      const cleanup = addEventListenerWithCleanup(
        link,
        'click',
        (e) => this.handleNavLinkClick(e, link)
      );
      this.cleanupFunctions.push(cleanup);
    });

    // Close mobile menu when clicking outside
    const outsideClickCleanup = addEventListenerWithCleanup(
      document,
      'click',
      (e) => this.handleOutsideClick(e)
    );
    this.cleanupFunctions.push(outsideClickCleanup);

    // Handle escape key
    const escapeCleanup = addEventListenerWithCleanup(
      document,
      'keydown',
      (e) => this.handleEscapeKey(e)
    );
    this.cleanupFunctions.push(escapeCleanup);
  }

  /**
   * Setup scroll spy functionality
   */
  setupScrollSpy() {
    if (this.sections.length === 0 || this.navLinks.length === 0) {
      console.warn('No sections or nav links found for scroll spy');
      return;
    }

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.1, 0.5, 1]
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      observerOptions
    );

    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  }

  /**
   * Handle intersection observer entries
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        this.updateActiveNavigation(entry.target.id);
      }
    });
  }

  /**
   * Update active navigation item
   */
  updateActiveNavigation(sectionId) {
    // Remove previous active states
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });

    // Find and activate corresponding nav link
    const activeLink = this.navLinks.find(link => 
      link.getAttribute('href') === `#${sectionId}`
    );

    if (activeLink && activeLink !== this.currentActiveLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
      this.currentActiveLink = activeLink;

      // Announce to screen readers
      const sectionTitle = activeLink.textContent.trim();
      this.accessibilityHelper.announce(`Now viewing: ${sectionTitle}`);
    }
  }

  /**
   * Handle navigation link clicks
   */
  handleNavLinkClick(event, link) {
    event.preventDefault();
    
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const targetElement = $(href);
    if (!targetElement) {
      console.warn(`Target element not found: ${href}`);
      return;
    }

    this.scrollToSection(targetElement, link);
    
    // Close mobile menu if open
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }

    // Update active state immediately
    this.updateActiveNavigation(targetElement.id);
  }

  /**
   * Scroll to section with smooth animation
   */
  scrollToSection(targetElement, link) {
    const headerHeight = this.getHeaderHeight();
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Focus the target for keyboard users
    setTimeout(() => {
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
      
      // Remove tabindex after focus
      setTimeout(() => {
        targetElement.removeAttribute('tabindex');
      }, 100);
    }, 500);
  }

  /**
   * Get header height for offset calculation
   */
  getHeaderHeight() {
    const header = $('.main-header');
    return header ? header.offsetHeight : 0;
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.sidebarNav.classList.add('open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.isMobileMenuOpen = true;

    // Focus first navigation link
    const firstLink = this.navLinks[0];
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }

    this.accessibilityHelper.announce('Navigation menu opened');
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.sidebarNav.classList.remove('open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.isMobileMenuOpen = false;

    this.accessibilityHelper.announce('Navigation menu closed');
  }

  /**
   * Handle clicks outside the navigation
   */
  handleOutsideClick(event) {
    if (!this.isMobileMenuOpen) return;

    const isClickInsideNav = this.sidebarNav.contains(event.target);
    const isClickOnToggle = this.menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle) {
      this.closeMobileMenu();
    }
  }

  /**
   * Handle escape key
   */
  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isMobileMenuOpen) {
      this.closeMobileMenu();
      this.menuToggle.focus();
    }
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Navigation shortcuts
    const keyboardCleanup = addEventListenerWithCleanup(
      document,
      'keydown',
      (e) => this.handleKeyboardShortcuts(e)
    );
    this.cleanupFunctions.push(keyboardCleanup);
  }

  /**
   * Handle keyboard shortcuts
   */
  handleKeyboardShortcuts(event) {
    // Skip if user is typing in an input
    if (event.target.matches('input, textarea, select, [contenteditable]')) {
      return;
    }

    // Navigation shortcuts (1-9 for sections)
    if (event.key >= '1' && event.key <= '9' && !event.ctrlKey && !event.metaKey) {
      const sectionIndex = parseInt(event.key) - 1;
      const section = this.sections[sectionIndex];
      
      if (section) {
        event.preventDefault();
        const correspondingLink = this.navLinks.find(link => 
          link.getAttribute('href') === `#${section.id}`
        );
        
        if (correspondingLink) {
          this.handleNavLinkClick(event, correspondingLink);
        }
      }
    }
  }

  /**
   * Setup responsive handling
   */
  setupResponsiveHandling() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleResponsiveChange = (e) => {
      if (!e.matches && this.isMobileMenuOpen) {
        // Desktop view - close mobile menu
        this.closeMobileMenu();
      }
    };

    mediaQuery.addEventListener('change', handleResponsiveChange);
    this.cleanupFunctions.push(() => {
      mediaQuery.removeEventListener('change', handleResponsiveChange);
    });
  }

  /**
   * Get current section
   */
  getCurrentSection() {
    return this.currentActiveLink ? 
      this.currentActiveLink.getAttribute('href').substring(1) : 
      null;
  }

  /**
   * Navigate to specific section
   */
  navigateToSection(sectionId) {
    const link = this.navLinks.find(link => 
      link.getAttribute('href') === `#${sectionId}`
    );
    
    if (link) {
      const fakeEvent = { preventDefault: () => {} };
      this.handleNavLinkClick(fakeEvent, link);
    }
  }

  /**
   * Handle responsive changes (called by main app)
   */
  handleResponsiveChange(isMobile) {
    if (!isMobile && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Close any open modals/menus (called by main app)
   */
  closeModals() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Destroy navigation manager
   */
  destroy() {
    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Clean up event listeners
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];

    // Reset state
    this.isMobileMenuOpen = false;
    this.currentActiveLink = null;
  }
}