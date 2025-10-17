import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  Home,
  Settings,
  Key,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const BrowserViewer = ({ onClose, serviceUrl, serviceName, onKeyConfigured }) => {
  const [currentUrl, setCurrentUrl] = useState(serviceUrl);
  const [history, setHistory] = useState([serviceUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleNavigation = (url) => {
    setIsLoading(true);
    setCurrentUrl(url);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleKeySubmit = () => {
    if (apiKey.trim()) {
      onKeyConfigured(apiKey);
      setShowKeyInput(false);
      setApiKey('');
    }
  };

  const getServiceInstructions = (serviceName) => {
    const instructions = {
      'OpenAI': [
        '1. Log in to your OpenAI account',
        '2. Go to API Keys section',
        '3. Click "Create new secret key"',
        '4. Name it "Proof of Mind PWA"',
        '5. Copy the key (starts with sk-)',
        '6. Paste it below'
      ],
      'Anthropic': [
        '1. Log in to your Anthropic account',
        '2. Go to API Keys section',
        '3. Click "Create Key"',
        '4. Name it "Proof of Mind PWA"',
        '5. Copy the key (starts with sk-ant-)',
        '6. Paste it below'
      ],
      'Stripe': [
        '1. Log in to your Stripe dashboard',
        '2. Go to Developers > API Keys',
        '3. Copy your Publishable Key',
        '4. Copy your Secret Key',
        '5. Paste them below'
      ],
      'Auth0': [
        '1. Log in to your Auth0 dashboard',
        '2. Go to Applications',
        '3. Select your app or create new',
        '4. Copy Domain and Client ID',
        '5. Paste them below'
      ]
    };
    
    return instructions[serviceName] || [
      '1. Navigate to the service website',
      '2. Find the API Keys section',
      '3. Generate a new API key',
      '4. Copy the key',
      '5. Paste it below'
    ];
  };

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
        className="bg-dark-800 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser Header */}
        <div className="bg-dark-700 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-white"
            >
              ×
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBack}
                disabled={historyIndex === 0}
                className="p-2 text-dark-400 hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleForward}
                disabled={historyIndex === history.length - 1}
                className="p-2 text-dark-400 hover:text-white disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleRefresh}
                className="p-2 text-dark-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 mx-4">
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNavigation(e.target.value)}
              className="w-full p-2 bg-dark-600 text-white rounded border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowKeyInput(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Key className="w-4 h-4" />
              <span>Add API Key</span>
            </button>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 flex">
          {/* Main Content Area */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg h-full overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary-400 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Service Instructions */}
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {serviceName} Setup Instructions
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      {getServiceInstructions(serviceName).map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Embedded Browser Content */}
                  <div className="flex-1 p-4">
                    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <ExternalLink className="w-12 h-12 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Service Website</p>
                        <p className="text-sm mb-4">
                          Navigate to {serviceName} to get your API key
                        </p>
                        <button
                          onClick={() => handleNavigation(serviceUrl)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Go to {serviceName}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with API Key Input */}
          <div className="w-80 bg-dark-700 p-4 border-l border-dark-600">
            <h3 className="text-lg font-semibold text-white mb-4">
              API Key Configuration
            </h3>
            
            {showKeyInput ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    API Key
                  </label>
                  <textarea
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste your API key here..."
                    className="w-full p-3 rounded-lg bg-dark-600 border border-dark-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 h-24 resize-none"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleKeySubmit}
                    disabled={!apiKey.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Configure
                  </button>
                  <button
                    onClick={() => setShowKeyInput(false)}
                    className="px-4 py-2 bg-dark-600 text-white rounded-lg hover:bg-dark-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Key className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-dark-300 mb-4">
                  Click "Add API Key" to configure your {serviceName} API key
                </p>
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add API Key
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrowserViewer;
