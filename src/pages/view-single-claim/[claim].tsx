import Image from "next/image";

interface ViewSingleClaimProps {
  claim: Claim;
}

export default function ViewSingleClaim({ claim }: ViewSingleClaimProps) {
  return (
    <div>
      <h1 className="mt-10 mb-3">Claim</h1>
      <div className="bg-white rounded-xl w-11/12 shadow-lg px-20 py-10">
        <h2>{claim.statement}</h2>
        <p>{claim.description}</p>
        <div className="basis-3/12 w-full flex flex-row h-72 gap-8 mt-16">
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
      </div>
      <h1 className="mt-16">Statements</h1>
      {claim.comments.map((comment) => (
        <div
          className="mt-5 w-full rounded-2xl p-5 bg-white shadow-lg"
          style={{ backgroundColor: comment.result ? "green" : "red" }}
          key={`comment-${comment.id}`}
        >
          {comment.statement}
        </div>
      ))}
    </div>
  );
}

interface PathParamsClaim {
  params: { claim: string };
}

export async function getStaticPaths() {
  let res = await fetch(`http://localhost:3005/claims/`, { method: "GET" });
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

  let result = await fetch(`http://localhost:3005/claims/view/${params.claim}`);
  if (result.status == 200) {
    claim = await result.json();
  }

  return {
    props: {
      claim: claim,
    },
  };
}
