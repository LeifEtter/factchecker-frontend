import { API } from "../assets/constants";
import { Appbar } from "../components/appbar/Appbar";
import { UserContext } from "../state/user";
import "../styles/globals.css";
import "../styles/shadows.css";
import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppbarCollapsed } from "../components/appbar/AppbarCollapsed";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "auto",
});

/**
 * @returns Mein App containing logic for user authentication, State Management and Appbar
 */
export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const syncUserInfo = async () => {
      const res = await fetch(`${API}/users/authenticate`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      if (res.status == 401) {
        sessionStorage.removeItem("user");
        return;
      }
      const dec = await res.json();
      const sessionUser: User = JSON.parse(sessionStorage.getItem("user"));
      if (
        !user ||
        !sessionUser ||
        dec.id != sessionUser.id ||
        dec.name != sessionUser.name ||
        dec.avatar != sessionUser.avatar
      ) {
        sessionStorage.setItem("user", JSON.stringify(dec));
        setUser(dec);
      }
    };

    if (!user) {
      syncUserInfo();
      // const storedUser: User = JSON.parse(sessionStorage.getItem("user"));
      // setUser(storedUser);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className={`${robotoMono.className} mb-10`}>
        <div className="mx-4 md:mx-12 mt-8">
          {/* TODO Show Burger Menu beyond certain breakpoint*/}
          <div className="hidden sm:block">
            <Appbar path={path} user={user ?? null} />
          </div>
          <div className="flex-col w-full sm:hidden">
            <AppbarCollapsed path={path} user={user} />
          </div>
        </div>
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
