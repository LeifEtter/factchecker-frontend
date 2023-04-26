import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="mt-5 ml-5 mr-5">
          <div className="flex justify-between bg-white rounded-2xl shadow-md px-3 py-3 float-left gap-10">
            <Link href="/">Home</Link>
            <Link href="/">New</Link>
            <Link href="/">Requests</Link>
          </div>
        </div>
        <div>
          <h1 className="text-lg mt-5 ml-5">Posts/Articles</h1>
        </div>
        <div className="grid grid-cols-2">
          <ClaimCard
            title="Donald Trump Arrested"
            description="Pictures posted on Twitter show Donald Trump being arrested in front of the White House."
          />
        </div>
      </div>
    </main>
  );
}

const ClaimCard = ({ title, description }) => (
  <div className="flex flex-col bg-white p-3 rounded-2xl special-shadow">
    <div className="flex items-center justify-between">
      <h1>{title}</h1>
      <IndicatorNew validity={35} />
    </div>
    <div>{description}</div>
    <div className="flex flex-row gap-4">
      <div className="flex-1 relative">
        <Image
          src="https://factchecker-images.s3.eu-central-1.amazonaws.com/claims/trump_arrested.jpg"
          alt={`${title}-image`}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <div className="rounded-xl p-2 shadow-md">Evidence</div>
        <div className="rounded-xl p-3 shadow-md">Evidence</div>
      </div>
    </div>
  </div>
);

const IndicatorNew = ({ validity }) => {
  const [text, setText] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    if (validity < 30) {
      setText("False");
      setColor("bg-red-500");
    } else if (validity < 50) {
      setText("Likely False");
      setColor("bg-red-300");
    } else if (validity < 80) {
      setText("Likely True");
      setColor("bg-green-300");
    } else {
      setText("True");
      setColor("bg-green-500");
    }
  }, [validity]);

  return <div className={`${color} p-2 rounded-2xl`}>{text}</div>;
};
