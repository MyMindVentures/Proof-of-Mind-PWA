// Role-based access control service for Proof of Mind PWA
// Handles different user roles: user, friends, experts, ADHD community, etc.

class RoleService {
  constructor() {
    this.roles = {
      // Core user roles
      user: {
        name: 'User',
        description: 'Basic user with standard access',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:own_interviews',
          'view:donor_wall'
        ],
        features: ['basic_interview', 'proof_generation']
      },

      // Friends and family
      friend: {
        name: 'Friend',
        description: 'Friend or family member with extended access',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:own_interviews',
          'view:donor_wall',
          'view:outreach_dashboard',
          'share:content',
          'comment:interviews'
        ],
        features: ['extended_interview', 'proof_generation', 'content_sharing']
      },

      // ADHD community members
      adhd_community: {
        name: 'ADHD Community',
        description: 'Member of the ADHD/neurodiversity community',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:own_interviews',
          'view:donor_wall',
          'view:community_content',
          'participate:community',
          'share:resources',
          'view:research_data'
        ],
        features: ['community_interview', 'proof_generation', 'community_access', 'resource_sharing']
      },

      // Experts and professionals
      expert: {
        name: 'Expert',
        description: 'Professional expert (Joe Dispenza, Russell Barkley, etc.)',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:all_interviews',
          'view:donor_wall',
          'view:outreach_dashboard',
          'view:analytics',
          'view:research_data',
          'create:expert_content',
          'moderate:content',
          'access:ai_agents'
        ],
        features: ['expert_interview', 'proof_generation', 'analytics_access', 'ai_agent_access', 'content_moderation']
      },

      // Researchers and academics
      researcher: {
        name: 'Researcher',
        description: 'Academic researcher with data access',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:all_interviews',
          'view:research_data',
          'export:data',
          'view:analytics',
          'create:research_content',
          'access:ai_agents'
        ],
        features: ['research_interview', 'proof_generation', 'data_export', 'analytics_access', 'ai_agent_access']
      },

      // Media and press
      media: {
        name: 'Media',
        description: 'Media representative or journalist',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:public_interviews',
          'view:donor_wall',
          'view:outreach_dashboard',
          'create:media_content',
          'share:content'
        ],
        features: ['media_interview', 'proof_generation', 'content_sharing', 'media_access']
      },

      // Admin access
      admin: {
        name: 'Admin',
        description: 'Full administrative access',
        permissions: [
          'view:home',
          'view:story',
          'view:proof',
          'create:interview',
          'view:all_interviews',
          'view:donor_wall',
          'view:outreach_dashboard',
          'view:analytics',
          'view:research_data',
          'create:content',
          'moderate:content',
          'manage:users',
          'manage:roles',
          'access:ai_agents',
          'manage:system'
        ],
        features: ['admin_interview', 'proof_generation', 'full_access', 'user_management', 'system_management']
      }
    };

    this.specialContacts = {
      'joe.dispenza@example.com': 'expert',
      'russell.barkley@example.com': 'expert',
      'adhd.expert@example.com': 'expert',
      'neurodiversity.researcher@example.com': 'researcher',
      'media.contact@example.com': 'media'
    };
  }

  // Get user role based on email or user data
  getUserRole(user) {
    if (!user || !user.email) return 'user';

    const email = user.email.toLowerCase();
    
    // Check special contacts first
    if (this.specialContacts[email]) {
      return this.specialContacts[email];
    }

    // Check domain-based roles
    if (email.includes('@proofofmind.app')) {
      return 'admin';
    }

    if (email.includes('@university.') || email.includes('@research.')) {
      return 'researcher';
    }

    if (email.includes('@media.') || email.includes('@press.')) {
      return 'media';
    }

    // Check user metadata for role
    if (user.metadata && user.metadata.role) {
      return user.metadata.role;
    }

    // Default role
    return 'user';
  }

  // Check if user has specific permission
  hasPermission(user, permission) {
    const role = this.getUserRole(user);
    const roleData = this.roles[role];
    
    if (!roleData) return false;
    
    return roleData.permissions.includes(permission);
  }

  // Check if user has access to specific feature
  hasFeature(user, feature) {
    const role = this.getUserRole(user);
    const roleData = this.roles[role];
    
    if (!roleData) return false;
    
    return roleData.features.includes(feature);
  }

  // Get user's available features
  getUserFeatures(user) {
    const role = this.getUserRole(user);
    const roleData = this.roles[role];
    
    return roleData ? roleData.features : [];
  }

  // Get user's available permissions
  getUserPermissions(user) {
    const role = this.getUserRole(user);
    const roleData = this.roles[role];
    
    return roleData ? roleData.permissions : [];
  }

  // Get role information
  getRoleInfo(roleName) {
    return this.roles[roleName] || null;
  }

  // Get all available roles
  getAllRoles() {
    return Object.keys(this.roles).map(role => ({
      id: role,
      ...this.roles[role]
    }));
  }

  // Create interview link for specific role
  createInterviewLink(user, profile = 'community') {
    const role = this.getUserRole(user);
    const baseUrl = window.location.origin;
    
    // Generate secure token for the interview
    const token = this.generateSecureToken(32);
    
    // Store token with user info
    this.storeInterviewToken(token, {
      userId: user.id,
      email: user.email,
      role: role,
      profile: profile,
      timestamp: Date.now()
    });

    return `${baseUrl}/interviewer?token=${token}&profile=${profile}&role=${role}`;
  }

  // Generate secure token
  generateSecureToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
  }

  // Store interview token
  storeInterviewToken(token, data) {
    const tokens = JSON.parse(localStorage.getItem('interview_tokens') || '{}');
    tokens[token] = {
      ...data,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem('interview_tokens', JSON.stringify(tokens));
  }

  // Validate interview token
  validateInterviewToken(token) {
    const tokens = JSON.parse(localStorage.getItem('interview_tokens') || '{}');
    const tokenData = tokens[token];
    
    if (!tokenData) return null;
    
    if (Date.now() > tokenData.expiresAt) {
      delete tokens[token];
      localStorage.setItem('interview_tokens', JSON.stringify(tokens));
      return null;
    }
    
    return tokenData;
  }

  // Create personalized invitation for contacts
  createInvitation(contactEmail, contactName, role = 'friend') {
    const invitation = {
      email: contactEmail,
      name: contactName,
      role: role,
      token: this.generateSecureToken(32),
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };

    // Store invitation
    const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
    invitations.push(invitation);
    localStorage.setItem('invitations', JSON.stringify(invitations));

    // Generate invitation link
    const baseUrl = window.location.origin;
    const invitationLink = `${baseUrl}/invite?token=${invitation.token}`;

    return {
      invitation,
      link: invitationLink,
      message: this.generateInvitationMessage(contactName, role, invitationLink)
    };
  }

  // Generate personalized invitation message
  generateInvitationMessage(name, role, link) {
    const roleInfo = this.roles[role];
    
    const messages = {
      expert: `Dear ${name},

I'm excited to invite you to participate in my neurodiversity transformation project, "Proof of Mind - From Chaos to Clarity." 

As an expert in your field, your insights would be invaluable to this project. The platform uses AI-powered interviews to document transformation journeys and create cryptographic proof of personal growth.

You'll have access to:
- Expert-level interview profiles
- Analytics and research data
- AI agent insights
- Content moderation capabilities

Please join me at: ${link}

This is a unique opportunity to contribute to neurodiversity awareness and transformation documentation.

Best regards,
[Your Name]`,

      friend: `Hi ${name}!

I wanted to share something special with you - my neurodiversity transformation project called "Proof of Mind - From Chaos to Clarity."

It's a platform that documents personal transformation journeys using AI interviews and creates cryptographic proof of growth. I'd love for you to be part of this journey!

You can access it here: ${link}

Looking forward to sharing this experience with you!

Best,
[Your Name]`,

      adhd_community: `Hello ${name},

I'm reaching out to share my neurodiversity transformation project, "Proof of Mind - From Chaos to Clarity."

As someone who understands the ADHD/neurodiversity experience, I believe you'll find value in this platform. It's designed to document transformation journeys and create proof of personal growth through AI-powered interviews.

The platform includes:
- Community-focused interview profiles
- Resource sharing capabilities
- Research data access
- Community participation features

Join me at: ${link}

Together, we can build a stronger neurodiversity community!

Warm regards,
[Your Name]`,

      media: `Dear ${name},

I'm excited to share my neurodiversity transformation project, "Proof of Mind - From Chaos to Clarity," which I believe would make for an interesting story.

This innovative platform uses AI-powered interviews to document personal transformation journeys and creates cryptographic proof of growth. It's particularly relevant to the neurodiversity and mental health space.

As a media representative, you'll have access to:
- Media-focused interview profiles
- Public content access
- Outreach dashboard
- Content sharing capabilities

Please check it out: ${link}

I'd be happy to discuss this further and provide additional information.

Best regards,
[Your Name]`
    };

    return messages[role] || messages.friend;
  }

  // Get all pending invitations
  getPendingInvitations() {
    const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
    return invitations.filter(inv => Date.now() < inv.expiresAt);
  }

  // Clean up expired tokens and invitations
  cleanup() {
    // Clean expired interview tokens
    const tokens = JSON.parse(localStorage.getItem('interview_tokens') || '{}');
    const now = Date.now();
    Object.keys(tokens).forEach(token => {
      if (now > tokens[token].expiresAt) {
        delete tokens[token];
      }
    });
    localStorage.setItem('interview_tokens', JSON.stringify(tokens));

    // Clean expired invitations
    const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
    const validInvitations = invitations.filter(inv => now < inv.expiresAt);
    localStorage.setItem('invitations', JSON.stringify(validInvitations));
  }
}

// Create singleton instance
const roleService = new RoleService();
export default roleService;


