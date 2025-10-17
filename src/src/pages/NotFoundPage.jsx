import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Home } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Page Not Found - {t('app.title')}</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            {/* 404 Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full flex items-center justify-center">
                  <Brain className="w-12 h-12 text-dark-900" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-dark-400 mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on
              track with your Proof of Mind journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="btn-primary flex items-center justify-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-dark-700">
              <p className="text-sm text-dark-400 mb-4">Quick links to get you started:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/story" className="text-primary-400 hover:text-primary-300 text-sm">
                  Story
                </Link>
                <span className="text-dark-600">•</span>
                <Link to="/proof" className="text-primary-400 hover:text-primary-300 text-sm">
                  Proof Layer
                </Link>
                <span className="text-dark-600">•</span>
                <Link to="/interviewer" className="text-primary-400 hover:text-primary-300 text-sm">
                  AI Interviewer
                </Link>
                <span className="text-dark-600">•</span>
                <Link to="/donors" className="text-primary-400 hover:text-primary-300 text-sm">
                  Donors
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;


