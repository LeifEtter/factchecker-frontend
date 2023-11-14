import { useContext } from "react";
import { useScoreData } from "../../hooks/useScoreData";
import { UserContext } from "../../state/user";
import { useRouter } from "next/router";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);

  if (scoreData == null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1></h1>
      <p>{scoreData.claimsCreated.length}</p>
    </>
  );
}
