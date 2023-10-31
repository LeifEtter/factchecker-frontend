import { Appbar } from "../components/Appbar";
import { UserContext } from "../state/user";
import "../styles/globals.css";
import "../styles/shadows.css";
import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "auto",
});

export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const syncUserInfo = async () => {
      const res = await fetch("http://localhost:3005/users/authenticate", {
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
        <div className="ml-12 mr-12 mt-8">
          <Appbar path={path} user={user ?? null} />
        </div>
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
