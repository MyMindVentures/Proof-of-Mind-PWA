import { AnimatePresence } from 'framer-motion';
import React, { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

// Components
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages
import AIInterviewerPage from './pages/AIInterviewerPage';
import DonorWallPage from './pages/DonorWallPage';
import EcosystemDashboardPage from './pages/EcosystemDashboardPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OutreachDashboardPage from './pages/OutreachDashboardPage';
import ProofLayerPage from './pages/ProofLayerPage';
import StoryPage from './pages/StoryPage';

// AI Components
import AIAgentDashboard from './components/ai/AIAgentDashboard';
import AgenticAIDashboard from './components/ai/AgenticAIDashboard';
import FounderChatbotDashboard from './components/ai/FounderChatbotDashboard';
import LinearProjectDashboard from './components/ai/LinearProjectDashboard';

// Secrets Management
import IntelligentSecretsDashboard from './components/secrets/IntelligentSecretsDashboard';

// Production Readiness
import ProductionReadinessDashboard from './components/production/ProductionReadinessDashboard';

// Store
import { useAppStore } from './store/appStore';

// Services
import authService from './services/authService';
import monitoringService from './services/monitoringService';

function App() {
  const { t } = useTranslation();
  const { theme, language } = useAppStore();

  // Initialize services on app start
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Initialize monitoring service
        const monitoringResult = await monitoringService.initialize();
        if (monitoringResult.success) {
          console.log('✅ Monitoring service initialized');
        }

        // Initialize auth service
        const authResult = await authService.initialize();
        if (authResult.success) {
          console.log('✅ Auth service initialized');

          // Set user context for monitoring if authenticated
          if (authResult.isAuthenticated && authResult.user) {
            monitoringService.setUserContext(authResult.user);
          }
        }

        // Track app initialization
        monitoringService.trackUserInteraction('app_initialized', '/', {
          theme,
          language,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('❌ Failed to initialize services:', error);
        monitoringService.captureException(error, {
          component: 'App',
          action: 'initialize_services',
        });
      }
    };

    initializeServices();
  }, [theme, language]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900 text-white">
        <Helmet>
          <title>{t('app.title')}</title>
          <meta name="description" content={t('app.description')} />
          <html lang={language} />
        </Helmet>

        <Navbar />

        <main className="relative">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/proof" element={<ProofLayerPage />} />
                <Route path="/interviewer" element={<AIInterviewerPage />} />
                <Route path="/donors" element={<DonorWallPage />} />
                <Route path="/outreach" element={<OutreachDashboardPage />} />
                <Route path="/ecosystem" element={<EcosystemDashboardPage />} />
                <Route path="/ai-agents" element={<AIAgentDashboard />} />
                <Route path="/agentic-ai" element={<AgenticAIDashboard />} />
                <Route
                  path="/founder-chat"
                  element={<FounderChatbotDashboard />}
                />
                <Route
                  path="/project-status"
                  element={<LinearProjectDashboard />}
                />
                <Route
                  path="/secrets"
                  element={<IntelligentSecretsDashboard />}
                />
                <Route
                  path="/production-readiness"
                  element={<ProductionReadinessDashboard />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
