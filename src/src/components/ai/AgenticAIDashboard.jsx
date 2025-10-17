// Agentic AI Dashboard Component
// Comprehensive project analysis and automatic upgrade management

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Play, 
  Pause, 
  RefreshCw,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Settings,
  BarChart3,
  FileText,
  Code,
  DollarSign,
  Lock,
  Gauge
} from 'lucide-react';
import { useAgenticAIStore } from '../../services/agenticAIService';

const AgenticAIDashboard = () => {
  const {
    isAnalyzing,
    currentAudit,
    auditHistory,
    pendingUpgrades,
    approvedUpgrades,
    systemStatus,
    lastAnalysis,
    startComprehensiveAnalysis,
    approveUpgrade,
    rejectUpgrade,
    getSystemStatus,
    getPendingUpgrades,
    getApprovedUpgrades,
    getLastAnalysis
  } = useAgenticAIStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh store data
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartAnalysis = async () => {
    try {
      await startComprehensiveAnalysis();
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const handleApproveUpgrade = async (upgradeId) => {
    try {
      await approveUpgrade(upgradeId);
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  const handleRejectUpgrade = (upgradeId) => {
    rejectUpgrade(upgradeId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'idle': return 'text-gray-500';
      case 'analyzing': return 'text-blue-500';
      case 'implementing': return 'text-yellow-500';
      case 'completed': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'idle': return <Pause className="w-4 h-4" />;
      case 'analyzing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'implementing': return <Zap className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Pause className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'ethical': return <Brain className="w-4 h-4" />;
      case 'legal': return <FileText className="w-4 h-4" />;
      case 'technical': return <Code className="w-4 h-4" />;
      case 'business': return <DollarSign className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Gauge className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Results', icon: <Eye className="w-4 h-4" /> },
    { id: 'upgrades', label: 'Upgrades', icon: <Zap className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-primary-400" />
              <div>
                <h1 className="text-xl font-bold">Agentic AI System</h1>
                <p className="text-sm text-gray-400">Automatic Project Analysis & Upgrades</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${getStatusColor(systemStatus)}`}>
                {getStatusIcon(systemStatus)}
                <span className="text-sm font-medium capitalize">{systemStatus}</span>
              </div>
              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Start Analysis'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">System Status</p>
                      <p className={`text-2xl font-bold ${getStatusColor(systemStatus)}`}>
                        {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${getStatusColor(systemStatus)}`}>
                      {getStatusIcon(systemStatus)}
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending Upgrades</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {pendingUpgrades.length}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Approved Upgrades</p>
                      <p className="text-2xl font-bold text-green-400">
                        {approvedUpgrades.length}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Last Analysis</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {lastAnalysis ? new Date(lastAnalysis.timestamp).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleStartAnalysis}
                    disabled={isAnalyzing}
                    className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Full Analysis</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('upgrades')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Review Upgrades</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <Clock className="w-5 h-5" />
                    <span>View History</span>
                  </button>
                </div>
              </div>

              {/* Current Analysis Progress */}
              {isAnalyzing && currentAudit && (
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h3 className="text-lg font-semibold mb-4">Current Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Analysis ID</span>
                      <span className="text-sm font-mono">{currentAudit.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className={`text-sm font-medium ${getStatusColor(currentAudit.status)}`}>
                        {currentAudit.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Started</span>
                      <span className="text-sm">
                        {new Date(currentAudit.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {lastAnalysis ? (
                <>
                  {/* Audit Summary */}
                  <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-lg font-semibold mb-4">Audit Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-400">Risk Score</p>
                        <p className={`text-3xl font-bold ${
                          lastAnalysis.riskScore > 0.7 ? 'text-red-400' :
                          lastAnalysis.riskScore > 0.4 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {(lastAnalysis.riskScore * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Findings</p>
                        <p className="text-3xl font-bold text-blue-400">
                          {lastAnalysis.findings.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Recommendations</p>
                        <p className="text-3xl font-bold text-green-400">
                          {lastAnalysis.recommendations.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-lg font-semibold mb-4">Findings</h3>
                    <div className="space-y-4">
                      {lastAnalysis.findings.map((finding, index) => (
                        <div key={index} className="border border-dark-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 rounded-full bg-red-100 text-red-600">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium">{finding.title}</h4>
                                <p className="text-sm text-gray-400 mt-1">{finding.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(finding.severity)}`}>
                                    {finding.severity}
                                  </span>
                                  <span className="text-xs text-gray-500">{finding.category}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-dark-800 rounded-lg p-12 border border-dark-700 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                  <p className="text-gray-400 mb-6">Run a comprehensive analysis to see audit results</p>
                  <button
                    onClick={handleStartAnalysis}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Start Analysis
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'upgrades' && (
            <motion.div
              key="upgrades"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Pending Upgrades */}
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold mb-4">Pending Upgrades</h3>
                {pendingUpgrades.length > 0 ? (
                  <div className="space-y-4">
                    {pendingUpgrades.map((upgrade) => (
                      <div key={upgrade.id} className="border border-dark-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                              {getCategoryIcon(upgrade.category)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{upgrade.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{upgrade.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(upgrade.priority)}`}>
                                  {upgrade.priority}
                                </span>
                                <span className="text-xs text-gray-500">{upgrade.estimatedTime}</span>
                                <span className="text-xs text-gray-500">{upgrade.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleApproveUpgrade(upgrade.id)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectUpgrade(upgrade.id)}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No pending upgrades</p>
                  </div>
                )}
              </div>

              {/* Approved Upgrades */}
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold mb-4">Approved Upgrades</h3>
                {approvedUpgrades.length > 0 ? (
                  <div className="space-y-4">
                    {approvedUpgrades.map((upgrade) => (
                      <div key={upgrade.id} className="border border-dark-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{upgrade.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{upgrade.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(upgrade.priority)}`}>
                                  {upgrade.priority}
                                </span>
                                <span className="text-xs text-gray-500">{upgrade.status}</span>
                                <span className="text-xs text-gray-500">{upgrade.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No approved upgrades</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold mb-4">Analysis History</h3>
                {auditHistory.length > 0 ? (
                  <div className="space-y-4">
                    {auditHistory.map((audit) => (
                      <div key={audit.id} className="border border-dark-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Analysis {audit.id}</h4>
                            <p className="text-sm text-gray-400">
                              {new Date(audit.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${getStatusColor(audit.status)}`}>
                              {audit.status}
                            </p>
                            <p className="text-sm text-gray-400">
                              Risk: {(audit.riskScore * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No analysis history</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgenticAIDashboard;
