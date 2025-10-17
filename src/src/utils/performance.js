// Performance optimization utilities
import React from 'react';

// Lazy loading utilities
export const lazyLoadComponent = (importFunction, fallback = null) => {
  return React.lazy(importFunction);
};

// Image optimization
export const optimizeImage = (src, options = {}) => {
  const { width = 800, height = 600, quality = 80, format = 'webp' } = options;

  // If using a CDN like Cloudinary or similar
  if (src.includes('cloudinary.com') || src.includes('imagekit.io')) {
    return `${src}?w=${width}&h=${height}&q=${quality}&f=${format}`;
  }

  // For local images, return as-is
  return src;
};

// Debounce function for performance
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    try {
      const result = await fn(...args);
      const end = performance.now();
      console.log(`⏱️ ${name} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(
        `❌ ${name} failed after ${end - start} milliseconds:`,
        error
      );
      throw error;
    }
  };
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
    };
  }
  return null;
};

// Bundle size optimization
export const preloadRoute = routePath => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = routePath;
  document.head.appendChild(link);
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/inter.woff2',
    '/images/hero-bg.webp',
    '/api/health',
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    if (resource.endsWith('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.endsWith('.webp')) {
      link.as = 'image';
    }
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    console.log('✅ Cache cleared');
  }
};

// Performance budget monitoring
export const checkPerformanceBudget = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (!navigation) return null;

  const metrics = {
    // Core Web Vitals
    FCP: 0, // First Contentful Paint
    LCP: 0, // Largest Contentful Paint
    FID: 0, // First Input Delay
    CLS: 0, // Cumulative Layout Shift
    TTFB: navigation.responseStart - navigation.requestStart, // Time to First Byte
    DOMContentLoaded:
      navigation.domContentLoadedEventEnd - navigation.navigationStart,
    LoadComplete: navigation.loadEventEnd - navigation.navigationStart,
  };

  // Performance budgets (in milliseconds)
  const budgets = {
    FCP: 1800,
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    TTFB: 600,
    DOMContentLoaded: 2000,
    LoadComplete: 3000,
  };

  const violations = [];
  Object.keys(budgets).forEach(metric => {
    if (metrics[metric] > budgets[metric]) {
      violations.push({
        metric,
        actual: metrics[metric],
        budget: budgets[metric],
        overage: metrics[metric] - budgets[metric],
      });
    }
  });

  return {
    metrics,
    budgets,
    violations,
    score: Math.max(0, 100 - violations.length * 20),
  };
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://api.proofofmind.app' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://api.proofofmind.app',
      crossorigin: true,
    },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.keys(hint).forEach(key => {
      link[key] = hint[key];
    });
    document.head.appendChild(link);
  });
};

// Code splitting utilities
export const createAsyncComponent = (importFunction, fallback = null) => {
  return React.lazy(importFunction);
};

// Bundle analyzer integration
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    // Only in development
    console.log('📊 Bundle analysis available in development mode');
  }
};

// Performance optimization for AI services
export const optimizeAIService = {
  // Batch AI requests
  batchRequests: (requests, batchSize = 5) => {
    const batches = [];
    for (let i = 0; i < requests.length; i += batchSize) {
      batches.push(requests.slice(i, i + batchSize));
    }
    return batches;
  },

  // Cache AI responses
  cacheResponse: (key, response, ttl = 300000) => {
    // 5 minutes default
    const cacheKey = `ai_cache_${key}`;
    const cacheData = {
      response,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  },

  // Get cached AI response
  getCachedResponse: key => {
    const cacheKey = `ai_cache_${key}`;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    const now = Date.now();

    if (now - cacheData.timestamp > cacheData.ttl) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cacheData.response;
  },

  // Clear AI cache
  clearCache: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('ai_cache_')) {
        localStorage.removeItem(key);
      }
    });
  },
};

// Performance monitoring for AI agents
export const monitorAIPerformance = {
  trackAgentExecution: (agentId, action, startTime) => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`🤖 AI Agent ${agentId} - ${action}: ${duration.toFixed(2)}ms`);

    // Send to monitoring service if available
    if (window.monitoringService) {
      window.monitoringService.trackAIAgentActivity(agentId, action, {
        duration,
        timestamp: new Date().toISOString(),
      });
    }
  },

  trackRevenueGeneration: (source, amount, duration) => {
    console.log(
      `💰 Revenue Generation: $${amount} from ${source} in ${duration}ms`
    );

    if (window.monitoringService) {
      window.monitoringService.trackRevenueGeneration(source, amount, {
        duration,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();

  // Preload critical resources
  preloadCriticalResources();

  // Register service worker
  registerServiceWorker();

  // Monitor performance budget
  window.addEventListener('load', () => {
    setTimeout(() => {
      const budget = checkPerformanceBudget();
      if (budget && budget.violations.length > 0) {
        console.warn('⚠️ Performance budget violations:', budget.violations);
      }
    }, 1000);
  });

  console.log('✅ Performance optimizations initialized');
};

export default {
  lazyLoadComponent,
  optimizeImage,
  debounce,
  throttle,
  measurePerformance,
  getMemoryUsage,
  preloadRoute,
  preloadCriticalResources,
  registerServiceWorker,
  clearCache,
  checkPerformanceBudget,
  addResourceHints,
  createAsyncComponent,
  analyzeBundle,
  optimizeAIService,
  monitorAIPerformance,
  initializePerformanceOptimizations,
};


