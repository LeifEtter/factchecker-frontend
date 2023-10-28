import { createContext } from "react";

export interface UserContextType {
  user: User;
  setUser: Function;
}

export const UserContext = createContext<UserContextType | null>(null);
