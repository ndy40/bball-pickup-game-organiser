import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { IUser } from 'services/UserService';
import { useQueryClient } from 'react-query';
import { removeToken } from 'services/local-storage';
import queryKeys from 'utilities/react-query/constant';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';

interface IAuthContext {
  logout: () => void;
  user: IUser | null | undefined;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: IAuthProvider) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined | null>(undefined);
  const { data, isError } = useAuth();

  useEffect(() => {
    if (isError) {
      setUser(null);
    }
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser, isError]);

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used under an AuthProvider');
  }
  return context;
}
