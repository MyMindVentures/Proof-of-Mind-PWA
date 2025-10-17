import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Hash,
  Lock,
  Shield,
  Upload,
} from 'lucide-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import proofService from '../services/proofService';
import { useAppStore } from '../store/appStore';

const ProofLayerPage = () => {
  const { t } = useTranslation();
  const { proofItems, addProofItem } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const layers = [
    {
      id: 'integrity',
      title: t('proof.layers.integrity.title'),
      description: t('proof.layers.integrity.description'),
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      features: ['SHA-256 Hash', 'Timestamp', 'Metadata', 'Notarized Copy'],
    },
    {
      id: 'context',
      title: t('proof.layers.context.title'),
      description: t('proof.layers.context.description'),
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      features: [
        'AI Transcripts',
        'Intent Manifest',
        'Conversation Records',
        'Authenticity Proof',
      ],
    },
    {
      id: 'safety',
      title: t('proof.layers.safety.title'),
      description: t('proof.layers.safety.description'),
      icon: Lock,
      color: 'from-green-500 to-emerald-500',
      features: [
        'Timeline',
        'Expert Statements',
        'Legal Summaries',
        'Privacy Controls',
      ],
    },
  ];

  const handleFileUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setSelectedFile(file);

    try {
      const content = await file.text();
      const result = await proofService.generateIntegrityProof(content, {
        filename: file.name,
        type: file.type,
        size: file.size,
      });

      if (result.success) {
        addProofItem({
          type: 'file',
          name: file.name,
          proof: result.proof,
          downloadable: result.downloadable,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t('proof.title')} - {t('app.title')}
        </title>
        <meta name="description" content={t('proof.subtitle')} />
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
                <Shield className="w-8 h-8 text-dark-900" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('proof.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-dark-400 mb-8"
            >
              {t('proof.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Three Layers Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Three-Layer Security System
              </h2>
              <p className="text-xl text-dark-400">
                Comprehensive protection for your content, context, and safety
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="card hover:bg-dark-700 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${layer.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {layer.title}
                    </h3>
                    <p className="text-dark-400 mb-6">{layer.description}</p>
                    <div className="space-y-2">
                      {layer.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                          <span className="text-sm text-dark-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Upload & Verify Evidence
              </h2>
              <p className="text-xl text-dark-400">
                Secure your content with cryptographic proof and verification
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary-400" />
                </div>

                <div className="mb-6">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".txt,.md,.json,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="btn-primary cursor-pointer inline-flex items-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{t('proof.upload')}</span>
                  </label>
                </div>

                {uploading && (
                  <div className="flex items-center justify-center space-x-2 text-primary-400">
                    <div className="spinner"></div>
                    <span>Processing...</span>
                  </div>
                )}

                {selectedFile && !uploading && (
                  <div className="mt-4 p-4 bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-400 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        File processed successfully
                      </span>
                    </div>
                    <p className="text-sm text-dark-400">
                      {selectedFile.name} has been secured with cryptographic
                      proof
                    </p>
                  </div>
                )}

                <p className="text-sm text-dark-500 mt-4">
                  Supported formats: TXT, MD, JSON, PDF, DOC, DOCX
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proof Items */}
        {proofItems.length > 0 && (
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Your Proof Items
                </h2>
                <p className="text-xl text-dark-400">
                  All your uploaded content with cryptographic verification
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proofItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-400/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-dark-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Verified</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Hash className="w-4 h-4 text-dark-400" />
                        <span className="text-dark-400">Hash:</span>
                        <code className="text-primary-400 text-xs bg-dark-700 px-2 py-1 rounded">
                          {item.proof.contentHash.slice(0, 16)}...
                        </code>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-dark-400" />
                        <span className="text-dark-400">Timestamp:</span>
                        <span className="text-white text-xs">
                          {new Date(item.proof.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => item.downloadable.download()}
                        className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button className="btn-primary text-sm py-2 px-3 flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Verification Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Verify Any Proof
              </h2>
              <p className="text-xl text-dark-400 mb-8">
                Use our verification system to confirm the authenticity of any
                proof item
              </p>
              <button className="btn-primary text-lg px-8 py-4">
                {t('proof.verify')}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProofLayerPage;
