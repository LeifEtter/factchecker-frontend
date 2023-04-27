import "@/styles/globals.css";
import "@/styles/shadows.css";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const path = useRouter().pathname;

  const UserBar = () => {
    <div># Avatar</div>;
  };

  return (
    <main className={robotoMono.className}>
      <div className="mt-5 ml-5 mr-5 flex justify-between">
        <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-5 py-2 px-3">
          <LinkButton path="/" title="Home" isActive={path == "/"} />

          <LinkButton path="/new" title="New" isActive={path == "/new"} />
          <LinkButton
            path="/requests"
            title="Requests"
            isActive={path == "/requests"}
          />
        </div>
        <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-10 py-2 px-3">
          {!token ? (
            <LinkButton
              path="/login"
              title="Login/Register"
              isActive={path == "/login" || path == "/register"}
            />
          ) : (
            <UserBar></UserBar>
          )}
        </div>
      </div>

      <Component {...pageProps} />
    </main>
  );
}

const LinkButton = ({ title, path, isActive }) => {
  return (
    <Link
      href={path}
      className="py-1 px-2 rounded-xl font-semibold"
      style={{
        backgroundColor: isActive ? "rgb(239, 237, 237)" : "none",
        color: isActive ? "black" : "#535353",
      }}
    >
      {title}
    </Link>
  );
};
