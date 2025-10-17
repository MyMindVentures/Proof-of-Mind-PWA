import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

class MonitoringService {
  constructor() {
    this.isInitialized = false;
    this.userContext = null;
  }

  async initialize() {
    try {
      if (this.isInitialized) return { success: true };

      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.VITE_NODE_ENV || 'development',
        integrations: [
          new BrowserTracing({
            // Set sampling rate for performance monitoring
            tracingOrigins: ['localhost', 'proofofmind.app', /^\//],
          }),
        ],
        // Performance Monitoring
        tracesSampleRate:
          import.meta.env.VITE_NODE_ENV === 'production' ? 0.1 : 1.0,
        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        // Release tracking
        release: import.meta.env.VITE_APP_VERSION || '1.0.0',
        // Error filtering
        beforeSend(event, hint) {
          // Filter out non-critical errors in production
          if (import.meta.env.VITE_NODE_ENV === 'production') {
            // Don't send network errors
            if (event.exception) {
              const error = hint.originalException;
              if (error && error.name === 'NetworkError') {
                return null;
              }
            }
          }
          return event;
        },
      });

      this.isInitialized = true;
      console.log('✅ Monitoring service initialized');

      return { success: true };
    } catch (error) {
      console.error('❌ Failed to initialize monitoring service:', error);
      return { success: false, error: error.message };
    }
  }

  // Set user context for error tracking
  setUserContext(user) {
    try {
      this.userContext = user;
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.name,
      });

      // Set additional context
      Sentry.setContext('user_profile', {
        emailVerified: user.emailVerified,
        roles: user.roles,
        permissions: user.permissions,
        metadata: user.metadata,
      });
    } catch (error) {
      console.error('Failed to set user context:', error);
    }
  }

  // Clear user context
  clearUserContext() {
    try {
      this.userContext = null;
      Sentry.setUser(null);
      Sentry.setContext('user_profile', null);
    } catch (error) {
      console.error('Failed to clear user context:', error);
    }
  }

  // Capture exception
  captureException(error, context = {}) {
    try {
      Sentry.withScope(scope => {
        // Add context
        Object.keys(context).forEach(key => {
          scope.setContext(key, context[key]);
        });

        // Set level
        scope.setLevel('error');

        // Capture the exception
        Sentry.captureException(error);
      });
    } catch (err) {
      console.error('Failed to capture exception:', err);
    }
  }

  // Capture message
  captureMessage(message, level = 'info', context = {}) {
    try {
      Sentry.withScope(scope => {
        // Add context
        Object.keys(context).forEach(key => {
          scope.setContext(key, context[key]);
        });

        // Set level
        scope.setLevel(level);

        // Capture the message
        Sentry.captureMessage(message);
      });
    } catch (error) {
      console.error('Failed to capture message:', error);
    }
  }

  // Add breadcrumb
  addBreadcrumb(message, category = 'user', level = 'info', data = {}) {
    try {
      Sentry.addBreadcrumb({
        message,
        category,
        level,
        data,
        timestamp: Date.now() / 1000,
      });
    } catch (error) {
      console.error('Failed to add breadcrumb:', error);
    }
  }

  // Set tag
  setTag(key, value) {
    try {
      Sentry.setTag(key, value);
    } catch (error) {
      console.error('Failed to set tag:', error);
    }
  }

  // Set context
  setContext(key, context) {
    try {
      Sentry.setContext(key, context);
    } catch (error) {
      console.error('Failed to set context:', error);
    }
  }

  // Track performance
  startTransaction(name, op = 'navigation') {
    try {
      // Note: startTransaction is deprecated in newer Sentry versions
      // Using startSpan instead for performance tracking
      return Sentry.startSpan({ name, op }, () => {
        return { name, op, startTime: Date.now() };
      });
    } catch (error) {
      console.error('Failed to start transaction:', error);
      return null;
    }
  }

  // Track AI agent activity
  trackAIAgentActivity(agentId, action, data = {}) {
    try {
      this.addBreadcrumb(`AI Agent ${agentId}: ${action}`, 'ai_agent', 'info', {
        agentId,
        action,
        ...data,
      });

      this.captureMessage(`AI Agent Activity: ${agentId} - ${action}`, 'info', {
        ai_agent: {
          agentId,
          action,
          timestamp: new Date().toISOString(),
          ...data,
        },
      });
    } catch (error) {
      console.error('Failed to track AI agent activity:', error);
    }
  }

  // Track revenue generation
  trackRevenueGeneration(source, amount, data = {}) {
    try {
      this.addBreadcrumb(
        `Revenue Generated: $${amount} from ${source}`,
        'revenue',
        'info',
        { source, amount, ...data }
      );

      this.captureMessage(
        `Revenue Generation: $${amount} from ${source}`,
        'info',
        {
          revenue: {
            source,
            amount,
            timestamp: new Date().toISOString(),
            ...data,
          },
        }
      );
    } catch (error) {
      console.error('Failed to track revenue generation:', error);
    }
  }

  // Track user interaction
  trackUserInteraction(action, page, data = {}) {
    try {
      this.addBreadcrumb(
        `User ${action} on ${page}`,
        'user_interaction',
        'info',
        { action, page, ...data }
      );
    } catch (error) {
      console.error('Failed to track user interaction:', error);
    }
  }

  // Track API calls
  trackAPICall(endpoint, method, status, duration, data = {}) {
    try {
      this.addBreadcrumb(
        `API ${method} ${endpoint} - ${status} (${duration}ms)`,
        'api',
        status >= 400 ? 'error' : 'info',
        { endpoint, method, status, duration, ...data }
      );
    } catch (error) {
      console.error('Failed to track API call:', error);
    }
  }

  // Get monitoring status
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasUserContext: !!this.userContext,
      environment: import.meta.env.VITE_NODE_ENV || 'development',
    };
  }
}

// Create singleton instance
const monitoringService = new MonitoringService();
export default monitoringService;
