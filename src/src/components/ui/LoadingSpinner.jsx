import { motion } from 'framer-motion';
import { Brain, Loader2 } from 'lucide-react';
import React from 'react';

const LoadingSpinner = ({ size = 'default', message = 'Loading...', showBrain = true }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const containerSizeClasses = {
    small: 'p-4',
    default: 'p-8',
    large: 'p-12',
    xl: 'p-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]}`}>
      <div className="relative">
        {/* Brain Icon Animation */}
        {showBrain && (
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Brain className={`${sizeClasses[size]} text-primary-400`} />
          </motion.div>
        )}

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${showBrain ? 'opacity-30' : ''}`}
        >
          <Loader2 className={`${sizeClasses[size]} text-primary-400`} />
        </motion.div>
      </div>

      {/* Loading Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-dark-400 text-sm font-medium"
        >
          {message}
        </motion.p>
      )}

      {/* Dots Animation */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-1 h-1 bg-primary-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;


