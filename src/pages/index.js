import { ClaimCard } from "@/components/ClaimCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-4xl">
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
