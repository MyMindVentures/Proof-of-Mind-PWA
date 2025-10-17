import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Heart,
  Shield,
  Star,
  Users,
  Zap,
  Network,
} from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Network,
      title: 'Ecosystem Dashboard',
      description:
        'Central hub for all 7 ecosystem components with real-time monitoring',
      href: '/ecosystem',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Proof Layer',
      description:
        'Three-layer security system with SHA-256 hashing, timestamps, and notarization',
      href: '/proof',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'AI Interviewer',
      description:
        'Intelligent conversation partner with multiple profiles for different contexts',
      href: '/interviewer',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Donor Wall',
      description:
        'Support the journey and see the community backing this transformative project',
      href: '/donors',
      color: 'from-red-500 to-orange-500',
    },
  ];

  const badges = [
    { name: t('hero.badges.poe'), icon: Shield },
    { name: t('hero.badges.expert'), icon: Star },
    { name: t('hero.badges.nft'), icon: Zap },
  ];

  return (
    <>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 hero-pattern opacity-20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-400/10 border border-primary-400/20 rounded-full text-primary-400 text-sm font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{badge.name}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-gradient">{t('hero.title')}</span>
                <br />
                <span className="text-white">{t('hero.subtitle')}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-dark-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                {t('hero.description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  to="/story"
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <span>{t('hero.cta_primary')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/proof"
                  className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>{t('hero.cta_secondary')}</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-20 h-20 bg-primary-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-primary-300/10 rounded-full blur-xl"
          />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Core Features
              </h2>
              <p className="text-xl text-dark-400 max-w-3xl mx-auto">
                Built with three layers of security, AI-powered interviews, and
                community support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group"
                  >
                    <Link to={feature.href} className="block">
                      <div className="card hover:bg-dark-700 transition-all duration-300 group-hover:scale-105">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-dark-400 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center text-primary-400 font-medium group-hover:translate-x-2 transition-transform duration-200">
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Preview Section */}
        <section className="py-20 bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  The Journey from Chaos to Clarity
                </h2>
                <p className="text-lg text-dark-400 mb-6">
                  A neurodiverse individual's transformation through science,
                  AI, and self-discovery. This is more than a story—it's proof
                  that being different can become your greatest strength.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Evidence-based documentation',
                    'AI-powered interview system',
                    'Community support network',
                    'Transparent transformation process',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-dark-300">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/story" className="btn-primary">
                  Read the Full Story
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-400/20 to-primary-300/20 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Interactive Story
                    </h3>
                    <p className="text-dark-400">
                      Explore the journey through interactive chapters and
                      evidence
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-400/10 to-primary-300/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Explore the Proof of Mind?
              </h2>
              <p className="text-xl text-dark-400 mb-8">
                Join the journey of transformation and discover how
                neurodiversity becomes a superpower
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/interviewer"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start AI Interview
                </Link>
                <Link to="/donors" className="btn-secondary text-lg px-8 py-4">
                  Support the Project
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
