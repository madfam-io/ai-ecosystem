/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
    this.isEnabled = true;
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!this.isEnabled) return;

    // Setup performance observers
    this.setupObservers();
    
    // Track page load metrics
    this.trackPageLoad();
    
    // Setup memory monitoring
    this.setupMemoryMonitoring();
  }

  /**
   * Start timing a operation
   */
  start(name) {
    if (!this.isEnabled) return;
    this.metrics.set(name, { startTime: performance.now() });
  }

  /**
   * End timing an operation
   */
  end(name) {
    if (!this.isEnabled) return;
    
    const metric = this.metrics.get(name);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      console.log(`⏱️ ${name}: ${metric.duration.toFixed(2)}ms`);
    }
  }

  /**
   * Measure function execution time
   */
  measureFunction(name, fn) {
    if (!this.isEnabled) return fn();
    
    this.start(name);
    const result = fn();
    this.end(name);
    return result;
  }

  /**
   * Measure async function execution time
   */
  async measureAsyncFunction(name, fn) {
    if (!this.isEnabled) return await fn();
    
    this.start(name);
    const result = await fn();
    this.end(name);
    return result;
  }

  /**
   * Setup performance observers
   */
  setupObservers() {
    try {
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      }
    } catch (error) {
      console.warn('Performance observers not available:', error);
    }
  }

  /**
   * Track page load metrics
   */
  trackPageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          console.log(`📊 Page Load Metrics:
            - DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms
            - TCP Connect: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms
            - Request: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms
            - Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms
            - DOM Processing: ${(navigation.domContentLoadedEventEnd - navigation.responseEnd).toFixed(2)}ms
            - Total Load Time: ${(navigation.loadEventEnd - navigation.navigationStart).toFixed(2)}ms`);
        }
      }, 0);
    });
  }

  /**
   * Setup memory monitoring
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        console.log(`💾 Memory Usage:
          - Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB
          - Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB
          - Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
      }, 30000); // Every 30 seconds
    }
  }

  /**
   * Record an error for monitoring
   */
  recordError(error) {
    console.error('🚨 Error recorded:', error);
    // In a real app, this would send to monitoring service
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Disable performance monitoring
   */
  disable() {
    this.isEnabled = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}