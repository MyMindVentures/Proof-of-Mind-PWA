import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Language
      language: 'en',
      setLanguage: (language) => set({ language }),

      // User authentication
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Proof Layer
      proofItems: [],
      addProofItem: (item) => set((state) => ({
        proofItems: [...state.proofItems, { ...item, id: Date.now(), timestamp: new Date().toISOString() }]
      })),
      removeProofItem: (id) => set((state) => ({
        proofItems: state.proofItems.filter(item => item.id !== id)
      })),

      // AI Interviewer
      currentInterview: null,
      interviewHistory: [],
      startInterview: (profile) => set({
        currentInterview: {
          id: Date.now(),
          profile,
          startTime: new Date().toISOString(),
          questions: [],
          answers: [],
          status: 'active'
        }
      }),
      endInterview: () => set((state) => ({
        interviewHistory: [...state.interviewHistory, {
          ...state.currentInterview,
          endTime: new Date().toISOString(),
          status: 'completed'
        }],
        currentInterview: null
      })),
      addQuestion: (question) => set((state) => ({
        currentInterview: state.currentInterview ? {
          ...state.currentInterview,
          questions: [...state.currentInterview.questions, question]
        } : null
      })),
      addAnswer: (answer) => set((state) => ({
        currentInterview: state.currentInterview ? {
          ...state.currentInterview,
          answers: [...state.currentInterview.answers, answer]
        } : null
      })),

      // Donations
      donations: [],
      addDonation: (donation) => set((state) => ({
        donations: [...state.donations, { ...donation, id: Date.now(), timestamp: new Date().toISOString() }]
      })),

      // UI State
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      loading: false,
      setLoading: (loading) => set({ loading }),

      error: null,
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, {
          ...notification,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      clearNotifications: () => set({ notifications: [] }),

      // Settings
      settings: {
        autoSave: true,
        notifications: true,
        darkMode: true,
        language: 'en',
        theme: 'turquoise-dark'
      },
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      // Reset store
      reset: () => set({
        user: null,
        isAuthenticated: false,
        proofItems: [],
        currentInterview: null,
        interviewHistory: [],
        donations: [],
        sidebarOpen: false,
        loading: false,
        error: null,
        notifications: []
      })
    }),
    {
      name: 'proof-of-mind-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        proofItems: state.proofItems,
        interviewHistory: state.interviewHistory,
        donations: state.donations,
        settings: state.settings
      })
    }
  )
)


