// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
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

  const logout = () => {
    document.cookie = '.AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
    setIsLoggedIn(false);
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
