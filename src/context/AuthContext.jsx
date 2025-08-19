import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const sleep = (ms = 350) => new Promise(res => setTimeout(res, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('scdp_user');
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('scdp_token') || null);

  // Persist user + token
  useEffect(() => {
    if (user) localStorage.setItem('scdp_user', JSON.stringify(user));
    else localStorage.removeItem('scdp_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('scdp_token', token);
    else localStorage.removeItem('scdp_token');
  }, [token]);

  // ---------- Mock DB helpers ----------
  const getUsers = () => JSON.parse(localStorage.getItem('mock_users') || '[]');
  const setUsers = (u) => localStorage.setItem('mock_users', JSON.stringify(u));

  // ---------- Auth API (mock) ----------
  const register = async ({ name, email, password, role }) => {
    await sleep();
    if (!['donor', 'ngo'].includes(role)) {
      throw new Error('Invalid role. Only Donor or NGO can sign up.');
    }
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    const newUser = { name, email, password, role, createdAt: Date.now() };
    users.push(newUser);
    setUsers(users);

    setUser(newUser);
    setToken('demo-token');
    return newUser;
  };

  const login = async (email, password) => {
    await sleep();

    // ✅ Special Admin
    if (email === 'admin@scdp.com' && password === 'admin123') {
      const admin = { name: 'System Admin', email, role: 'admin' };
      setUser(admin);
      setToken('demo-token');
      return admin;
    }

    const users = getUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Invalid email or password');

    setUser(found);
    setToken('demo-token');
    return found;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({ user, token, register, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
