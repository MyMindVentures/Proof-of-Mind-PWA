import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Database,
  Monitor,
  Wrench,
  Shield,
  Zap,
  Globe,
  Activity,
  Server,
  Network,
  BarChart3,
  Settings,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

const EcosystemDashboardPage = () => {
  const [ecosystemStatus, setEcosystemStatus] = useState({
    projects: [],
    health: 'loading',
    lastUpdate: null,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Ecosystem projects configuration
  const ecosystemProjects = [
    {
      id: 'hybrid-knowledge-base',
      name: 'Hybrid Knowledge Base',
      description:
        'Central Hub - Multi-database architecture with 6 database types',
      icon: Database,
      port: 3003,
      wsPort: 8081,
      status: 'operational',
      color: 'bg-blue-600',
      features: [
        'SQLite',
        'MongoDB',
        'PostgreSQL',
        'Vector DB',
        'Graph DB',
        'Binary Storage',
      ],
      repository: 'https://github.com/MyMindVentures/Hybrid-Knowledge-Base',
      healthEndpoint: '/health',
    },
    {
      id: 'ai-devenv-autoconfigurator',
      name: 'AI DevEnv AutoConfigurator',
      description: 'AI-powered development environment automation',
      icon: Wrench,
      port: 3000,
      status: 'operational',
      color: 'bg-green-600',
      features: [
        'Auto Configuration',
        'Knowledge Hub Integration',
        'Dev Environment Setup',
      ],
      repository:
        'https://github.com/MyMindVentures/AI-DevEnv-AutoConfigurator',
      healthEndpoint: '/health',
    },
    {
      id: 'mcp-troubleshooting-server',
      name: 'MCP Troubleshooting Server',
      description: 'MCP Gateway for AI Troubleshooting and error prevention',
      icon: Shield,
      port: 3001,
      status: 'operational',
      color: 'bg-purple-600',
      features: ['Error Prevention', 'AI Troubleshooting', 'Knowledge Base'],
      repository:
        'https://github.com/MyMindVentures/MCP-Troubleshooting-Server',
      healthEndpoint: '/health',
    },
    {
      id: 'northflank-monitor',
      name: 'NorthFlank Monitor',
      description: 'Real-time NorthFlank monitoring and analytics',
      icon: Monitor,
      port: 3002,
      wsPort: 8080,
      status: 'operational',
      color: 'bg-orange-600',
      features: [
        'Real-time Monitoring',
        'Analytics',
        'WebSocket Communication',
      ],
      repository: 'https://github.com/MyMindVentures/NorthFlank-Monitor',
      healthEndpoint: '/health',
    },
    {
      id: 'ai-builder-orchestrator',
      name: 'AI Builder Orchestrator',
      description: 'AI task orchestration and project management',
      icon: Brain,
      port: 3004,
      status: 'operational',
      color: 'bg-indigo-600',
      features: ['Task Orchestration', 'AI Management', 'Project Coordination'],
      repository: 'https://github.com/MyMindVentures/AI-Builder-Orchestrator',
      healthEndpoint: '/health',
    },
    {
      id: 'secretvault',
      name: 'SecretVault',
      description: 'Intelligent secrets management and security',
      icon: Shield,
      port: 3005,
      status: 'operational',
      color: 'bg-red-600',
      features: ['Secrets Management', 'Security', 'Encryption'],
      repository: 'https://github.com/MyMindVentures/SecretVault',
      healthEndpoint: '/health',
    },
    {
      id: 'proof-of-mind-pwa',
      name: 'Proof of Mind PWA',
      description: 'Neurodiversity advocacy platform - Main Frontend',
      icon: Globe,
      port: 3006,
      status: 'operational',
      color: 'bg-emerald-600',
      features: [
        'PWA Frontend',
        'Neurodiversity Advocacy',
        'AI Interviews',
        'User Interface',
      ],
      repository:
        'https://github.com/MyMindVentures/Proof-of-Mind-From-Chaos-to-Clarity',
      healthEndpoint: '/health',
    },
  ];

  useEffect(() => {
    // Simulate fetching ecosystem status
    const fetchEcosystemStatus = async () => {
      try {
        // In a real implementation, this would fetch from the Hybrid Knowledge Base
        const mockStatus = {
          projects: ecosystemProjects.map(project => ({
            ...project,
            status: Math.random() > 0.1 ? 'operational' : 'warning',
            lastHealthCheck: new Date().toISOString(),
            uptime: Math.floor(Math.random() * 100),
            responseTime: Math.floor(Math.random() * 200) + 50,
          })),
          health: 'healthy',
          lastUpdate: new Date().toISOString(),
        };

        setEcosystemStatus(mockStatus);
      } catch (error) {
        console.error('Failed to fetch ecosystem status:', error);
        setEcosystemStatus(prev => ({
          ...prev,
          health: 'error',
        }));
      }
    };

    fetchEcosystemStatus();
    const interval = setInterval(fetchEcosystemStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = status => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'operational':
        return 'border-green-500 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'error':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Network className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold">Proof of Mind Ecosystem</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Central dashboard for all 7 ecosystem components with real-time
            monitoring
          </p>
        </motion.div>

        {/* Ecosystem Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Total Projects</h3>
            </div>
            <p className="text-3xl font-bold text-blue-500">7</p>
            <p className="text-sm text-gray-400">Ecosystem Components</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold">Operational</h3>
            </div>
            <p className="text-3xl font-bold text-green-500">
              {
                ecosystemStatus.projects.filter(p => p.status === 'operational')
                  .length
              }
            </p>
            <p className="text-sm text-gray-400">Services Running</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold">Avg Response</h3>
            </div>
            <p className="text-3xl font-bold text-purple-500">
              {ecosystemStatus.projects.length > 0
                ? Math.round(
                    ecosystemStatus.projects.reduce(
                      (acc, p) => acc + (p.responseTime || 0),
                      0
                    ) / ecosystemStatus.projects.length
                  )
                : 0}
              ms
            </p>
            <p className="text-sm text-gray-400">Response Time</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold">Ecosystem Health</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-500 capitalize">
              {ecosystemStatus.health}
            </p>
            <p className="text-sm text-gray-400">Overall Status</p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ecosystemProjects.map((project, index) => {
            const IconComponent = project.icon;
            const projectStatus =
              ecosystemStatus.projects.find(p => p.id === project.id) ||
              project;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-dark-800 rounded-lg p-6 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${getStatusColor(projectStatus.status)}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${project.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-400">
                        Port {project.port}
                      </p>
                    </div>
                  </div>
                  {getStatusIcon(projectStatus.status)}
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                      onClick={e => e.stopPropagation()}
                    >
                      View Repository
                    </a>
                  </div>
                  <div className="text-xs text-gray-400">
                    {projectStatus.uptime}% uptime
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Project Details Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedProject.color}`}>
                    <selectedProject.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedProject.name}
                    </h2>
                    <p className="text-gray-400">Port {selectedProject.port}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-1">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-400">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Endpoints</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div>HTTP: {selectedProject.port}</div>
                    {selectedProject.wsPort && (
                      <div>WebSocket: {selectedProject.wsPort}</div>
                    )}
                    <div>Health: {selectedProject.healthEndpoint}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Repository
                </a>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Last Update */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          Last updated:{' '}
          {ecosystemStatus.lastUpdate
            ? new Date(ecosystemStatus.lastUpdate).toLocaleString()
            : 'Never'}
        </motion.div>
      </div>
    </div>
  );
};

export default EcosystemDashboardPage;

