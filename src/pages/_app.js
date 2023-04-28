import { Appbar } from "@/components/Appbar";
import { TokenContext } from "@/state/token";
import "@/styles/globals.css";
import "@/styles/shadows.css";
import Cookies from "js-cookie";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    checkToken(token);
  }, []);

  const checkToken = async (token) => {
    const result = await fetch("http://localhost:3005/users/authenticate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.status == 200) {
      setToken(token);
    } else {
      setToken(null);
      Cookies.remove("auth_token");
    }
  };

  return (
    <main className={robotoMono.className}>
      <TokenContext.Provider value={[token, setToken]}>
        <Appbar path={path} />
        <Component {...pageProps} />
      </TokenContext.Provider>
    </main>
  );
}
