import { getInfoApi } from '@api';
import { Loading } from '@components/shared';
import { createContext, useContext, useEffect, useState } from 'react';

export const INITIAL_USER_INFO = {
  _id: '',
  type: ''
};

const INITIAL_STATE = {
  userInfo: INITIAL_USER_INFO,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo({ type: response.role, ...response });
        setIsAuthenticated(true);
      } else localStorage.removeItem('token');
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkAuth();
  }, []);

  const value = {
    userInfo,
    setUserInfo,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{isLoading ? <Loading /> : children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
