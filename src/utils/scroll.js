/**
 * Scroll management utilities
 */
import { $, throttle } from '@utils/dom.js';

export class ScrollManager {
  constructor() {
    this.scrollTopBtn = null;
    this.isScrolling = false;
    this.scrollCallbacks = new Map();
  }

  /**
   * Initialize scroll management
   */
  init() {
    this.setupScrollToTop();
    this.setupScrollSpy();
    this.setupSmoothScrolling();
  }

  /**
   * Setup scroll to top button
   */
  setupScrollToTop() {
    this.scrollTopBtn = $('#scrollTopBtn');
    if (!this.scrollTopBtn) return;

    const throttledScroll = throttle(() => {
      if (window.pageYOffset > 300) {
        this.scrollTopBtn.classList.add('visible');
      } else {
        this.scrollTopBtn.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    this.scrollTopBtn.addEventListener('click', () => {
      this.scrollToTop();
    });
  }

  /**
   * Setup scroll spy for navigation
   */
  setupScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.updateActiveNavigation(entry.target.id, navLinks);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  /**
   * Update active navigation item
   */
  updateActiveNavigation(sectionId, navLinks) {
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      this.scrollToSection(href);
    });
  }

  /**
   * Scroll to section smoothly
   */
  scrollToSection(href) {
    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    const headerHeight = this.getHeaderHeight();
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    this.animateScrollTo(targetPosition);
  }

  /**
   * Get header height for offset calculation
   */
  getHeaderHeight() {
    const header = $('.main-header');
    return header ? header.offsetHeight : 0;
  }

  /**
   * Animate scroll to position
   */
  animateScrollTo(targetPosition, duration = 1000) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-in-out)
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        this.isScrolling = false;
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Scroll to top
   */
  scrollToTop() {
    this.animateScrollTo(0, 800);
  }

  /**
   * Register scroll callback
   */
  onScroll(name, callback, options = {}) {
    const { throttleMs = 100 } = options;
    const throttledCallback = throttle(callback, throttleMs);
    
    this.scrollCallbacks.set(name, throttledCallback);
    window.addEventListener('scroll', throttledCallback);

    return () => this.removeScrollCallback(name);
  }

  /**
   * Remove scroll callback
   */
  removeScrollCallback(name) {
    const callback = this.scrollCallbacks.get(name);
    if (callback) {
      window.removeEventListener('scroll', callback);
      this.scrollCallbacks.delete(name);
    }
  }

  /**
   * Check if element is in viewport
   */
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
      rect.top >= -threshold &&
      rect.bottom <= windowHeight + threshold
    );
  }

  /**
   * Get scroll position
   */
  getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    };
  }

  /**
   * Get scroll percentage
   */
  getScrollPercentage() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  /**
   * Lock scroll (useful for modals)
   */
  lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
  }

  /**
   * Unlock scroll
   */
  unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  /**
   * Get scrollbar width
   */
  getScrollbarWidth() {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  /**
   * Cleanup
   */
  destroy() {
    this.scrollCallbacks.forEach((callback) => {
      window.removeEventListener('scroll', callback);
    });
    this.scrollCallbacks.clear();
    this.isScrolling = false;
  }
}