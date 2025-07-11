import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};