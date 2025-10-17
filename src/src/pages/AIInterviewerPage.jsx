import { motion } from 'framer-motion';
import {
  Brain,
  FileText,
  MessageSquare,
  Mic,
  Square,
  Target,
  Users,
  Video,
} from 'lucide-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import aiInterviewerService from '../services/aiInterviewerService';
import { useAppStore } from '../store/appStore';

const AIInterviewerPage = () => {
  const { t } = useTranslation();
  const {
    currentInterview,
    startInterview,
    endInterview,
    addQuestion,
    addAnswer,
  } = useAppStore();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const profiles = [
    {
      id: 'investor',
      name: t('interviewer.profiles.investor'),
      description:
        'Professional investor-focused questions about the project and its potential',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'press',
      name: t('interviewer.profiles.press'),
      description: 'Media-focused questions about the story and impact',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'community',
      name: t('interviewer.profiles.community'),
      description:
        'Community-focused questions about shared experiences and support',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'expert',
      name: t('interviewer.profiles.expert'),
      description:
        'Expert-level questions about neurodiversity and evidence-based approaches',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleStartInterview = async profileId => {
    const result = await aiInterviewerService.startInterview(profileId);
    if (result.success) {
      startInterview(profileId);
      setCurrentQuestion(result.firstQuestion);
    }
  };

  const handleEndInterview = async () => {
    const result = await aiInterviewerService.endInterview();
    if (result.success) {
      endInterview();
      setCurrentQuestion(null);
      setCurrentAnswer('');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return;

    const result = await aiInterviewerService.submitAnswer(
      currentQuestion,
      currentAnswer
    );

    if (result.success) {
      addAnswer({
        question: currentQuestion,
        answer: currentAnswer,
        timestamp: new Date().toISOString(),
      });

      setCurrentQuestion(result.nextQuestion);
      setCurrentAnswer('');
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t('interviewer.title')} - {t('app.title')}
        </title>
        <meta name="description" content={t('interviewer.subtitle')} />
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
                <Users className="w-8 h-8 text-dark-900" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('interviewer.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-dark-400 mb-8"
            >
              {t('interviewer.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Interview Profiles */}
        {!currentInterview && (
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Choose Interview Profile
                </h2>
                <p className="text-xl text-dark-400">
                  Select the type of interview that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profiles.map((profile, index) => {
                  const Icon = profile.icon;
                  return (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="card hover:bg-dark-700 transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedProfile(profile.id)}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${profile.color} rounded-lg flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {profile.name}
                      </h3>
                      <p className="text-dark-400 mb-6">
                        {profile.description}
                      </p>
                      <button
                        onClick={() => handleStartInterview(profile.id)}
                        className="btn-primary w-full group-hover:scale-105 transition-transform duration-200"
                      >
                        {t('interviewer.start_interview')}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Active Interview */}
        {currentInterview && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card"
              >
                {/* Interview Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Active Interview
                    </h2>
                    <p className="text-dark-400">
                      Profile:{' '}
                      {
                        profiles.find(p => p.id === currentInterview.profile)
                          ?.name
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleEndInterview}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Square className="w-4 h-4" />
                    <span>End Interview</span>
                  </button>
                </div>

                {/* Current Question */}
                {currentQuestion && (
                  <div className="mb-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-10 h-10 bg-primary-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Question {currentInterview.answers.length + 1}
                        </h3>
                        <p className="text-dark-300 text-lg">
                          {currentQuestion}
                        </p>
                      </div>
                    </div>

                    {/* Answer Input */}
                    <div className="space-y-4">
                      <textarea
                        value={currentAnswer}
                        onChange={e => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="input-field w-full h-32 resize-none"
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                              isRecording
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                            }`}
                          >
                            <Mic className="w-4 h-4" />
                            <span>
                              {isRecording ? 'Stop Recording' : 'Record Audio'}
                            </span>
                          </button>

                          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-dark-300 hover:bg-dark-600 rounded-lg transition-all duration-200">
                            <Video className="w-4 h-4" />
                            <span>Record Video</span>
                          </button>
                        </div>

                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!currentAnswer.trim()}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interview Progress */}
                <div className="border-t border-dark-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Interview Progress
                    </h3>
                    <span className="text-sm text-dark-400">
                      {currentInterview.answers.length} answers completed
                    </span>
                  </div>

                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-400 to-primary-300 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(currentInterview.answers.length / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                AI-Powered Interview Features
              </h2>
              <p className="text-xl text-dark-400">
                Advanced technology for meaningful conversations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'Intelligent Questions',
                  description:
                    'AI generates contextual follow-up questions based on your responses',
                },
                {
                  icon: Video,
                  title: 'Video Recording',
                  description:
                    'High-quality video capture with Canon EOS 250D integration',
                },
                {
                  icon: FileText,
                  title: 'Auto Transcription',
                  description:
                    'Automatic speech-to-text conversion and story generation',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="card text-center"
                  >
                    <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-dark-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AIInterviewerPage;
