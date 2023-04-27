import { Appbar } from "@/components/Appbar";
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

  return (
    <main className={robotoMono.className}>
      <Appbar path={path} token={token} />
      <Component {...pageProps} />
    </main>
  );
}
