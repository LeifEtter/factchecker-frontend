import { createContext } from "react";

export interface UserContextType {
  user: User;
  setUser: Function;
}

/**
 * Context containing currently logged in users information
 */
export const UserContext = createContext<UserContextType | null>(null);
