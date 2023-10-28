import { Appbar } from "../components/Appbar";
import { UserContext } from "../state/user";
import "../styles/globals.css";
import "../styles/shadows.css";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "auto",
});

export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;
  // const [token, setToken] = useState<string>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {}, []);

  const getUserInfo = async () => {};

  // const checkToken = async (token) => {
  //   const result = await fetch("http://localhost:3005/users/authenticate", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (result.status == 200) {
  //     setToken(token);
  //   } else {
  //     setToken(null);
  //     Cookies.remove("auth_token");
  //   }
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className={`${robotoMono.className} mb-10`}>
        <div className="ml-12 mr-12 mt-8">
          <Appbar path={path} />
        </div>
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
