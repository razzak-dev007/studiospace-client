'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { apiGetMe, apiLogin, apiRegister, apiGoogleLogin, apiLogout } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<{ success: boolean; message: string }>;
  googleLogin: (name: string, email: string, photoURL?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize and preserve session across reloads
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        // Fast instant restore from localStorage to avoid redirect glitches on private route reload
        const cachedUser = localStorage.getItem('studiospace_user');
        if (cachedUser) {
          try {
            setUser(JSON.parse(cachedUser));
          } catch {
            localStorage.removeItem('studiospace_user');
          }
        }

        // Verify with server using HTTPOnly cookie or Bearer token
        const res = await apiGetMe();
        if (isMounted && res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('studiospace_user', JSON.stringify(res.user));
        }
      } catch {
        // Token invalid or expired
        if (isMounted) {
          setUser(null);
          localStorage.removeItem('studiospace_user');
          localStorage.removeItem('studiospace_token');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiLogin({ email, password });
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('studiospace_user', JSON.stringify(res.user));
      if (res.token) {
        localStorage.setItem('studiospace_token', res.token);
      }
    }
    return { success: res.success, message: res.message };
  };

  const register = async (name: string, email: string, password: string, photoURL?: string) => {
    const res = await apiRegister({ name, email, password, photoURL });
    return { success: res.success, message: res.message };
  };

  const googleLogin = async (name: string, email: string, photoURL?: string) => {
    const res = await apiGoogleLogin({ name, email, photoURL });
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('studiospace_user', JSON.stringify(res.user));
      if (res.token) {
        localStorage.setItem('studiospace_token', res.token);
      }
    }
    return { success: res.success, message: res.message };
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      localStorage.removeItem('studiospace_user');
      localStorage.removeItem('studiospace_token');
    }
  };

  const refreshUser = async () => {
    try {
      const res = await apiGetMe();
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('studiospace_user', JSON.stringify(res.user));
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
