import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { SourceButton, TruthFactorLabel } from "../../components/Buttons";
import { API } from "../../assets/constants";
import { CommentCard } from "../../components/cards/CommentCard";
import { ModalWrapper } from "../../components/ModalWrapper";
import Link from "next/link";
import { Indicator } from "../../components/Indicator";
import { UserSettingsContext } from "../../state/settings";
import { isValidUrl } from "../../helpers/validationHelpers";
import Head from "next/head";

interface ViewSingleClaimProps {
  claim: Claim;
}
/**
 * @returns Page containing single claim to be viewed in-depth as well as comments
 */
export default function ViewSingleClaim({ claim }: ViewSingleClaimProps) {
  const { darkModeActive } = useContext(UserSettingsContext);

  const [viewingSource, setViewingSource] = React.useState<boolean>(false);

  const calculateTruthFactor = (claim: Claim) => {
    if (claim.vote_false == 0 && claim.vote_true == 0) {
      return null;
    }
    const outcome =
      (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
    return outcome;
  };

  return (
    <div>
      <Head>
        <title>{claim.statement}. True or False?</title>
        <meta name="description" content={claim.description} />
      </Head>
      <div
        className={`${
          darkModeActive ? "text-gray-300" : "text-fact-medium"
        } px-12 flex flex-row justify-center`}
      >
        <div className="max-w-5xl">
          <h1 className="mt-10 mb-6 text-2xl font-bold">Claim</h1>
          <div
            className={`${
              darkModeActive ? "bg-gray-800 text-gray-200" : "bg-white"
            } rounded-xl shadow-xl px-6 md:px-16 py-10 w-full`}
          >
            <div className="flex flex-row">
              <div className="w-9/12">
                <h2 className="text-xl">{claim.statement}</h2>
              </div>
              <div className="w-3/12 flex flex-row h-10 gap-4">
                <SourceButton
                  link={""}
                  onClick={() => setViewingSource(true)}
                />
                <Indicator validity={calculateTruthFactor(claim)} />
              </div>
            </div>
            <p className="mt-3">{claim.description}</p>
            {claim.images.length > 0 ? (
              <div className="basis-3/12 w-full flex flex-row h-56 md:h-72 gap-4 md:gap-8 mt-16">
                {claim.images.map((image) => (
                  <div key={`${image.id}-image`} className="flex-1 relative">
                    <Image
                      src={image.link}
                      alt={image.id.toString()}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {claim.comments.length >= 1 ? (
            <h1 className="mt-10 mb-6 text-2xl font-bold">Statements</h1>
          ) : null}
          <div className="text-fact-text-medium">
            {claim.comments.map((comment) => (
              <CommentCard key={`comment-${comment.id}`} comment={comment} />
            ))}
          </div>
        </div>
        <ModalWrapper
          isOpen={viewingSource}
          closeModal={() => setViewingSource(false)}
        >
          {isValidUrl(claim.source) ? (
            <Link href={claim.source}></Link>
          ) : (
            <p>Source: {claim.source}</p>
          )}
        </ModalWrapper>
      </div>
    </div>
  );
}

interface PathParamsClaim {
  params: { claim: string };
}

export async function getStaticPaths() {
  let res = await fetch(`${API}/claims`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  if (res.status == 200) {
    res = await res.json();
  }

  const paths = res["result"].map((claim: Claim): PathParamsClaim => {
    return { params: { claim: claim.id.toString() } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: PathParamsClaim) {
  let claim: Claim;

  let result = await fetch(`${API}/claims/view/${params.claim}`);
  if (result.status == 200) {
    claim = await result.json();
  }

  return {
    props: {
      claim: claim,
    },
  };
}
