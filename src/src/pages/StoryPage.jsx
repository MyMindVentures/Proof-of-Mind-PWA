import { motion } from 'framer-motion';
import { BookOpen, Brain, Heart, Shield, Users } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const StoryPage = () => {
  const { t } = useTranslation();

  const chapters = [
    {
      id: 'discovery',
      title: t('story.chapters.discovery.title'),
      content: t('story.chapters.discovery.content'),
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'transformation',
      title: t('story.chapters.transformation.title'),
      content: t('story.chapters.transformation.content'),
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'proof',
      title: t('story.chapters.proof.title'),
      content: t('story.chapters.proof.content'),
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('story.title')} - {t('app.title')}
        </title>
        <meta name="description" content={t('story.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-dark-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('story.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-dark-400 mb-8"
            >
              {t('story.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Chapters */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {chapters.map((chapter, index) => {
                const Icon = chapter.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:grid-flow-col-dense'
                    }`}
                  >
                    {/* Content */}
                    <div className={isEven ? '' : 'lg:col-start-2'}>
                      <div className="flex items-center space-x-3 mb-6">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${chapter.color} rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {chapter.title}
                        </h2>
                      </div>
                      <p className="text-lg text-dark-400 leading-relaxed">{chapter.content}</p>
                    </div>

                    {/* Visual */}
                    <div className={isEven ? '' : 'lg:col-start-1'}>
                      <div
                        className={`aspect-video bg-gradient-to-br ${chapter.color} rounded-2xl p-8 flex items-center justify-center`}
                      >
                        <div className="text-center text-white">
                          <Icon className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <h3 className="text-xl font-semibold mb-2">Chapter {index + 1}</h3>
                          <p className="opacity-80">Interactive content coming soon</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Evidence Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Evidence-Based Documentation
              </h2>
              <p className="text-xl text-dark-400">
                Every aspect of this journey is documented with proof and verification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Integrity Layer',
                  description: 'SHA-256 hashing and timestamp verification for all content',
                },
                {
                  icon: Users,
                  title: 'Context Proof',
                  description: 'AI interviewer transcripts and authentic conversation records',
                },
                {
                  icon: Heart,
                  title: 'Community Support',
                  description: 'Transparent donor wall and community engagement tracking',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="card text-center"
                  >
                    <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-dark-400">{item.description}</p>
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

export default StoryPage;


