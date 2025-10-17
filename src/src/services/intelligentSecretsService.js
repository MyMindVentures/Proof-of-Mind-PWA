/**
 * Intelligent Secrets Management Service
 * Automatically manages API keys and secrets for Proof of Mind PWA
 * Dynamically adapts to new features and services
 */

class IntelligentSecretsService {
  constructor() {
    this.projectContext = {
      name: 'Proof of Mind PWA',
      domain: 'proofofmind.app',
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      features: new Set(),
      services: new Map()
    };
    
    this.secretTemplates = new Map();
    this.pendingSecrets = new Set();
    this.autoDiscovery = true;
    
    this.initializeSecretTemplates();
    this.startFeatureDiscovery();
  }

  /**
   * Initialize secret templates for all known services
   */
  initializeSecretTemplates() {
    // AI Services
    this.addSecretTemplate('openai', {
      name: 'OpenAI',
      category: 'ai',
      priority: 'critical',
      authUrl: 'https://platform.openai.com/api-keys',
      settings: {
        projectName: this.projectContext.name,
        description: 'Proof of Mind PWA - AI Interview System',
        permissions: ['gpt-4', 'whisper-1', 'dall-e-3']
      },
      keys: [
        {
          name: 'OPENAI_API_KEY',
          description: 'OpenAI API key for GPT-4, Whisper, DALL-E',
          format: 'sk-',
          required: true,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Click "Create new secret key"',
        '2. Name: "Proof of Mind PWA"',
        '3. Description: "AI Interview System"',
        '4. Copy the key (starts with sk-)'
      ]
    });

    this.addSecretTemplate('anthropic', {
      name: 'Anthropic',
      category: 'ai',
      priority: 'critical',
      authUrl: 'https://console.anthropic.com/keys',
      settings: {
        projectName: this.projectContext.name,
        description: 'Proof of Mind PWA - Claude AI Integration',
        permissions: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']
      },
      keys: [
        {
          name: 'ANTHROPIC_API_KEY',
          description: 'Anthropic API key for Claude AI',
          format: 'sk-ant-',
          required: true,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Click "Create Key"',
        '2. Name: "Proof of Mind PWA"',
        '3. Description: "Claude AI Integration"',
        '4. Copy the key (starts with sk-ant-)'
      ]
    });

    // Payment Services
    this.addSecretTemplate('stripe', {
      name: 'Stripe',
      category: 'payment',
      priority: 'critical',
      authUrl: 'https://dashboard.stripe.com/apikeys',
      settings: {
        projectName: this.projectContext.name,
        website: `https://${this.projectContext.domain}`,
        description: 'Proof of Mind PWA - Payment Processing'
      },
      keys: [
        {
          name: 'STRIPE_PUBLISHABLE_KEY',
          description: 'Stripe publishable key for frontend',
          format: 'pk_live_',
          required: true,
          autoGenerate: false
        },
        {
          name: 'STRIPE_SECRET_KEY',
          description: 'Stripe secret key for backend',
          format: 'sk_live_',
          required: true,
          autoGenerate: false
        },
        {
          name: 'STRIPE_WEBHOOK_SECRET',
          description: 'Stripe webhook secret for events',
          format: 'whsec_',
          required: true,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Copy "Publishable key" (starts with pk_live_)',
        '2. Copy "Secret key" (starts with sk_live_)',
        '3. Go to Webhooks > Add endpoint',
        '4. URL: https://api.proofofmind.app/webhooks/stripe',
        '5. Copy webhook secret (starts with whsec_)'
      ]
    });

    // Authentication
    this.addSecretTemplate('auth0', {
      name: 'Auth0',
      category: 'auth',
      priority: 'critical',
      authUrl: 'https://manage.auth0.com/dashboard',
      settings: {
        projectName: this.projectContext.name,
        domain: this.projectContext.domain,
        description: 'Proof of Mind PWA - Authentication'
      },
      keys: [
        {
          name: 'AUTH0_DOMAIN',
          description: 'Auth0 domain',
          format: '.auth0.com',
          required: true,
          autoGenerate: false
        },
        {
          name: 'AUTH0_CLIENT_ID',
          description: 'Auth0 application client ID',
          format: 'alphanumeric',
          required: true,
          autoGenerate: false
        },
        {
          name: 'AUTH0_CLIENT_SECRET',
          description: 'Auth0 application client secret',
          format: 'alphanumeric',
          required: true,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Go to Applications > Create Application',
        '2. Choose "Single Page Application"',
        '3. Name: "Proof of Mind PWA"',
        '4. Allowed Callback URLs: https://proofofmind.app',
        '5. Copy Domain, Client ID, and Client Secret'
      ]
    });

    // Monitoring
    this.addSecretTemplate('sentry', {
      name: 'Sentry',
      category: 'monitoring',
      priority: 'high',
      authUrl: 'https://sentry.io/settings/projects/',
      settings: {
        projectName: this.projectContext.name,
        platform: 'javascript-react',
        description: 'Proof of Mind PWA - Error Monitoring'
      },
      keys: [
        {
          name: 'SENTRY_DSN',
          description: 'Sentry DSN for error tracking',
          format: 'https://',
          required: false,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Create new project or select existing',
        '2. Platform: React',
        '3. Project name: "Proof of Mind PWA"',
        '4. Go to Settings > Client Keys (DSN)',
        '5. Copy the DSN URL'
      ]
    });

    // Analytics
    this.addSecretTemplate('google-analytics', {
      name: 'Google Analytics',
      category: 'analytics',
      priority: 'medium',
      authUrl: 'https://analytics.google.com/analytics/web/',
      settings: {
        propertyName: this.projectContext.name,
        website: `https://${this.projectContext.domain}`,
        description: 'Proof of Mind PWA - Website Analytics'
      },
      keys: [
        {
          name: 'GOOGLE_ANALYTICS_ID',
          description: 'Google Analytics tracking ID',
          format: 'GA-',
          required: false,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Create new property or select existing',
        '2. Property name: "Proof of Mind PWA"',
        '3. Website URL: https://proofofmind.app',
        '4. Go to Admin > Data Streams',
        '5. Copy Measurement ID (GA-XXXXXXXXX)'
      ]
    });

    // MCP Services
    this.addSecretTemplate('devin', {
      name: 'Devin AI',
      category: 'mcp',
      priority: 'high',
      authUrl: 'https://devin.ai/dashboard',
      settings: {
        projectName: this.projectContext.name,
        description: 'Proof of Mind PWA - Autonomous Coding'
      },
      keys: [
        {
          name: 'DEVIN_API_KEY',
          description: 'Devin AI API key for autonomous coding',
          format: 'dev_',
          required: false,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Go to API Keys section',
        '2. Create new API key',
        '3. Name: "Proof of Mind PWA"',
        '4. Copy the key'
      ]
    });

    this.addSecretTemplate('cursor', {
      name: 'Cursor AI',
      category: 'mcp',
      priority: 'high',
      authUrl: 'https://cursor.sh/settings',
      settings: {
        projectName: this.projectContext.name,
        description: 'Proof of Mind PWA - Code Completion'
      },
      keys: [
        {
          name: 'CURSOR_API_KEY',
          description: 'Cursor AI API key for code completion',
          format: 'cur_',
          required: false,
          autoGenerate: false
        }
      ],
      instructions: [
        '1. Go to Settings > API Keys',
        '2. Create new API key',
        '3. Name: "Proof of Mind PWA"',
        '4. Copy the key'
      ]
    });

    console.log(`🔧 Initialized ${this.secretTemplates.size} secret templates`);
  }

  /**
   * Add secret template for a service
   */
  addSecretTemplate(serviceId, template) {
    this.secretTemplates.set(serviceId, {
      ...template,
      id: serviceId,
      configured: false,
      lastChecked: null,
      keys: template.keys.map(key => ({
        ...key,
        configured: false,
        value: null,
        lastUpdated: null
      }))
    });
  }

  /**
   * Start feature discovery to detect new services needed
   */
  startFeatureDiscovery() {
    // Monitor for new features being added
    this.discoverFeatures();
    
    // Set up periodic discovery
    setInterval(() => {
      this.discoverFeatures();
    }, 30000); // Check every 30 seconds
  }

  /**
   * Discover new features and required services
   */
  discoverFeatures() {
    const currentFeatures = this.detectCurrentFeatures();
    const newFeatures = [...currentFeatures].filter(feature => 
      !this.projectContext.features.has(feature)
    );

    if (newFeatures.length > 0) {
      console.log(`🔍 Discovered new features: ${newFeatures.join(', ')}`);
      
      newFeatures.forEach(feature => {
        this.projectContext.features.add(feature);
        this.handleNewFeature(feature);
      });
    }
  }

  /**
   * Detect current features in the codebase
   */
  detectCurrentFeatures() {
    const features = new Set();
    
    // Check for AI Interview features
    if (this.hasFeature('aiInterviewer') || this.hasFeature('interviewWidget')) {
      features.add('ai-interviews');
    }
    
    // Check for payment features
    if (this.hasFeature('stripe') || this.hasFeature('donations')) {
      features.add('payments');
    }
    
    // Check for authentication features
    if (this.hasFeature('auth0') || this.hasFeature('authentication')) {
      features.add('authentication');
    }
    
    // Check for monitoring features
    if (this.hasFeature('sentry') || this.hasFeature('monitoring')) {
      features.add('monitoring');
    }
    
    // Check for MCP features
    if (this.hasFeature('mcp') || this.hasFeature('agenticAI')) {
      features.add('mcp-services');
    }
    
    return features;
  }

  /**
   * Check if a feature exists in the codebase
   */
  hasFeature(featureName) {
    // This would check the actual codebase for feature usage
    // For now, we'll simulate based on known features
    const knownFeatures = [
      'aiInterviewer', 'interviewWidget', 'stripe', 'donations',
      'auth0', 'authentication', 'sentry', 'monitoring',
      'mcp', 'agenticAI', 'founderChatbot', 'proofLayer'
    ];
    
    return knownFeatures.includes(featureName);
  }

  /**
   * Handle new feature discovery
   */
  handleNewFeature(feature) {
    console.log(`🆕 New feature detected: ${feature}`);
    
    // Determine required services for this feature
    const requiredServices = this.getRequiredServicesForFeature(feature);
    
    requiredServices.forEach(serviceId => {
      if (!this.secretTemplates.has(serviceId)) {
        console.log(`⚠️  Unknown service required: ${serviceId}`);
        return;
      }
      
      const template = this.secretTemplates.get(serviceId);
      if (!template.configured) {
        this.pendingSecrets.add(serviceId);
        this.notifyNewServiceRequired(serviceId, template);
      }
    });
  }

  /**
   * Get required services for a feature
   */
  getRequiredServicesForFeature(feature) {
    const featureServiceMap = {
      'ai-interviews': ['openai', 'anthropic'],
      'payments': ['stripe'],
      'authentication': ['auth0'],
      'monitoring': ['sentry'],
      'mcp-services': ['devin', 'cursor'],
      'analytics': ['google-analytics']
    };
    
    return featureServiceMap[feature] || [];
  }

  /**
   * Notify that a new service is required
   */
  notifyNewServiceRequired(serviceId, template) {
    const notification = {
      type: 'new-service-required',
      service: template,
      priority: template.priority,
      timestamp: new Date().toISOString(),
      environment: this.projectContext.environment
    };
    
    console.log(`🔔 New service required: ${template.name}`);
    console.log(`   Priority: ${template.priority}`);
    console.log(`   Category: ${template.category}`);
    
    // Send notification to UI
    this.sendNotification(notification);
    
    // Auto-open service if high priority
    if (template.priority === 'critical') {
      this.autoOpenService(serviceId, template);
    }
  }

  /**
   * Auto-open service in browser
   */
  autoOpenService(serviceId, template) {
    console.log(`🌐 Auto-opening ${template.name}...`);
    
    // This would open the browser with the service URL
    // In a real implementation, this would use the system's default browser
    const url = this.buildServiceURL(template);
    
    // Send to UI to open in browser
    this.sendBrowserOpenRequest(url, template);
  }

  /**
   * Build service URL with project context
   */
  buildServiceURL(template) {
    let url = template.authUrl;
    
    // Add project context to URL if supported
    if (template.settings) {
      const params = new URLSearchParams();
      
      if (template.settings.projectName) {
        params.append('project', template.settings.projectName);
      }
      
      if (template.settings.description) {
        params.append('description', template.settings.description);
      }
      
      if (params.toString()) {
        url += (url.includes('?') ? '&' : '?') + params.toString();
      }
    }
    
    return url;
  }

  /**
   * Send notification to UI
   */
  sendNotification(notification) {
    // This would send to the UI component
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('secrets-notification', {
        detail: notification
      }));
    }
  }

  /**
   * Send browser open request to UI
   */
  sendBrowserOpenRequest(url, template) {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('open-service-url', {
        detail: { url, template }
      }));
    }
  }

  /**
   * Configure service with API keys
   */
  async configureService(serviceId, keys) {
    const template = this.secretTemplates.get(serviceId);
    if (!template) {
      throw new Error(`Unknown service: ${serviceId}`);
    }
    
    console.log(`🔧 Configuring ${template.name}...`);
    
    // Validate keys
    const validatedKeys = this.validateKeys(template, keys);
    
    // Set keys in Doppler
    const results = [];
    for (const key of validatedKeys) {
      try {
        const result = await this.setDopplerSecret(key.name, key.value);
        results.push({ ...key, success: result });
      } catch (error) {
        results.push({ ...key, success: false, error: error.message });
      }
    }
    
    // Update template status
    const allConfigured = results.every(r => r.success);
    template.configured = allConfigured;
    template.lastChecked = new Date().toISOString();
    
    // Update individual key status
    template.keys.forEach(templateKey => {
      const result = results.find(r => r.name === templateKey.name);
      if (result) {
        templateKey.configured = result.success;
        templateKey.value = result.success ? result.value : null;
        templateKey.lastUpdated = new Date().toISOString();
      }
    });
    
    // Remove from pending if configured
    if (allConfigured) {
      this.pendingSecrets.delete(serviceId);
    }
    
    console.log(`✅ ${template.name} configuration ${allConfigured ? 'completed' : 'failed'}`);
    
    return {
      service: template,
      results,
      success: allConfigured
    };
  }

  /**
   * Validate API keys against template
   */
  validateKeys(template, keys) {
    return keys.map(key => {
      const templateKey = template.keys.find(tk => tk.name === key.name);
      if (!templateKey) {
        throw new Error(`Unknown key: ${key.name}`);
      }
      
      // Validate format
      if (templateKey.format && !key.value.startsWith(templateKey.format)) {
        throw new Error(`Invalid format for ${key.name}. Expected: ${templateKey.format}`);
      }
      
      return {
        name: `VITE_${key.name}`,
        value: key.value,
        originalName: key.name
      };
    });
  }

  /**
   * Set secret in Doppler
   */
  async setDopplerSecret(keyName, value) {
    // This would call the Doppler API
    // For now, we'll simulate the API call
    console.log(`🔐 Setting ${keyName} in Doppler...`);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ ${keyName} set successfully`);
        resolve(true);
      }, 1000);
    });
  }

  /**
   * Get service status
   */
  getServiceStatus(serviceId) {
    const template = this.secretTemplates.get(serviceId);
    if (!template) {
      return null;
    }
    
    return {
      id: serviceId,
      name: template.name,
      category: template.category,
      priority: template.priority,
      configured: template.configured,
      lastChecked: template.lastChecked,
      keys: template.keys.map(key => ({
        name: key.name,
        configured: key.configured,
        required: key.required,
        lastUpdated: key.lastUpdated
      }))
    };
  }

  /**
   * Get all services status
   */
  getAllServicesStatus() {
    const services = [];
    
    for (const [serviceId, template] of this.secretTemplates) {
      services.push(this.getServiceStatus(serviceId));
    }
    
    return services.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Get pending services
   */
  getPendingServices() {
    return Array.from(this.pendingSecrets).map(serviceId => 
      this.getServiceStatus(serviceId)
    );
  }

  /**
   * Get service configuration instructions
   */
  getServiceInstructions(serviceId) {
    const template = this.secretTemplates.get(serviceId);
    if (!template) {
      return null;
    }
    
    return {
      name: template.name,
      authUrl: this.buildServiceURL(template),
      instructions: template.instructions,
      keys: template.keys,
      settings: template.settings
    };
  }

  /**
   * Configure service with API keys
   */
  async configureService(serviceId, keys) {
    try {
      const template = this.secretTemplates.get(serviceId);
      if (!template) {
        throw new Error(`Service ${serviceId} not found`);
      }

      // Update keys in template
      for (const key of keys) {
        const keyTemplate = template.keys.find(k => k.name === key.name);
        if (keyTemplate) {
          // Persist to Doppler via dev-only middleware
          try {
            const response = await fetch('/__secrets/set', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key: keyTemplate.name, value: key.value, environment: 'production', project: 'proof-of-mind-pwa' })
            });
            const result = await response.json();
            if (!result?.success) {
              throw new Error(result?.error || 'Failed saving to Doppler');
            }
          } catch (e) {
            console.error('Failed to persist secret to Doppler:', e);
            throw e;
          }

          keyTemplate.configured = true;
          keyTemplate.value = key.value;
          keyTemplate.lastUpdated = new Date().toISOString();
        }
      }

      // Update service status
      template.configured = template.keys.every(k => k.configured);
      template.lastChecked = new Date().toISOString();

      // Here you would normally update Doppler
      // For now, we'll simulate it
      console.log(`🔧 Configured service ${serviceId} with keys:`, keys);

      return {
        success: true,
        service: template,
        message: `${template.name} configured successfully`
      };
    } catch (error) {
      console.error(`❌ Failed to configure service ${serviceId}:`, error);
      return {
        success: false,
        service: null,
        message: error.message
      };
    }
  }
}

export default new IntelligentSecretsService();
