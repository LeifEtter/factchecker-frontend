import { useEffect, useState } from "react";

export function useDarkmode(
  darkmodeActive: boolean,
  setDarkmodeActive: Function
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const darkmodePrefActive = (): boolean => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }
    return false;
  };

  const isDarkmodeStored = (): boolean => {
    const localStorageDarkmode: string | null =
      localStorage.getItem("darkmode");
    if (localStorageDarkmode == "active") {
      return true;
    }
  };

  const storeDarkmode = () => {
    localStorage.setItem("darkmode", "active");
    console.log("Srt darkmode");
  };

  const removeDarkmodeFromStorage = () => {
    localStorage.removeItem("darkmode");
  };

  const forceLightmode = () => {
    localStorage.setItem("lightmode", "active");
  };

  const removeForceLightmode = () => {
    localStorage.removeItem("lightmode");
  };

  const isForceLightmodeStored = (): boolean => {
    console.log("Checking");
    const localStorageForceLightmode: string | null =
      localStorage.getItem("lightmode");
    console.log(localStorageForceLightmode);
    if (localStorageForceLightmode == "active") return true;
    return false;
  };

  const activateDarkmode = () => {
    removeForceLightmode();
    storeDarkmode();
  };

  const activateLightmode = () => {
    removeDarkmodeFromStorage();
    forceLightmode();
  };

  useEffect(() => {
    setIsLoading(true);
    if (
      (darkmodePrefActive() && !isForceLightmodeStored()) ||
      isDarkmodeStored()
    ) {
      activateDarkmode();
      setDarkmodeActive(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (darkmodeActive) {
      activateDarkmode();
    } else {
      activateLightmode();
    }
  }, [darkmodeActive]);

  return [isLoading];
}
