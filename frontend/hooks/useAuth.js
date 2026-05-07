import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../lib/api';

const AuthContext = createContext(null);

const ROLE_STUDENT = 'STUDENT';
const ROLE_INSTRUCTOR = 'INSTRUCTOR';

const setAuthCookies = (user, accessToken) => {
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `learnify_role=${user.role || ROLE_STUDENT}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `learnify_token=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const clearAuthCookies = () => {
  document.cookie = 'learnify_role=; path=/; max-age=0; SameSite=Lax';
  document.cookie = 'learnify_token=; path=/; max-age=0; SameSite=Lax';
};

export const getRoleDashboardPath = (role) => (
  role === ROLE_INSTRUCTOR ? '/dashboard/instructor' : '/dashboard/student'
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAuthCookies(parsedUser, token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuthCookies(data.user, data.accessToken);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password, role = ROLE_STUDENT) => {
    const { data } = await authAPI.register({ name, email, password, role });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuthCookies(data.user, data.accessToken);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await authAPI.logout(refreshToken);
    } catch (_) {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    clearAuthCookies();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAuthenticated: !!user,
      isStudent: user?.role === ROLE_STUDENT,
      isInstructor: user?.role === ROLE_INSTRUCTOR,
      dashboardPath: getRoleDashboardPath(user?.role),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};