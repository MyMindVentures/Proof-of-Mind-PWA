import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Eye,
  FileText,
  Rocket,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import productionReadinessService from '../../services/productionReadinessService';

const ProductionReadinessDashboard = () => {
  const [auditResults, setAuditResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'security', name: 'Security', icon: Shield, color: 'red' },
    { id: 'performance', name: 'Performance', icon: Zap, color: 'yellow' },
    { id: 'reliability', name: 'Reliability', icon: AlertTriangle, color: 'blue' },
    { id: 'scalability', name: 'Scalability', icon: TrendingUp, color: 'green' },
    { id: 'monitoring', name: 'Monitoring', icon: Eye, color: 'purple' },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle, color: 'indigo' },
    { id: 'documentation', name: 'Documentation', icon: FileText, color: 'pink' },
    { id: 'deployment', name: 'Deployment', icon: Rocket, color: 'orange' }
  ];

  const runFullAudit = async () => {
    setIsRunning(true);
    setCurrentCategory(null);
    
    try {
      // Simulate audit progress
      for (const category of categories) {
        setCurrentCategory(category.id);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate audit time
      }
      
      const results = await productionReadinessService.executeFullAudit();
      setAuditResults(results);
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsRunning(false);
      setCurrentCategory(null);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.icon || Settings;
  };

  const getCategoryColor = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.color || 'gray';
  };

  const getOverallStatus = (score) => {
    if (score >= 90) return { status: 'Ready', color: 'green' };
    if (score >= 70) return { status: 'Needs Work', color: 'yellow' };
    return { status: 'Not Ready', color: 'red' };
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-400 mb-2">
              Production Readiness Audit
            </h1>
            <p className="text-dark-300 text-lg">
              Devin-style comprehensive production validation
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {auditResults && (
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.overallScore)}`}>
                  {auditResults.overallScore}%
                </div>
                <div className="text-sm text-dark-300">
                  {getOverallStatus(auditResults.overallScore).status}
                </div>
              </div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runFullAudit}
              disabled={isRunning}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isRunning ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isRunning ? 'Running Audit...' : 'Run Full Audit'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Audit Progress */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-dark-800 rounded-lg border border-dark-700"
        >
          <h3 className="text-lg font-semibold mb-4">Audit Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = currentCategory === category.id;
              const isCompleted = categories.indexOf(category) < categories.indexOf(
                categories.find(c => c.id === currentCategory) || categories[categories.length - 1]
              );
              
              return (
                <div
                  key={category.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isActive 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : isCompleted
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-dark-600 bg-dark-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-primary-400' : isCompleted ? 'text-green-400' : 'text-dark-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-primary-400' : isCompleted ? 'text-green-400' : 'text-dark-400'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Production Blockers */}
      {auditResults?.productionBlockers?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 bg-red-900/20 border border-red-500 rounded-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <XCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-400">
              Production Blockers
            </h3>
          </div>
          <div className="space-y-3">
            {auditResults.productionBlockers.map((blocker, index) => (
              <div key={index} className="p-3 bg-red-900/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-red-300 capitalize">
                    {blocker.category}
                  </span>
                  <span className="text-red-400 font-bold">
                    {blocker.score}%
                  </span>
                </div>
                <div className="text-sm text-red-200">
                  {blocker.issues.length} critical issues found
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Audit Results */}
      {auditResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const result = auditResults.auditResults[category.id];
            const score = result?.score || 0;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-primary-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 text-${category.color}-400`} />
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getScoreBgColor(score)}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-300">Issues:</span>
                    <span className="text-white">{result?.issues?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-300">Recommendations:</span>
                    <span className="text-white">{result?.recommendations?.length || 0}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    score >= 90 ? 'text-green-400' : score >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Work'}
                  </span>
                  <span className="text-xs text-dark-400">Click for details</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && auditResults && (
        <CategoryDetailsModal
          category={selectedCategory}
          result={auditResults.auditResults[selectedCategory]}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {/* Recommendations */}
      {auditResults?.recommendations?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 p-6 rounded-lg border border-dark-700"
        >
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="space-y-4">
            {auditResults.recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white capitalize">
                    {rec.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'high' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                <div className="text-sm text-dark-300">
                  Score: {rec.score}% - {rec.recommendations.length} recommendations
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Category Details Modal Component
const CategoryDetailsModal = ({ category, result, onClose }) => {
  const categories = [
    { id: 'security', name: 'Security', icon: Shield, color: 'red' },
    { id: 'performance', name: 'Performance', icon: Zap, color: 'yellow' },
    { id: 'reliability', name: 'Reliability', icon: AlertTriangle, color: 'blue' },
    { id: 'scalability', name: 'Scalability', icon: TrendingUp, color: 'green' },
    { id: 'monitoring', name: 'Monitoring', icon: Eye, color: 'purple' },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle, color: 'indigo' },
    { id: 'documentation', name: 'Documentation', icon: FileText, color: 'pink' },
    { id: 'deployment', name: 'Deployment', icon: Rocket, color: 'orange' }
  ];

  const categoryInfo = categories.find(c => c.id === category);
  const Icon = categoryInfo?.icon || Settings;

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
        className="bg-dark-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon className={`w-8 h-8 text-${categoryInfo?.color}-400`} />
            <h2 className="text-2xl font-bold text-white">
              {categoryInfo?.name} Audit Results
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Overall Score</span>
            <span className={`text-3xl font-bold ${
              result.score >= 90 ? 'text-green-500' : 
              result.score >= 70 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {result.score}%
            </span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                result.score >= 90 ? 'bg-green-500' : 
                result.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>

        {/* Issues */}
        {result.issues?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-red-400">Issues Found</h3>
            <div className="space-y-2">
              {result.issues.map((issue, index) => (
                <div key={index} className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-red-200">{issue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {result.recommendations?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-400">Recommendations</h3>
            <div className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-green-200">{recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductionReadinessDashboard;
