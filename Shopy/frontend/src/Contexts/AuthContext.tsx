// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const cookieExists = document.cookie.split(';').some(cookie => {
      const [name, _] = cookie.split('=');
      return name.trim() === 'ShopyCookie';
    });
    if (cookieExists) {
      setIsLoggedIn(true);
      
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateUserId = (id: string | null) => {
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout, setUserId: updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
