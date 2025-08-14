/**
 * Accessibility helper utilities
 */
export class AccessibilityHelper {
  constructor() {
    this.announcements = [];
    this.focusRing = null;
  }

  /**
   * Initialize accessibility features
   */
  init() {
    this.setupAriaLiveRegion();
    this.setupFocusManagement();
    this.setupReducedMotion();
    this.setupHighContrast();
  }

  /**
   * Setup ARIA live region for screen reader announcements
   */
  setupAriaLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.id = 'aria-live-region';
    document.body.appendChild(this.liveRegion);
  }

  /**
   * Announce message to screen readers
   */
  announce(message, priority = 'polite') {
    if (!this.liveRegion) return;

    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);

    this.announcements.push({
      message,
      timestamp: Date.now(),
      priority
    });
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Track focus for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Setup focus trap for modals
    this.setupFocusTrap();
  }

  /**
   * Setup focus trap functionality
   */
  setupFocusTrap() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.active, .dialog[open]');
        if (modal) {
          this.trapFocus(e, modal);
        }
      }
    });
  }

  /**
   * Trap focus within an element
   */
  trapFocus(event, element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }

  /**
   * Focus the skip navigation link
   */
  focusSkipLink() {
    const skipLink = document.querySelector('.skip-nav');
    if (skipLink) {
      skipLink.focus();
    }
  }

  /**
   * Setup reduced motion support
   */
  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (mediaQuery) => {
      if (mediaQuery.matches) {
        document.body.classList.add('reduced-motion');
        this.announce('Animations reduced for accessibility');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };

    prefersReducedMotion.addEventListener('change', handleReducedMotion);
    handleReducedMotion(prefersReducedMotion);
  }

  /**
   * Setup high contrast support
   */
  setupHighContrast() {
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    const handleHighContrast = (mediaQuery) => {
      if (mediaQuery.matches) {
        document.body.classList.add('high-contrast');
        this.announce('High contrast mode detected');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };

    prefersHighContrast.addEventListener('change', handleHighContrast);
    handleHighContrast(prefersHighContrast);
  }

  /**
   * Make an element announcement-friendly
   */
  makeAccessible(element, options = {}) {
    const {
      role,
      label,
      description,
      expanded,
      controls,
      describedBy
    } = options;

    if (role) element.setAttribute('role', role);
    if (label) element.setAttribute('aria-label', label);
    if (description) element.setAttribute('aria-description', description);
    if (expanded !== undefined) element.setAttribute('aria-expanded', expanded);
    if (controls) element.setAttribute('aria-controls', controls);
    if (describedBy) element.setAttribute('aria-describedby', describedBy);

    return element;
  }

  /**
   * Create accessible button
   */
  createAccessibleButton(text, onClick, options = {}) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);

    if (options.icon) {
      const icon = document.createElement('span');
      icon.className = `icon ${options.icon}`;
      icon.setAttribute('aria-hidden', 'true');
      button.prepend(icon);
    }

    this.makeAccessible(button, options);
    return button;
  }

  /**
   * Create accessible form field
   */
  createAccessibleField(type, id, labelText, options = {}) {
    const container = document.createElement('div');
    container.className = 'field-container';

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    input.id = id;
    input.name = id;
    
    if (type !== 'textarea') {
      input.type = type;
    }

    if (options.required) {
      input.setAttribute('required', '');
      input.setAttribute('aria-required', 'true');
    }

    if (options.description) {
      const description = document.createElement('div');
      description.id = `${id}-description`;
      description.className = 'field-description';
      description.textContent = options.description;
      input.setAttribute('aria-describedby', `${id}-description`);
      container.appendChild(description);
    }

    container.appendChild(label);
    container.appendChild(input);

    return { container, input, label };
  }

  /**
   * Get announcement history
   */
  getAnnouncementHistory() {
    return [...this.announcements];
  }

  /**
   * Clear announcement history
   */
  clearAnnouncementHistory() {
    this.announcements = [];
  }
}