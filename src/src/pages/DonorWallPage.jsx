import { motion } from 'framer-motion';
import {
  CheckCircle,
  CreditCard,
  Heart,
  Shield,
  Star,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';

const DonorWallPage = () => {
  const { t } = useTranslation();
  const { donations, addDonation } = useAppStore();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const donationAmounts = [
    { amount: 10, label: t('donors.amounts.small'), popular: false },
    { amount: 50, label: t('donors.amounts.medium'), popular: true },
    { amount: 100, label: t('donors.amounts.large'), popular: false },
    { amount: 'custom', label: t('donors.amounts.custom'), popular: false },
  ];

  const donorTiers = [
    {
      name: 'Supporter',
      minAmount: 10,
      maxAmount: 49,
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Thank you message', 'Basic donor badge'],
    },
    {
      name: 'Champion',
      minAmount: 50,
      maxAmount: 99,
      color: 'from-purple-500 to-pink-500',
      benefits: ['Thank you message', 'Champion badge', 'Monthly updates'],
    },
    {
      name: 'Hero',
      minAmount: 100,
      maxAmount: 499,
      color: 'from-orange-500 to-red-500',
      benefits: [
        'Thank you message',
        'Hero badge',
        'Monthly updates',
        'Early access',
      ],
    },
    {
      name: 'Legend',
      minAmount: 500,
      maxAmount: Infinity,
      color: 'from-yellow-500 to-orange-500',
      benefits: [
        'Thank you message',
        'Legend badge',
        'Monthly updates',
        'Early access',
        'Direct communication',
      ],
    },
  ];

  const recentDonors = [
    {
      name: 'Anonymous',
      amount: 100,
      message: 'Keep up the amazing work!',
      date: '2 hours ago',
    },
    {
      name: 'Sarah M.',
      amount: 50,
      message: 'This project is inspiring',
      date: '5 hours ago',
    },
    {
      name: 'Alex K.',
      amount: 25,
      message: 'Supporting neurodiversity awareness',
      date: '1 day ago',
    },
    {
      name: 'Anonymous',
      amount: 200,
      message: 'Thank you for sharing your story',
      date: '2 days ago',
    },
    {
      name: 'Maria L.',
      amount: 75,
      message: 'Amazing transformation journey',
      date: '3 days ago',
    },
  ];

  const handleDonation = async amount => {
    const donationAmount =
      amount === 'custom' ? parseFloat(customAmount) : amount;

    if (!donationAmount || donationAmount <= 0) return;

    // Simulate donation processing
    const donation = {
      name: donorName || 'Anonymous',
      amount: donationAmount,
      message: donorMessage,
      timestamp: new Date().toISOString(),
      tier: getDonorTier(donationAmount),
    };

    addDonation(donation);

    // Reset form
    setSelectedAmount(null);
    setCustomAmount('');
    setDonorName('');
    setDonorMessage('');
  };

  const getDonorTier = amount => {
    return (
      donorTiers.find(
        tier => amount >= tier.minAmount && amount <= tier.maxAmount
      ) || donorTiers[0]
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {t('donors.title')} - {t('app.title')}
        </title>
        <meta name="description" content={t('donors.subtitle')} />
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
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('donors.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-dark-400 mb-8"
            >
              {t('donors.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Support the Journey
                </h2>
                <p className="text-dark-400">
                  Your contribution helps continue this transformative project
                  and supports neurodiversity awareness
                </p>
              </div>

              {/* Donation Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {donationAmounts.map(option => (
                  <button
                    key={option.amount}
                    onClick={() => setSelectedAmount(option.amount)}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAmount === option.amount
                        ? 'border-primary-400 bg-primary-400/20 text-primary-400'
                        : 'border-dark-600 bg-dark-700 hover:border-primary-400/50 text-white'
                    }`}
                  >
                    {option.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-400 text-dark-900 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="text-lg font-semibold">
                      {option.amount === 'custom'
                        ? 'Custom'
                        : `$${option.amount}`}
                    </div>
                    <div className="text-sm text-dark-400">{option.label}</div>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              {selectedAmount === 'custom' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="0.00"
                      className="input-field pl-8"
                    />
                  </div>
                </div>
              )}

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    placeholder="Anonymous"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={donorMessage}
                    onChange={e => setDonorMessage(e.target.value)}
                    placeholder="Leave a message of support"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={() => handleDonation(selectedAmount)}
                disabled={
                  !selectedAmount ||
                  (selectedAmount === 'custom' && !customAmount)
                }
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>{t('donors.donate')}</span>
              </button>

              {/* Security Notice */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-dark-400">
                <Shield className="w-4 h-4" />
                <span>Secure payment processing with Stripe</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Donor Tiers */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Donor Tiers
              </h2>
              <p className="text-xl text-dark-400">
                Recognition levels based on your contribution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {donorTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-dark-400 mb-4">
                    ${tier.minAmount}
                    {tier.maxAmount === Infinity
                      ? '+'
                      : ` - $${tier.maxAmount}`}
                  </p>
                  <ul className="space-y-2 text-sm text-dark-300">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Donors */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('donors.wall')}
              </h2>
              <p className="text-xl text-dark-400">
                Recent supporters of the Proof of Mind project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDonors.map((donor, index) => {
                const tier = getDonorTier(donor.amount);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}
                        >
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {donor.name}
                          </h3>
                          <p className="text-sm text-dark-400">{donor.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-400">
                          ${donor.amount}
                        </div>
                        <div className="text-xs text-dark-400">{tier.name}</div>
                      </div>
                    </div>
                    {donor.message && (
                      <p className="text-dark-300 text-sm italic">
                        "{donor.message}"
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-dark-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Impact
              </h2>
              <p className="text-xl text-dark-400 mb-8">
                Every donation helps continue this transformative journey and
                supports the neurodiverse community
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    $2,450
                  </div>
                  <div className="text-dark-400">Total Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    47
                  </div>
                  <div className="text-dark-400">Supporters</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    100%
                  </div>
                  <div className="text-dark-400">Transparent</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DonorWallPage;
