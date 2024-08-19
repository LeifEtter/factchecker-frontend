import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { faCaretRight, faShare } from "@fortawesome/free-solid-svg-icons";
import { SourceButton, TruthFactorLabel } from "../../components/Buttons";
import { API } from "../../assets/constants";
import { CommentCard } from "../../components/cards/CommentCard";
import { ModalWrapper } from "../../components/ModalWrapper";

interface ViewSingleClaimProps {
  claim: Claim;
}
/**
 * @returns Page containing single claim to be viewed in-depth as well as comments
 */
export default function ViewSingleClaim({ claim }: ViewSingleClaimProps) {
  const [truthValue, setTruthValue] = React.useState<null | number>(null);
  const [truthLabel, setTruthLabel] = React.useState<null | string>(null);

  useEffect(() => {
    console.log(claim.comments);
  }, []);
  const [viewingSource, setViewingSource] = React.useState<boolean>(false);

  const calculateTruthFactorFromComments = (comments: ClaimComment[]) => {
    if (comments.length == 0) {
      return null;
    }
    const truthValues: number[] = comments.map((comment) =>
      comment.result ? 100 : 0
    );

    const totalTruthPoints: number = truthValues.reduce((a, b) => a + b);
    return totalTruthPoints;
  };

  const gradients = {
    red: "from-fact-red-gr-1 to-fact-red-gr-2",
    green: "from-fact-green-gr-1 to-fact-green-gr-2",
  };

  useEffect(() => {
    const truthFactor: number = calculateTruthFactorFromComments(
      claim.comments
    );
    setTruthValue(truthFactor);

    if (truthFactor == null) {
      setTruthLabel("Undecided");
    } else if (truthFactor < 35) {
      setTruthLabel("False");
    } else if (truthFactor < 50) {
      setTruthLabel("Likely False");
    } else if (truthFactor < 90) {
      setTruthLabel("Likely True");
    } else {
      setTruthLabel("True");
    }
  }, [claim.comments]);

  return (
    <div className="px-12 flex flex-row justify-center">
      <div className="max-w-5xl">
        <h1 className="mt-10 mb-6 text-2xl font-bold">Claim</h1>
        <div className="bg-white rounded-xl shadow-xl px-6 md:px-16 py-10 w-full">
          <div className="flex flex-row">
            <div className="w-9/12">
              <h2 className="text-xl">{claim.statement}</h2>
            </div>
            <div className="w-3/12 flex flex-row h-8">
              <SourceButton link={""} onClick={() => setViewingSource(true)} />
              <TruthFactorLabel label={truthLabel} value={truthValue} />
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
        {claim.comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
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
