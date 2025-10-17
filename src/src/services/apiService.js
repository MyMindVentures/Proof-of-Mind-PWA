/**
 * Real API Service for Proof of Mind PWA
 * Handles all backend communication with proper error handling and authentication
 */

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.proofofmind.app';
    this.wsURL = import.meta.env.VITE_WS_URL || 'wss://ws.proofofmind.app';
    this.token = null;
    this.wsConnection = null;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token) {
    this.token = token;
  }

  /**
   * Get headers for API requests
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  /**
   * Upload file with progress tracking
   */
  async uploadFile(endpoint, file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = { ...this.getHeaders() };
    delete headers['Content-Type']; // Let browser set it for FormData

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${this.baseURL}${endpoint}`);

      // Set headers
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.send(formData);
    });
  }

  /**
   * WebSocket connection for real-time features
   */
  connectWebSocket() {
    if (this.wsConnection) {
      return this.wsConnection;
    }

    this.wsConnection = new WebSocket(this.wsURL);

    this.wsConnection.onopen = () => {
      console.log('WebSocket connected');
      if (this.token) {
        this.wsConnection.send(
          JSON.stringify({
            type: 'auth',
            token: this.token,
          })
        );
      }
    };

    this.wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      this.wsConnection = null;
    };

    this.wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return this.wsConnection;
  }

  /**
   * Send WebSocket message
   */
  sendWebSocketMessage(message) {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  /**
   * Close WebSocket connection
   */
  disconnectWebSocket() {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  // Proof Layer API Methods
  async generateProof(content, metadata) {
    return this.post('/api/proof/generate', { content, metadata });
  }

  async verifyProof(proofId) {
    return this.get(`/api/proof/verify/${proofId}`);
  }

  async getProofHistory() {
    return this.get('/api/proof/history');
  }

  // AI Interviewer API Methods
  async startInterview(profileId) {
    return this.post('/api/interview/start', { profileId });
  }

  async submitAnswer(interviewId, questionId, answer) {
    return this.post('/api/interview/answer', { interviewId, questionId, answer });
  }

  async endInterview(interviewId) {
    return this.post('/api/interview/end', { interviewId });
  }

  async getInterviewHistory() {
    return this.get('/api/interview/history');
  }

  // Donor Wall API Methods
  async createDonation(donationData) {
    return this.post('/api/donations', donationData);
  }

  async getDonations() {
    return this.get('/api/donations');
  }

  async getDonorStats() {
    return this.get('/api/donations/stats');
  }

  // Story API Methods
  async getStory() {
    return this.get('/api/story');
  }

  async updateStory(storyData) {
    return this.put('/api/story', storyData);
  }

  async getStoryChapters() {
    return this.get('/api/story/chapters');
  }

  // User API Methods
  async getUserProfile() {
    return this.get('/api/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.put('/api/user/profile', profileData);
  }

  async getUserSettings() {
    return this.get('/api/user/settings');
  }

  async updateUserSettings(settings) {
    return this.put('/api/user/settings', settings);
  }

  // Analytics API Methods
  async trackEvent(eventName, eventData) {
    return this.post('/api/analytics/track', { eventName, eventData });
  }

  async getAnalytics() {
    return this.get('/api/analytics');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;


