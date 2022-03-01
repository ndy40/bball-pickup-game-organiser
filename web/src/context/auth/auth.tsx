/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line object-curly-newline
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
import useAuth from '../../hooks/auth/useAuth';

interface IAuthContext {
  logout: () => void;
  user: IUser | undefined;
  isLoading: boolean;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { data, isLoading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  const logout = () => {
    setUser(undefined);
    removeToken();
    queryClient.removeQueries([queryKeys.profile]);
    window.location.assign('/');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, isLoading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used under an AuthProvider');
  }
  return context;
}
