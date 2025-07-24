import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user from localStorage on mount
    try {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error('Error updating user data in localStorage:', error);
      }
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };
}
