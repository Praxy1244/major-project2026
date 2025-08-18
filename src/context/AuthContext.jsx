import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('scdp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('scdp_token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('scdp_user', JSON.stringify(user));
    else localStorage.removeItem('scdp_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('scdp_token', token);
    else localStorage.removeItem('scdp_token');
  }, [token]);

  // Mock register: store user in "mock database"
  const register = async ({ name, email, password, role }) => {
    await new Promise(res => setTimeout(res, 300)); // simulate delay

    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(users));

    setUser(newUser);
    setToken('fake-token');
    return newUser;
  };

  // Mock login: retrieve user from "mock database"
  const login = async (email, password) => {
    await new Promise(res => setTimeout(res, 300)); // simulate delay

    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    setToken('fake-token');
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
