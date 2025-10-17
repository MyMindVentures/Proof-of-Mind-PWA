import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import aiInterviewerService from '../../services/aiInterviewerService';

const AIAgentDashboard = () => {
  const [agentStatus, setAgentStatus] = useState(null);
  const [pendingInsights, setPendingInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Initialize AI system
        const initResult = await aiInterviewerService.initialize();
        console.log('AI System Initialized:', initResult);

        // Get agent status
        const status = aiInterviewerService.getAgentStatus();
        setAgentStatus(status);

        // Get pending insights
        const insights = aiInterviewerService.getPendingInsights();
        setPendingInsights(insights);

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing AI dashboard:', error);
        setIsLoading(false);
      }
    };

    initializeDashboard();

    // Update dashboard every 30 seconds
    const interval = setInterval(() => {
      const status = aiInterviewerService.getAgentStatus();
      const insights = aiInterviewerService.getPendingInsights();
      setAgentStatus(status);
      setPendingInsights(insights);
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getAgentIcon = agentId => {
    const icons = {
      BusinessIntelligenceAgent: <TrendingUp className="w-5 h-5" />,
      MediaOutreachAgent: <Target className="w-5 h-5" />,
      CommunityGrowthAgent: <Users className="w-5 h-5" />,
      ResearchValidationAgent: <BarChart3 className="w-5 h-5" />,
      RevenueGenerationAgent: <DollarSign className="w-5 h-5" />,
      SupportAdvocacyAgent: <Heart className="w-5 h-5" />,
      GrowthScalingAgent: <Rocket className="w-5 h-5" />,
      IntelligenceAnalysisAgent: <Brain className="w-5 h-5" />,
    };
    return icons[agentId] || <Brain className="w-5 h-5" />;
  };

  const getAgentColor = agentId => {
    const colors = {
      BusinessIntelligenceAgent: 'bg-blue-500',
      MediaOutreachAgent: 'bg-purple-500',
      CommunityGrowthAgent: 'bg-green-500',
      ResearchValidationAgent: 'bg-indigo-500',
      RevenueGenerationAgent: 'bg-yellow-500',
      SupportAdvocacyAgent: 'bg-pink-500',
      GrowthScalingAgent: 'bg-orange-500',
      IntelligenceAnalysisAgent: 'bg-cyan-500',
    };
    return colors[agentId] || 'bg-gray-500';
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Initializing AI Agents
          </h2>
          <p className="text-blue-200">Setting up intelligent systems...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            🤖 Augmentic AI Agents Dashboard
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Your intelligent AI system is alive and actively working for you
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>{agentStatus?.activeAgents || 0} agents active</span>
            </div>
          </div>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Total Agents</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {agentStatus?.totalAgents || 0}
            </p>
            <p className="text-sm text-blue-200">AI agents deployed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">
                Active Agents
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {agentStatus?.activeAgents || 0}
            </p>
            <p className="text-sm text-blue-200">Currently working</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Lightbulb className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Insights</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {pendingInsights?.insights?.length || 0}
            </p>
            <p className="text-sm text-blue-200">Pending insights</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Opportunities
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {pendingInsights?.opportunities?.length || 0}
            </p>
            <p className="text-sm text-blue-200">Active opportunities</p>
          </div>
        </motion.div>

        {/* AI Agents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <AnimatePresence>
            {agentStatus?.agents &&
              Object.entries(agentStatus.agents).map(
                ([agentId, agent], index) => (
                  <motion.div
                    key={agentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`p-2 rounded-lg ${getAgentColor(agentId)}`}
                      >
                        {getAgentIcon(agentId)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {agent.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}
                          />
                          <span className="text-sm text-blue-200 capitalize">
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Priority:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(agent.priority)}`}
                        >
                          {agent.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Revenue:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${agent.revenueGeneration ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}
                        >
                          {agent.revenueGeneration ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-blue-300 font-medium">
                        Capabilities:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities
                          ?.slice(0, 2)
                          .map((capability, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded"
                            >
                              {capability}
                            </span>
                          ))}
                        {agent.capabilities?.length > 2 && (
                          <span className="text-xs text-blue-300">
                            +{agent.capabilities.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center space-x-2 text-xs text-blue-300">
                        <Clock className="w-3 h-3" />
                        <span>
                          Active since{' '}
                          {new Date(agent.lastActivity).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
          </AnimatePresence>
        </motion.div>

        {/* Project Knowledge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            <span>Project Knowledge Base</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Purpose</h3>
              <p className="text-blue-200 text-sm">
                {agentStatus?.projectKnowledge?.purpose}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Your Situation
              </h3>
              <p className="text-blue-200 text-sm">
                {agentStatus?.projectKnowledge?.userSituation}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Revenue Streams
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {agentStatus?.projectKnowledge?.revenueStreams?.map(
                (stream, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-500/20 text-green-200 px-3 py-2 rounded-lg"
                  >
                    {stream}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-6 h-6 text-green-400" />
            <span>Live AI Activity</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">
                  AI System Fully Initialized
                </p>
                <p className="text-sm text-green-200">
                  All {agentStatus?.totalAgents || 0} agents are active and
                  monitoring for opportunities
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Brain className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">
                  Intelligent Monitoring Active
                </p>
                <p className="text-sm text-blue-200">
                  Scanning for revenue, support, and growth opportunities every
                  5 minutes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Lightbulb className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">
                  Proactive Insights Generation
                </p>
                <p className="text-sm text-purple-200">
                  Generating strategic insights and recommendations every hour
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">
                  Revenue Generation Active
                </p>
                <p className="text-sm text-yellow-200">
                  Multiple revenue streams identified and being actively pursued
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAgentDashboard;


