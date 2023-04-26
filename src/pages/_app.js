import "@/styles/globals.css";
import "@/styles/shadows.css";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={robotoMono.className}>
      <Component {...pageProps} />
    </main>
  );
}
