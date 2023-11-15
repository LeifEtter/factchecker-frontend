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
import {
  SnackBar,
  SnackbarDetails,
  SnackbarType,
} from "../../components/Snackbar";
import { API } from "../../assets/constants";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);
  const user = useUserDetails(id as string);
  const authenticated = useAuthentication();
  const [userLevel, setUserLevel] = useState<number>(null);
  const [userTitle, setUserTitle] = useState<string>(null);
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string>(null);
  const [messagePopupOpen, setMessagePopupOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarDetails>(null);
  const [expandClaims, setExpandClaims] = useState<boolean>(false);
  const [expandStatements, setExpandStatements] = useState<boolean>(false);

  const handleMessage = async () => {
    if (message == "") {
      setSnackbar({
        title: "Message Empty",
        description:
          "Please enter some words you want to send the user or close the popup.",
        type: SnackbarType.ERROR,
      });
    } else {
      const result = await fetch(`${API}/users/message/${id as string}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      if (result.status == 201) {
        setSnackbar({
          title: "Message Sent",
          description: "The User will now receive the message in their inbox!",
          type: SnackbarType.SUCCESS,
        });
        setMessage("");
        setMessagePopupOpen(false);
      } else {
        setSnackbar({
          title: "Couldn't send Message",
          description:
            "Something went wrong during the sending of the message, please try again later.",
          type: SnackbarType.ERROR,
        });
      }
    }
  };

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
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
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
      <div className="flex flex-row">
        <h1>Claims</h1>
        {expandClaims ? (
          <button onClick={() => setExpandClaims(false)}>Hide</button>
        ) : (
          <button onClick={() => setExpandClaims(true)}>Show All</button>
        )}
      </div>
      <div data-testid="claim-list">
        {scoreData.claimsCreated
          .slice(0, expandClaims ? -1 : 3)
          .map((claim) => (
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
        <button
          onClick={() => handleMessage()}
          className="fact-gradient text-white font-semibold special-shadow rounded-2xl px-4 py-2 mt-3 "
        >
          Send Message
        </button>
      </ModalWrapper>
      <button onClick={() => setMessagePopupOpen(true)}>Send Message</button>
    </>
  );
}
