interface ViewSingleClaimProps {
  claim: Claim;
}

export default function ViewSingleClaim({ claim }: ViewSingleClaimProps) {
  return <div>{claim.statement}</div>;
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
