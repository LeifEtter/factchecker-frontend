import { useEffect, useState } from "react";
import { useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "../../utils/scores";
import { useUserDetails } from "../../hooks/useUserDetails";
import Image from "next/image";
import { ScoreBar } from "../../components/ScoreBar";
import { useAuthentication } from "../../hooks/useAuthentication";
import { InputFieldMultiline } from "../../components/InputField";
import { ModalWrapper } from "../../components/ModalWrapper";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);
  const user = useUserDetails(id as string);
  const authenticated = useAuthentication();
  const [userLevel, setUserLevel] = useState(null);
  const [userTitle, setUserTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [messagePopupOpen, setMessagePopupOpen] = useState(false);

  useEffect(() => {
    if (authenticated == false) {
      router.push("/login");
    }
    if (scoreData != null && authenticated == true) {
      const level = calculateLevelFromScoreData(scoreData);
      setUserLevel(level);
      const userTitle = determineUserTitleFromLevel(level);
      setUserTitle(userTitle);
    }
  }, [scoreData]);

  if (
    scoreData == null ||
    user == null ||
    userLevel == null ||
    userTitle == null
  ) {
    return <p>Loading</p>;
  }

  return (
    <>
      <ScoreBar scoreData={scoreData} userLevel={userLevel} />
      <h1 data-testid="user-title">{userTitle}</h1>
      <h1 data-testid="user-name">{user.name}</h1>
      <div className="relative w-10 h-10">
        <Image
          src={user.avatar}
          alt="user-profile-image"
          data-testid="user-profile-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <p data-testid="user-biography">{user.biography}</p>
      <h1>Claims</h1>
      <div data-testid="claim-list">
        {scoreData.claimsCreated.map((claim) => (
          <div key={`claim-${claim.id}`}>
            <h2>{claim.statement}</h2>
          </div>
        ))}
      </div>
      <ModalWrapper
        isOpen={messagePopupOpen}
        closeModal={() => setMessagePopupOpen(false)}
      >
        <InputFieldMultiline
          testId="message-input"
          value={message}
          setValue={setMessage}
          title="Message"
          error={messageError}
          resetError={() => setMessageError(null)}
        />
        <p className="text-red-500 font-semibold">{messageError}</p>
        <button className="fact-gradient text-white font-semibold special-shadow rounded-2xl px-4 py-2 mt-3 ">
          Send Message
        </button>
      </ModalWrapper>
      <button onClick={() => setMessagePopupOpen(true)}>Send Message</button>
    </>
  );
}
