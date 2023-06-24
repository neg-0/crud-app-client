import { ReactNode, createContext, useState } from "react";

type AuthenticationProviderProps = {
  children: ReactNode
}

type User = {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
}

type UserContextProps = {
  loggedInUser: User | null,
  setLoggedInUser: (user: User) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export default function AuthenticationProvider({ children }: AuthenticationProviderProps) {

  const [loggedInUser, setLoggedInUser] = useState<null | User>(null);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}