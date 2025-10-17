import { motion } from 'framer-motion';
import { BarChart3, Download, Eye, FileText, Globe, Share2, Target, Users } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const OutreachDashboardPage = () => {
  const { t } = useTranslation();

  const metrics = [
    { label: 'Total Views', value: '12,450', change: '+15%', icon: Eye, color: 'text-blue-400' },
    { label: 'Expert Contacts', value: '23', change: '+8%', icon: Users, color: 'text-green-400' },
    { label: 'Media Mentions', value: '7', change: '+3%', icon: Share2, color: 'text-purple-400' },
    {
      label: 'Community Members',
      value: '156',
      change: '+22%',
      icon: Globe,
      color: 'text-orange-400',
    },
  ];

  const expertNetwork = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Neurodiversity Researcher',
      organization: 'MIT',
      status: 'Contacted',
      response: 'Positive',
    },
    {
      name: 'Prof. Michael Torres',
      title: 'ADHD Specialist',
      organization: 'Stanford',
      status: 'Responded',
      response: 'Interested',
    },
    {
      name: 'Dr. Lisa Park',
      title: 'Cognitive Scientist',
      organization: 'Harvard',
      status: 'Pending',
      response: 'Awaiting',
    },
    {
      name: 'Prof. James Wilson',
      title: 'AI Ethics Researcher',
      organization: 'Oxford',
      status: 'Contacted',
      response: 'Neutral',
    },
  ];

  const mediaKit = [
    { name: 'Project Overview', type: 'PDF', size: '2.3 MB', downloads: 45 },
    { name: 'High-Res Images', type: 'ZIP', size: '15.7 MB', downloads: 23 },
    { name: 'Press Release', type: 'DOCX', size: '1.1 MB', downloads: 67 },
    { name: 'Video Assets', type: 'MP4', size: '89.2 MB', downloads: 12 },
  ];

  const outreachActivities = [
    {
      date: '2025-10-15',
      activity: 'Sent project overview to 5 neurodiversity researchers',
      type: 'Expert Outreach',
      status: 'Completed',
    },
    {
      date: '2025-10-14',
      activity: 'Published story chapter on community platform',
      type: 'Content',
      status: 'Published',
    },
    {
      date: '2025-10-13',
      activity: 'Responded to media inquiry from TechCrunch',
      type: 'Media',
      status: 'In Progress',
    },
    {
      date: '2025-10-12',
      activity: 'Shared AI interviewer demo with expert network',
      type: 'Demo',
      status: 'Completed',
    },
    {
      date: '2025-10-11',
      activity: 'Updated donor wall with new supporters',
      type: 'Community',
      status: 'Completed',
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('outreach.title')} - {t('app.title')}
        </title>
        <meta name="description" content={t('outreach.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-dark-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-300 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-dark-900" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('outreach.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-dark-400 mb-8"
            >
              {t('outreach.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Metrics Overview */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Outreach Metrics</h2>
              <p className="text-xl text-dark-400">
                Track the impact and reach of the Proof of Mind project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-dark-400 mb-2">{metric.label}</div>
                    <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Expert Network */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('outreach.experts')}
              </h2>
              <p className="text-xl text-dark-400">
                Building connections with neurodiversity and AI experts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertNetwork.map((expert, index) => (
                <motion.div
                  key={expert.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{expert.name}</h3>
                      <p className="text-primary-400 font-medium mb-1">{expert.title}</p>
                      <p className="text-sm text-dark-400">{expert.organization}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          expert.status === 'Responded'
                            ? 'bg-green-500/20 text-green-400'
                            : expert.status === 'Contacted'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {expert.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Response: {expert.response}</span>
                    <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('outreach.media')}
              </h2>
              <p className="text-xl text-dark-400">
                Downloadable resources for media and community outreach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-400/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-dark-400">
                          {item.type} • {item.size}
                        </p>
                      </div>
                    </div>
                    <button className="btn-secondary flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-dark-400">
                    <span>{item.downloads} downloads</span>
                    <span>Last updated: 2 days ago</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Activities</h2>
              <p className="text-xl text-dark-400">
                Track all outreach and community engagement activities
              </p>
            </div>

            <div className="space-y-4">
              {outreachActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-400/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{activity.activity}</h3>
                        <div className="flex items-center space-x-4 text-sm text-dark-400">
                          <span>{activity.date}</span>
                          <span>•</span>
                          <span>{activity.type}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : activity.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Export Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-primary-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('outreach.export')}
              </h2>
              <p className="text-xl text-dark-400 mb-8">
                Download comprehensive reports and data for your outreach efforts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">Export All Data</button>
                <button className="btn-secondary text-lg px-8 py-4">Generate Report</button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OutreachDashboardPage;


