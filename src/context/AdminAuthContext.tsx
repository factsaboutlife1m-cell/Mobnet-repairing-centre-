import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLoginAt?: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('mobnet_admin_token') || sessionStorage.getItem('mobnet_admin_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authenticated fetch wrapper
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(url, { ...options, headers });
  };

  // Verify token on mount
  useEffect(() => {
    let isMounted = true;
    const verifySession = async () => {
      if (!token) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/admin/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && data.admin) {
            setAdmin(data.admin);
          }
        } else {
          // Token invalid or expired
          if (isMounted) {
            localStorage.removeItem('mobnet_admin_token');
            sessionStorage.removeItem('mobnet_admin_token');
            setToken(null);
            setAdmin(null);
          }
        }
      } catch (err) {
        console.error('Session verification failed:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (email: string, password: string, rememberMe = true): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Authentication failed. Please check credentials.' };
      }

      setToken(data.token);
      setAdmin(data.admin);

      if (rememberMe) {
        localStorage.setItem('mobnet_admin_token', data.token);
        sessionStorage.removeItem('mobnet_admin_token');
      } else {
        sessionStorage.setItem('mobnet_admin_token', data.token);
        localStorage.removeItem('mobnet_admin_token');
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error or server unreachable. Please try again.' };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        // Ignore logout network error
      }
    }
    localStorage.removeItem('mobnet_admin_token');
    sessionStorage.removeItem('mobnet_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin && !!token,
        isLoading,
        login,
        logout,
        authFetch
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
