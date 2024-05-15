import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import API_URLS from '../service/apiConfig';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
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
  const [isAdmin, setIsAdmin] = useState(() => {
    const isAdminFromStorage = localStorage.getItem('isAdmin');
    return isAdminFromStorage ? JSON.parse(isAdminFromStorage) : false;
  });

  useEffect(() => {
    const cookieExists = document.cookie.split(';').some(cookie => {
      const [name, _] = cookie.split('=');
      return name.trim() === '.AspNetCore.Identity.Application';
    });
    if (cookieExists) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(API_URLS.login, {
        email: email,
        password: password,
        twoFactorCode: "",
        twoFactorRecoveryCode: ""
      });
      if (response.status === 200) {
        const role = await axios.get(API_URLS.getUserRole(encodeURIComponent(email)));
        if (String(role.data.role) === "Admin") {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        } else {
          setIsAdmin(false);
          localStorage.setItem('isAdmin', 'false');
        }
        setIsLoggedIn(true);
        return true;
      } else {
        console.error('Error logging in:', response);
        return false;
      }
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const response = await axios.post(API_URLS.logout);
      if (response.status === 200) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        return true;
      }
      console.error('Error logging out:', response);
      return false;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }

  };

  const contextValue = {
    isLoggedIn, isAdmin, login, logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
