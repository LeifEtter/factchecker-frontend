import { ClaimCard } from "@/components/ClaimCard";
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
