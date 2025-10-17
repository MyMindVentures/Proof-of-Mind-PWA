import { createAuth0Client } from '@auth0/auth0-spa-js';

class AuthService {
  constructor() {
    this.auth0Client = null;
    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
  }

  async initialize() {
    try {
      this.auth0Client = await createAuth0Client({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });

      // Check if user is returning from Auth0
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        await this.auth0Client.handleRedirectCallback();
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      // Check if user is authenticated
      this.isAuthenticated = await this.auth0Client.isAuthenticated();
      if (this.isAuthenticated) {
        this.user = await this.auth0Client.getUser();
        this.token = await this.auth0Client.getTokenSilently();
      }

      return {
        success: true,
        isAuthenticated: this.isAuthenticated,
        user: this.user,
      };
    } catch (error) {
      console.error('Auth0 initialization error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async login() {
    try {
      await this.auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getToken() {
    try {
      if (this.isAuthenticated) {
        this.token = await this.auth0Client.getTokenSilently();
        return this.token;
      }
      return null;
    } catch (error) {
      console.error('Token retrieval error:', error);
      return null;
    }
  }

  async getUser() {
    try {
      if (this.isAuthenticated) {
        this.user = await this.auth0Client.getUser();
        return this.user;
      }
      return null;
    } catch (error) {
      console.error('User retrieval error:', error);
      return null;
    }
  }

  // Check if user has specific permission
  hasPermission(permission) {
    if (!this.user || !this.user.permissions) return false;
    return this.user.permissions.includes(permission);
  }

  // Check if user has specific role
  hasRole(role) {
    if (!this.user || !this.user.roles) return false;
    return this.user.roles.includes(role);
  }

  // Get user profile data
  getProfile() {
    if (!this.user) return null;

    return {
      id: this.user.sub,
      email: this.user.email,
      name: this.user.name,
      picture: this.user.picture,
      emailVerified: this.user.email_verified,
      roles: this.user.roles || [],
      permissions: this.user.permissions || [],
      metadata: this.user.user_metadata || {},
    };
  }

  // Update user metadata
  async updateUserMetadata(metadata) {
    try {
      if (!this.isAuthenticated) throw new Error('User not authenticated');

      const token = await this.getToken();
      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${this.user.sub}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_metadata: metadata,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to update user metadata');

      // Refresh user data
      this.user = await this.auth0Client.getUser();
      return { success: true, user: this.user };
    } catch (error) {
      console.error('Update user metadata error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check authentication status
  getAuthStatus() {
    return {
      isAuthenticated: this.isAuthenticated,
      user: this.user,
      hasToken: !!this.token,
    };
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;


