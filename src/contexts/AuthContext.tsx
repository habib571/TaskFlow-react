

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
  } from 'react';
  import axios from 'axios';

  import { User, AuthState } from '../types';
  
  // Mock users for demo login—remove this once your backend login is ready
  const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com' },
  ];
  
  interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    getAllUsers: () => User[];
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
      user: null,
      isAuthenticated: false,
      loading: true,
    });
  
    // On mount, load any persisted user
    useEffect(() => {
      const stored = localStorage.getItem('user');
      if (stored) {
        setState({ user: JSON.parse(stored), isAuthenticated: true, loading: false });
      } else {
        setState(s => ({ ...s, loading: false }));
      }
    }, []);
  
    const login = async (email: string, password: string): Promise<boolean> => {
      setState(s => ({ ...s, loading: true }));
      try {
        // TODO: replace with real API call
        await new Promise(r => setTimeout(r, 1000));
        const user = mockUsers.find(u => u.email === email);
        if (!user) throw new Error('Invalid credentials');
  
        localStorage.setItem('user', JSON.stringify(user));
        setState({ user, isAuthenticated: true, loading: false });
        return true;
      } catch (err) {
        console.error('Login failed:', err);
        setState(s => ({ ...s, loading: false }));
        return false;
      }
    };
  
    const register = async (name: string, email: string, password: string): Promise<boolean> => {
      setState(s => ({ ...s, loading: true }));
      try {
        const res = await axios.post('http://localhost:8000/auth/signup', {
          fullName: name,
          email,
          password,
        });
        const newUser: User = res.data;
        localStorage.setItem('user', JSON.stringify(newUser));
        setState({ user: newUser, isAuthenticated: true, loading: false });
        return true;
      } catch (err: any) {
        console.error('Registration failed:', err.response?.data || err.message);
        setState(s => ({ ...s, loading: false }));
        return false;
      }
    };
  
    const logout = (): void => {
      localStorage.removeItem('user');
      setState({ user: null, isAuthenticated: false, loading: false });
    };
  
    const getAllUsers = (): User[] => {
      return mockUsers;
    };
  
    return (
      <AuthContext.Provider
        value={{ ...state, login, register, logout, getAllUsers }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
  };
  