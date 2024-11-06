import { createContext } from "react";

export interface UserSettingsContextType {
  darkModeActive: boolean;
  setDarkModeActive: Function;
}

/**
 * Context containing user settings
 */
export const UserSettingsContext =
  createContext<UserSettingsContextType | null>({
    darkModeActive: false,
    setDarkModeActive: () => {},
  });
