import axios, { AxiosResponse } from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export type User = {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
}

type AuthContextProps = {
  autoSignIn: () => Promise<void | AxiosResponse<any, any>>,
  user: User | null,
  register: (username: string, password: string, first_name: string, last_name: string) => Promise<void | AxiosResponse<any, any>>,
  login: (username: string, password: string) => Promise<void | AxiosResponse<any, any>>,
  logout: () => void,
  error: null | string,
  clearError: () => void
}

const authContext = createContext<AuthContextProps>({} as AuthContextProps);

type ProvideAuthenticationProps = {
  children: React.ReactNode,
}

// useAuth hook from Medium article
// https://hhpendleton.medium.com/useauth-265512bbde3c

export function ProvideAuthentication({ children }: ProvideAuthenticationProps) {
  const auth = Authentication();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(authContext);
}

function Authentication() {

  const [user, setUser] = useState<null | User>(null);
  const [error, setError] = useState<null | string>(null);

  console.log("User", user)

  const autoSignIn = useCallback(async () => {
    api.get('/user').then(res => {
      console.log("Successful get user", res);
      clearError();
      setUser(res.data);
      return res;
    }).catch(() => {
      return;
    });
  }, [setUser]);

  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);

  function register(username: string, password: string, first_name: string, last_name: string) {
    return api.post('/register', { username, password, first_name, last_name })
      .then(res => {
        console.log("Successful register", res);
        clearError();
        setUser(res.data);
        return res;
      }).catch(err => {
        console.log(err);
        setError(err.response.data.error);
      });
  }

  function login(username: string, password: string) {
    return api.post('/login', { username, password })
      .then(res => {
        console.log("Successful login", res);
        clearError();
        setUser(res.data);
        return res;
      }
      ).catch(err => {
        console.log(err);
        setError(err.response.data.error);
      });
  }

  function logout() {
    return api.get('/logout')
      .then(res => {
        console.log("Successful logout", res);
        clearError();
        setUser(null);
        return res;
      }).catch(err => {
        console.log(err);
        setError(err.response.data.error);
      });
  }

  function clearError() {
    setError(null);
  }

  return {
    autoSignIn,
    user,
    register,
    login,
    logout,
    error,
    clearError
  }
}