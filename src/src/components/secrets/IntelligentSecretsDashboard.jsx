import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Settings,
  Zap,
  Shield,
  Brain,
  CreditCard,
  Users,
  BarChart3,
  Plus,
  RefreshCw,
  Bell
} from 'lucide-react';
import intelligentSecretsService from '../../services/intelligentSecretsService';
import BrowserViewer from './BrowserViewer';

const IntelligentSecretsDashboard = () => {
  const [services, setServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showBrowser, setShowBrowser] = useState(false);
  const [browserService, setBrowserService] = useState(null);

  useEffect(() => {
    loadServices();
    setupEventListeners();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadServices = () => {
    const allServices = intelligentSecretsService.getAllServicesStatus();
    const pending = intelligentSecretsService.getPendingServices();
    
    setServices(allServices);
    setPendingServices(pending);
  };

  const setupEventListeners = () => {
    // Listen for new service notifications
    window.addEventListener('secrets-notification', (event) => {
      const notification = event.detail;
      setNotifications(prev => [...prev, notification]);
      
      // Auto-remove notification after 10 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== notification));
      }, 10000);
    });

    // Listen for browser open requests
    window.addEventListener('open-service-url', (event) => {
      const { url, template } = event.detail;
      openServiceInBrowser(url, template);
    });
  };

  const openServiceInBrowser = (url, template) => {
    // Open service in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Show configuration modal
    setSelectedService(template);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      ai: Brain,
      payment: CreditCard,
      auth: Users,
      monitoring: Shield,
      analytics: BarChart3,
      mcp: Zap
    };
    return icons[category] || Settings;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-red-500',
      high: 'text-orange-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return colors[priority] || 'text-gray-500';
  };

  const getStatusIcon = (configured) => {
    return configured ? CheckCircle : AlertCircle;
  };

  const getStatusColor = (configured) => {
    return configured ? 'text-green-500' : 'text-red-500';
  };

  const handleConfigureService = async (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setBrowserService(service);
      setShowBrowser(true);
    }
  };

  const handleKeyConfigured = async (apiKey) => {
    if (browserService) {
      try {
        const result = await intelligentSecretsService.configureService(browserService.id, [{
          name: browserService.keys[0].name,
          value: apiKey
        }]);
        
        if (result.success) {
          setNotifications(prev => [...prev, {
            type: 'success',
            message: `${browserService.name} configured successfully!`,
            timestamp: new Date().toISOString()
          }]);
          loadServices();
        }
      } catch (error) {
        setNotifications(prev => [...prev, {
          type: 'error',
          message: `Failed to configure ${browserService.name}`,
          timestamp: new Date().toISOString()
        }]);
      }
    }
    setShowBrowser(false);
    setBrowserService(null);
  };

  const handleServiceConfigured = async (serviceId, keys) => {
    setIsConfiguring(true);
    
    try {
      const result = await intelligentSecretsService.configureService(serviceId, keys);
      
      if (result.success) {
        // Refresh services
        loadServices();
        
        // Show success notification
        setNotifications(prev => [...prev, {
          type: 'success',
          message: `${result.service.name} configured successfully!`,
          timestamp: new Date().toISOString()
        }]);
      } else {
        // Show error notification
        setNotifications(prev => [...prev, {
          type: 'error',
          message: `Failed to configure ${result.service.name}`,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      setNotifications(prev => [...prev, {
        type: 'error',
        message: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsConfiguring(false);
      setSelectedService(null);
    }
  };

  const dismissNotification = (notification) => {
    setNotifications(prev => prev.filter(n => n !== notification));
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-400 mb-2">
          Intelligent Secrets Management
        </h1>
        <p className="text-dark-300 text-lg">
          Automatically manages API keys and secrets for your PWA
        </p>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`mb-4 p-4 rounded-lg border-l-4 ${
              notification.type === 'success' 
                ? 'bg-green-900/20 border-green-500' 
                : notification.type === 'error'
                ? 'bg-red-900/20 border-red-500'
                : 'bg-blue-900/20 border-blue-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5" />
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => dismissNotification(notification)}
                className="text-dark-400 hover:text-white"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pending Services Alert */}
      {pendingServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-orange-900/20 border border-orange-500 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="text-lg font-semibold text-orange-400">
                New Services Required
              </h3>
              <p className="text-dark-300">
                {pendingServices.length} new service(s) detected and need configuration
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category);
          const StatusIcon = getStatusIcon(service.configured);
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CategoryIcon className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                </div>
                <StatusIcon className={`w-6 h-6 ${getStatusColor(service.configured)}`} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Category:</span>
                  <span className="text-white capitalize">{service.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Priority:</span>
                  <span className={`font-semibold ${getPriorityColor(service.priority)}`}>
                    {service.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-300">Status:</span>
                  <span className={getStatusColor(service.configured)}>
                    {service.configured ? 'Configured' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-semibold text-dark-300">API Keys:</h4>
                {service.keys.map((key) => (
                  <div key={key.name} className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">{key.name}</span>
                    {key.configured ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConfigureService(service.id)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </motion.button>
                
                {!service.configured && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConfigureService(service.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                    title="Open in Browser"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Browser Viewer */}
      {showBrowser && browserService && (
        <BrowserViewer
          serviceUrl={browserService.authUrl || `https://${browserService.id}.com`}
          serviceName={browserService.name}
          onClose={() => {
            setShowBrowser(false);
            setBrowserService(null);
          }}
          onKeyConfigured={handleKeyConfigured}
        />
      )}

      {/* Service Configuration Modal */}
      {selectedService && (
        <ServiceConfigurationModal
          service={selectedService}
          onConfigure={handleServiceConfigured}
          onClose={() => setSelectedService(null)}
          isConfiguring={isConfiguring}
        />
      )}

      {/* Auto-Discovery Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-800 p-4 rounded-lg border border-dark-700"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-primary-400" />
            <div>
              <h3 className="text-lg font-semibold">Auto-Discovery</h3>
              <p className="text-dark-300 text-sm">
                Automatically detects new features and required services
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Service Configuration Modal Component
const ServiceConfigurationModal = ({ service, onConfigure, onClose, isConfiguring }) => {
  const [keys, setKeys] = useState({});
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const handleKeyChange = (keyName, value) => {
    setKeys(prev => ({ ...prev, [keyName]: value }));
  };

  const handleNextKey = () => {
    if (currentKeyIndex < service.keys.length - 1) {
      setCurrentKeyIndex(currentKeyIndex + 1);
    }
  };

  const handlePrevKey = () => {
    if (currentKeyIndex > 0) {
      setCurrentKeyIndex(currentKeyIndex - 1);
    }
  };

  const handleSubmit = () => {
    const keyEntries = Object.entries(keys).map(([name, value]) => ({
      name: name.replace('VITE_', ''),
      value
    }));
    
    onConfigure(service.id, keyEntries);
  };

  const currentKey = service.keys[currentKeyIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-400">
            Configure {service.name}
          </h2>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-dark-300">
            {service.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">API Key Configuration</h3>
            <span className="text-sm text-dark-400">
              {currentKeyIndex + 1} of {service.keys.length}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                {currentKey.name}
              </label>
              <p className="text-sm text-dark-400 mb-3">
                {currentKey.description}
              </p>
              <input
                type="text"
                value={keys[currentKey.name] || ''}
                onChange={(e) => handleKeyChange(currentKey.name, e.target.value)}
                placeholder={`Enter ${currentKey.name}...`}
                className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevKey}
              disabled={currentKeyIndex === 0}
              className="px-4 py-2 bg-dark-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentKeyIndex < service.keys.length - 1 ? (
              <button
                onClick={handleNextKey}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isConfiguring || Object.keys(keys).length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConfiguring ? 'Configuring...' : 'Configure Service'}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntelligentSecretsDashboard;
