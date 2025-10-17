// Founder Chatbot Dashboard Component
// Autonomous brainstorming and project execution interface

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Brain, 
  Zap, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Users,
  DollarSign,
  Code,
  Lightbulb,
  Activity
} from 'lucide-react';
import { useFounderChatbotStore } from '../../services/founderChatbotService';
import InterviewWidget from './InterviewWidget';

const FounderChatbotDashboard = () => {
  const {
    isActive,
    currentSession,
    conversationHistory,
    pendingActions,
    executedActions,
    systemStatus,
    startChatSession,
    executeAutonomousLoop,
    getConversationHistory,
    getPendingActions,
    getExecutedActions,
    getSystemStatus
  } = useFounderChatbotStore();

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  // Auto-execute pending actions
  useEffect(() => {
    if (pendingActions.length > 0 && systemStatus === 'active') {
      const timer = setTimeout(() => {
        executeAutonomousLoop();
      }, 2000); // 2 second delay for human-like behavior
      
      return () => clearTimeout(timer);
    }
  }, [pendingActions, systemStatus, executeAutonomousLoop]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsTyping(true);
    try {
      await startChatSession(message);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'idle': return 'text-gray-500';
      case 'active': return 'text-blue-500';
      case 'executing': return 'text-yellow-500';
      case 'completed': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'idle': return <Pause className="w-4 h-4" />;
      case 'active': return <MessageCircle className="w-4 h-4" />;
      case 'executing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Pause className="w-4 h-4" />;
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'interview_coordination': return <Users className="w-4 h-4" />;
      case 'contact_management': return <MessageCircle className="w-4 h-4" />;
      case 'status_update': return <BarChart3 className="w-4 h-4" />;
      case 'revenue_generation': return <DollarSign className="w-4 h-4" />;
      case 'technical_improvement': return <Code className="w-4 h-4" />;
      case 'brainstorming': return <Lightbulb className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
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

  const tabs = [
    { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'actions', label: 'Actions', icon: <Zap className="w-4 h-4" /> },
    { id: 'status', label: 'Status', icon: <Activity className="w-4 h-4" /> }
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
                <h1 className="text-xl font-bold">Founder Chatbot</h1>
                <p className="text-sm text-gray-400">Autonomous Project Execution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${getStatusColor(systemStatus)}`}>
                {getStatusIcon(systemStatus)}
                <span className="text-sm font-medium capitalize">{systemStatus}</span>
              </div>
              <div className="text-sm text-gray-400">
                {pendingActions.length} pending actions
              </div>
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
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]"
            >
              {/* Chat Interface */}
              <div className="lg:col-span-2 flex flex-col">
                <div className="bg-dark-800 rounded-lg border border-dark-700 flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-dark-700">
                    <h3 className="text-lg font-semibold">Project Brainstorming</h3>
                    <p className="text-sm text-gray-400">
                      Brainstorm with me about your project. I'll execute everything automatically.
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversationHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Start Brainstorming</h3>
                        <p className="text-gray-400 mb-6">
                          Tell me what you'd like to work on. I'll handle everything automatically.
                        </p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>• "I need to schedule interviews with Joe Dispenza"</p>
                          <p>• "Send outreach messages to potential sponsors"</p>
                          <p>• "Show me the current project status"</p>
                          <p>• "I want to brainstorm revenue ideas"</p>
                        </div>
                      </div>
                    ) : (
                      conversationHistory.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-primary-600 text-white'
                                : 'bg-dark-700 text-gray-100'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-2">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-dark-700 p-4 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-dark-700">
                    <div className="flex space-x-2">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Brainstorm with me about your project..."
                        className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        rows={2}
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                        className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="space-y-6">
                {/* Interview Widget */}
                <InterviewWidget />
                {/* Pending Actions */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Pending Actions</h3>
                  {pendingActions.length > 0 ? (
                    <div className="space-y-3">
                      {pendingActions.map((action) => (
                        <div key={action.id} className="border border-dark-700 rounded-lg p-3">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                              {getActionIcon(action.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{action.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{action.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                                  {action.priority}
                                </span>
                                <span className="text-xs text-gray-500">{action.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No pending actions</p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setMessage("I need to schedule interviews with Joe Dispenza and Russell Barkley")}
                      className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Schedule Interviews</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setMessage("Send outreach messages to potential sponsors and donors")}
                      className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Contact Outreach</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setMessage("Show me the current project status and progress")}
                      className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Project Status</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setMessage("I want to brainstorm revenue generation ideas")}
                      className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-red-400" />
                        <span className="text-sm">Revenue Ideas</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Executed Actions */}
              <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Executed Actions</h3>
                {executedActions.length > 0 ? (
                  <div className="space-y-4">
                    {executedActions.map((executed, index) => (
                      <div key={index} className="border border-dark-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                              executed.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                              {executed.success ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{executed.action.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{executed.action.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(executed.action.priority)}`}>
                                  {executed.action.priority}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(executed.executedAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${
                            executed.success ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {executed.success ? 'Completed' : 'Failed'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No executed actions yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'status' && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* System Status */}
              <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      systemStatus === 'active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Activity className={`w-8 h-8 ${
                        systemStatus === 'active' ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h4 className="font-medium">System Status</h4>
                    <p className={`text-sm ${getStatusColor(systemStatus)}`}>
                      {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Messages</h4>
                    <p className="text-sm text-gray-400">{conversationHistory.length}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="font-medium">Actions</h4>
                    <p className="text-sm text-gray-400">{executedActions.length}</p>
                  </div>
                </div>
              </div>

              {/* Project Context */}
              <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Project Context</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary-400">Proof of Mind PWA</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Neurodiversity transformation journey documentation platform
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Current Phase</h4>
                    <p className="text-sm text-gray-400">Interview Coordination & Outreach</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Priority</h4>
                    <p className="text-sm text-gray-400">High - Revenue generation needed</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Timeline</h4>
                    <p className="text-sm text-gray-400">Immediate execution required</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FounderChatbotDashboard;
