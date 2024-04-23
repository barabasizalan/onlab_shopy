// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import API_URLS from '../apiConfig';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => Promise<boolean>;
  setUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookieExists = document.cookie.split(';').some(cookie => {
      const [name, _] = cookie.split('=');
      return name.trim() === '.AspNetCore.Identity.Application';
    });
    if (cookieExists) {
      setIsLoggedIn(true);
      
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async (): Promise<boolean> => {
    try {
      const response = await axios.post(API_URLS.logout);
      if (response.status === 200) {
        setIsLoggedIn(false);
        return true;
      }
      console.error('Error logging out:', response);
      return false;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
    
  };

  const updateUserId = (id: string | null) => {
    console.log("User's id: " + id);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setUserId: updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
