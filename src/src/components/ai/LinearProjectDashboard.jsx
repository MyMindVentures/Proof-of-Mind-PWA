// Linear-Style Project Dashboard
// Comprehensive project status and progress tracking

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Play, 
  Pause, 
  Users, 
  MessageCircle, 
  DollarSign, 
  Code, 
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Brain,
  Shield,
  Heart,
  Star,
  ArrowRight,
  Filter,
  Search,
  Plus
} from 'lucide-react';

const LinearProjectDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real implementation, this would come from the services
  const projectData = {
    overview: {
      totalTasks: 47,
      completedTasks: 23,
      inProgressTasks: 12,
      pendingTasks: 12,
      completionRate: 49,
      velocity: 8.5,
      burndown: 15
    },
    tasks: [
      {
        id: 'task-001',
        title: 'Schedule interview with Joe Dispenza',
        description: 'Coordinate AI interview with consciousness expert',
        status: 'in_progress',
        priority: 'high',
        assignee: 'AI Assistant',
        dueDate: '2024-01-15',
        category: 'interview',
        progress: 75,
        estimatedHours: 4,
        actualHours: 3
      },
      {
        id: 'task-002',
        title: 'Send outreach to Russell Barkley',
        description: 'Contact ADHD expert for interview opportunity',
        status: 'pending',
        priority: 'high',
        assignee: 'AI Assistant',
        dueDate: '2024-01-16',
        category: 'outreach',
        progress: 0,
        estimatedHours: 2,
        actualHours: 0
      },
      {
        id: 'task-003',
        title: 'Implement revenue optimization',
        description: 'Set up donation campaigns and payment flows',
        status: 'completed',
        priority: 'high',
        assignee: 'AI Assistant',
        dueDate: '2024-01-14',
        category: 'revenue',
        progress: 100,
        estimatedHours: 6,
        actualHours: 5.5
      },
      {
        id: 'task-004',
        title: 'Technical performance audit',
        description: 'Run comprehensive technical analysis and improvements',
        status: 'in_progress',
        priority: 'medium',
        assignee: 'AI Assistant',
        dueDate: '2024-01-18',
        category: 'technical',
        progress: 40,
        estimatedHours: 8,
        actualHours: 3.2
      },
      {
        id: 'task-005',
        title: 'Community engagement campaign',
        description: 'Launch social media and community outreach',
        status: 'pending',
        priority: 'medium',
        assignee: 'AI Assistant',
        dueDate: '2024-01-20',
        category: 'community',
        progress: 0,
        estimatedHours: 12,
        actualHours: 0
      }
    ],
    metrics: {
      interviews: {
        scheduled: 3,
        completed: 1,
        pending: 2,
        successRate: 33
      },
      outreach: {
        sent: 47,
        responded: 12,
        converted: 3,
        responseRate: 25.5
      },
      revenue: {
        current: 1250,
        target: 5000,
        growth: 15.2,
        sources: ['donations', 'sponsors', 'premium']
      },
      technical: {
        performance: 92,
        security: 88,
        uptime: 99.9,
        issues: 2
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'interview': return <Users className="w-4 h-4" />;
      case 'outreach': return <MessageCircle className="w-4 h-4" />;
      case 'revenue': return <DollarSign className="w-4 h-4" />;
      case 'technical': return <Code className="w-4 h-4" />;
      case 'community': return <Heart className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const filteredTasks = projectData.tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const views = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'metrics', label: 'Metrics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Proof of Mind PWA</h1>
                <p className="text-sm text-gray-400">Project Status & Progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeView === view.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {view.icon}
                <span>{view.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Tasks</p>
                      <p className="text-2xl font-bold text-white">{projectData.overview.totalTasks}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{projectData.overview.completedTasks} completed</span>
                      <span className="mx-2">•</span>
                      <span>{projectData.overview.inProgressTasks} in progress</span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Completion Rate</p>
                      <p className="text-2xl font-bold text-white">{projectData.overview.completionRate}%</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${projectData.overview.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Velocity</p>
                      <p className="text-2xl font-bold text-white">{projectData.overview.velocity}</p>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>Tasks per week</span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Burndown</p>
                      <p className="text-2xl font-bold text-white">{projectData.overview.burndown}</p>
                    </div>
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <Target className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>Days remaining</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-dark-800 rounded-lg border border-dark-700">
                <div className="p-6 border-b border-dark-700">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {projectData.tasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          task.status === 'completed' ? 'bg-green-100 text-green-600' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {getCategoryIcon(task.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="bg-dark-800 rounded-lg border border-dark-700">
                <div className="p-6 border-b border-dark-700">
                  <h3 className="text-lg font-semibold">Tasks ({filteredTasks.length})</h3>
                </div>
                <div className="divide-y divide-dark-700">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="p-6 hover:bg-dark-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                            {getCategoryIcon(task.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{task.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                                {task.status.replace('_', ' ')}
                              </span>
                              <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Assignee: {task.assignee}</span>
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              <span>Est: {task.estimatedHours}h</span>
                              <span>Actual: {task.actualHours}h</span>
                            </div>
                            {task.progress > 0 && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress</span>
                                  <span>{task.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-primary-500 h-2 rounded-full" 
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interviews */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>Interviews</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Scheduled</span>
                      <span className="font-medium">{projectData.metrics.interviews.scheduled}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Completed</span>
                      <span className="font-medium text-green-400">{projectData.metrics.interviews.completed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Pending</span>
                      <span className="font-medium text-yellow-400">{projectData.metrics.interviews.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Success Rate</span>
                      <span className="font-medium">{projectData.metrics.interviews.successRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Outreach */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <span>Outreach</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Messages Sent</span>
                      <span className="font-medium">{projectData.metrics.outreach.sent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Responses</span>
                      <span className="font-medium text-blue-400">{projectData.metrics.outreach.responded}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Conversions</span>
                      <span className="font-medium text-green-400">{projectData.metrics.outreach.converted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Response Rate</span>
                      <span className="font-medium">{projectData.metrics.outreach.responseRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span>Revenue</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Current</span>
                      <span className="font-medium text-green-400">${projectData.metrics.revenue.current}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Target</span>
                      <span className="font-medium">${projectData.metrics.revenue.target}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Growth</span>
                      <span className="font-medium text-green-400">+{projectData.metrics.revenue.growth}%</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Progress to Target</span>
                        <span>{Math.round((projectData.metrics.revenue.current / projectData.metrics.revenue.target) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(projectData.metrics.revenue.current / projectData.metrics.revenue.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical */}
                <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span>Technical</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Performance</span>
                      <span className="font-medium text-green-400">{projectData.metrics.technical.performance}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Security</span>
                      <span className="font-medium text-yellow-400">{projectData.metrics.technical.security}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Uptime</span>
                      <span className="font-medium text-green-400">{projectData.metrics.technical.uptime}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Issues</span>
                      <span className="font-medium text-red-400">{projectData.metrics.technical.issues}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">Timeline View</h4>
                  <p className="text-gray-400">Interactive timeline coming soon</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinearProjectDashboard;
