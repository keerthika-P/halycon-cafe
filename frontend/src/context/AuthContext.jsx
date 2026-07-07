import { createContext, useContext, useState, useCallback } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('halycon_user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (authResponse) => {
    localStorage.setItem('halycon_token', authResponse.token);
    const userData = {
      id: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role,
    };
    localStorage.setItem('halycon_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password });
    persist(res);
    return res;
  }, []);

  const signup = useCallback(async (name, email, phone, password) => {
    const res = await authApi.signup({ name, email, phone, password });
    persist(res);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('halycon_token');
    localStorage.removeItem('halycon_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
