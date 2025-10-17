// Security utilities and configurations

export const SECURITY_HEADERS = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' blob:",
    "connect-src 'self' https://api.proofofmind.app wss://ws.proofofmind.app https://*.auth0.com https://api.openai.com https://api.anthropic.com",
    "frame-src 'self' https://*.auth0.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; '),

  // Security headers
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
  ].join(', '),

  // HSTS (HTTP Strict Transport Security)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // CORS headers
  'Access-Control-Allow-Origin':
    process.env.NODE_ENV === 'production'
      ? 'https://proofofmind.app'
      : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

// Rate limiting configuration
export const RATE_LIMITS = {
  // API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 auth requests per windowMs
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true,
  },

  // AI Interviewer endpoints
  ai: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // limit each IP to 20 AI requests per hour
    message: 'AI request limit exceeded, please try again later.',
    skipSuccessfulRequests: false,
  },

  // File upload endpoints
  upload: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 uploads per hour
    message: 'Upload limit exceeded, please try again later.',
    skipSuccessfulRequests: false,
  },
};

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  phone: /^\+?[\d\s-()]{10,}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  hash: /^[a-f0-9]{64}$/i, // SHA-256 hash
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};

// Sanitization functions
export const sanitizeInput = (input, type = 'string') => {
  if (typeof input !== 'string') return input;

  switch (type) {
    case 'html':
      // Remove HTML tags and decode entities
      return input
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');

    case 'sql':
      // Basic SQL injection prevention
      return input
        .replace(/['"]/g, '')
        .replace(/;/g, '')
        .replace(/--/g, '')
        .replace(/\/\*/g, '')
        .replace(/\*\//g, '');

    case 'xss':
      // XSS prevention
      return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

    default:
      // Basic string sanitization
      return input.trim();
  }
};

// Validation functions
export const validateInput = (input, pattern, fieldName = 'Input') => {
  if (!input || typeof input !== 'string') {
    throw new Error(`${fieldName} is required`);
  }

  if (!pattern.test(input)) {
    throw new Error(`${fieldName} format is invalid`);
  }

  return true;
};

export const validateEmail = email => {
  return validateInput(email, VALIDATION_PATTERNS.email, 'Email');
};

export const validatePassword = password => {
  return validateInput(password, VALIDATION_PATTERNS.password, 'Password');
};

export const validateHash = hash => {
  return validateInput(hash, VALIDATION_PATTERNS.hash, 'Hash');
};

// Security middleware helpers
export const createSecurityHeaders = (customHeaders = {}) => {
  return {
    ...SECURITY_HEADERS,
    ...customHeaders,
  };
};

export const createCORSHeaders = origin => {
  const allowedOrigins = [
    'https://proofofmind.app',
    'https://www.proofofmind.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  const isAllowed = allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed
      ? origin
      : 'https://proofofmind.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
};

// Content Security Policy builder
export const createCSP = (options = {}) => {
  const {
    allowInlineScripts = false,
    allowInlineStyles = false,
    allowEval = false,
    additionalDomains = [],
  } = options;

  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.proofofmind.app'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  if (allowInlineScripts) {
    directives['script-src'].push("'unsafe-inline'");
  }

  if (allowInlineStyles) {
    directives['style-src'].push("'unsafe-inline'");
  }

  if (allowEval) {
    directives['script-src'].push("'unsafe-eval'");
  }

  // Add additional domains
  additionalDomains.forEach(domain => {
    Object.keys(directives).forEach(key => {
      if (
        key !== 'object-src' &&
        key !== 'base-uri' &&
        key !== 'form-action' &&
        key !== 'frame-ancestors'
      ) {
        directives[key].push(domain);
      }
    });
  });

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

// Security audit functions
export const auditSecurityHeaders = headers => {
  const requiredHeaders = [
    'Content-Security-Policy',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security',
  ];

  const missingHeaders = requiredHeaders.filter(header => !headers[header]);
  const securityScore =
    ((requiredHeaders.length - missingHeaders.length) /
      requiredHeaders.length) *
    100;

  return {
    score: securityScore,
    missingHeaders,
    isSecure: securityScore >= 80,
  };
};

// Encryption utilities
export const generateSecureToken = (length = 32) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const crypto = window.crypto || window.msCrypto;

  if (crypto && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback for older browsers
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
};

// Session security
export const createSecureSession = userData => {
  const sessionId = generateSecureToken(32);
  const timestamp = Date.now();
  const expiresAt = timestamp + 24 * 60 * 60 * 1000; // 24 hours

  return {
    sessionId,
    userData,
    timestamp,
    expiresAt,
    isExpired: () => Date.now() > expiresAt,
  };
};

export default {
  SECURITY_HEADERS,
  RATE_LIMITS,
  VALIDATION_PATTERNS,
  sanitizeInput,
  validateInput,
  validateEmail,
  validatePassword,
  validateHash,
  createSecurityHeaders,
  createCORSHeaders,
  createCSP,
  auditSecurityHeaders,
  generateSecureToken,
  createSecureSession,
};


