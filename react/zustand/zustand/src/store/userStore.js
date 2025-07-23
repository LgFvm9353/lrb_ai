import { create } from 'zustand';

import axios from 'axios';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  fetchUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },
  
  updateUser: async (userId, updates) => {
    set({ loading: true });
    try {
      const response = await axios.put(
        `https://api.example.com/users/${userId}`,
        updates,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },
}));