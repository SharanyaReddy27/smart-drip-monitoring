import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'doctor' | 'nurse';

interface User {
  name: string;
  role: UserRole;
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, role: UserRole, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: UserRole, email: string) => {
    setUser({
      name,
      role,
      id: Math.random().toString(36).substr(2, 9),
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
