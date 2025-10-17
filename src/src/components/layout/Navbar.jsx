import { motion } from 'framer-motion';
import {
  BarChart3,
  Brain,
  Globe,
  Heart,
  Menu,
  Shield,
  Users,
  X,
  Zap,
  MessageCircle,
  Target,
  Key,
  Network,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { language, setLanguage, sidebarOpen, setSidebarOpen } = useAppStore();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: Brain },
    { name: t('navigation.story'), href: '/story', icon: Brain },
    { name: t('navigation.proof'), href: '/proof', icon: Shield },
    { name: t('navigation.interviewer'), href: '/interviewer', icon: Users },
    { name: t('navigation.donors'), href: '/donors', icon: Heart },
    { name: t('navigation.outreach'), href: '/outreach', icon: BarChart3 },
    { name: 'Ecosystem', href: '/ecosystem', icon: Network },
    { name: 'Founder Chat', href: '/founder-chat', icon: MessageCircle },
    { name: 'Project Status', href: '/project-status', icon: Target },
    { name: 'Agentic AI', href: '/agentic-ai', icon: Zap },
    { name: 'Secrets', href: '/secrets', icon: Key },
    { name: 'Production Ready', href: '/production-readiness', icon: Shield },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
  ];

  const changeLanguage = langCode => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <nav className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-300 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-dark-900" />
            </div>
            <span className="text-xl font-bold text-gradient">
              Proof of Mind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-400/20 text-primary-400'
                      : 'text-dark-300 hover:text-primary-400 hover:bg-primary-400/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-primary-400/10 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium uppercase">
                  {language}
                </span>
              </button>

              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-2 z-50"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        language === lang.code
                          ? 'bg-primary-400/20 text-primary-400'
                          : 'text-dark-300 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-primary-400/10 transition-all duration-200"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-800 border-t border-dark-700"
        >
          <div className="px-4 py-2 space-y-1">
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-400/20 text-primary-400'
                      : 'text-dark-300 hover:text-primary-400 hover:bg-primary-400/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
