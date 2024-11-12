import { useContext, useEffect, useState } from "react";
import { useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
  sendMessage,
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
import { ShowAllToggler } from "../../components/ShowAllToggler";
import { SmallClaimCardWithImage } from "../../components/cards/SmallClaimCardWithImage";
import { PLACEHOLDER_DATE } from "../../assets/constants";
import { SmallClaimCardWithoutImage } from "../../components/cards/SmallClaimCardWithoutImage";
import { ClaimCardHighlightedComment } from "../../components/cards/ClaimCardHighlightedComment";
import DefaultAvatar from "../../../assets/default_avatar.jpg";
import { UserSettingsContext } from "../../state/settings";

/**
 * @returns Page containing specific users details, scores and contributions
 */
export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const { darkModeActive } = useContext(UserSettingsContext);
  const [scoreDataIsLoading, scoreData] = useScoreData(id as string);
  const [userIsLoading, user] = useUserDetails(id as string);
  const [authIsLoading, isAuthenticated] = useAuthentication();
  const [userLevel, setUserLevel] = useState<number>(null);
  const [userTitle, setUserTitle] = useState<string>(null);
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string>(null);
  const [messagePopupOpen, setMessagePopupOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarDetails>(null);
  const [expandClaims, setExpandClaims] = useState<boolean>(false);
  const [expandStatements, setExpandStatements] = useState<boolean>(false);

  const handleMessageSending = async (message: string) => {
    if (!message) {
      setSnackbar({
        title: "Message Empty",
        description:
          "Please enter some words you want to send the user or close the popup.",
        type: SnackbarType.ERROR,
      });
    } else {
      const sendResult: boolean = await sendMessage({
        message: message,
        receiverId: id as string,
      });
      if (sendResult) {
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

  const calculateTruthFactor = (claim: Claim) => {
    if (claim.vote_false == 0 && claim.vote_true == 0) {
      return null;
    }
    const outcome =
      (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
    return outcome;
  };

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
    if (!scoreDataIsLoading && isAuthenticated) {
      const level = calculateLevelFromScoreData(scoreData);
      setUserLevel(level);
      const userTitle = determineUserTitleFromLevel(level);
      setUserTitle(userTitle);
    }
  }, [isAuthenticated, scoreDataIsLoading, router, scoreData]);

  if (
    !isAuthenticated ||
    authIsLoading ||
    scoreDataIsLoading ||
    userIsLoading
  ) {
    return <p>Loading</p>;
  }

  return (
    <div
      className={`${
        darkModeActive ? "text-gray-200" : "text-fact-text-medium"
      } flex flex-col items-center`}
    >
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <h1
        data-testid="user-title"
        className="text-2xl font-semibold mt-16 mb-6"
      >
        {userTitle}
      </h1>
      <div className="w-72">
        <ScoreBar scoreData={scoreData} userLevel={userLevel} />
        <div className="flex flex-row gap-5 mt-6">
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <h1 data-testid="user-name" className="text-md font-semibold">
                {user.name}
              </h1>
            </div>
            <p
              className={`${
                darkModeActive ? "text-gray-400" : "text-gray-400"
              } font-medium text-xs`}
            >
              {PLACEHOLDER_DATE}
            </p>
            <button
              data-testid="send-message-button"
              onClick={() => setMessagePopupOpen(true)}
              className={`${
                darkModeActive ? "bg-gray-800" : "bg-white"
              } rounded-xl special-shadow py-1 text-sm font-medium mt-2`}
            >
              Send a DM
            </button>
          </div>

          <div className="flex-1 relative w-32 h-32 rounded-3xl">
            <Image
              src={user.avatar ?? DefaultAvatar}
              alt="user-profile-image"
              data-testid="user-profile-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-3xl special-shadow"
              priority
            />
          </div>
        </div>
        <p data-testid="user-biography" className="font-medium text-sm mt-3">
          {user.biography}
        </p>
      </div>

      <div className="flex flex-row gap-5 mt-12 w-full max-w-4xl mb-3 px-2">
        <h1 className="font-bold text-lg">{user.name.split(" ")[0]}s Claims</h1>
        <ShowAllToggler
          setShowingAll={setExpandClaims}
          showingAll={expandClaims}
        />
      </div>
      <div
        data-testid="claim-list"
        className="flex gap-5 flex-wrap max-w-4xl mx-2"
      >
        {scoreData.claimsCreated.map((claim) =>
          claim.images.length > 0 ? (
            <SmallClaimCardWithImage
              claim={claim}
              width="280px"
              key={claim.id}
              onClick={() => {}}
              truthValue={calculateTruthFactor(claim)}
            />
          ) : (
            <SmallClaimCardWithoutImage
              claim={claim}
              width="280px"
              key={claim.id}
              onClick={() => {}}
              truthValue={calculateTruthFactor(claim)}
            />
          )
        )}
      </div>
      <div className="flex flex-row gap-5 mt-12 w-full max-w-4xl mb-3 px-2">
        <h1 className="font-bold text-lg">
          {user.name.split(" ")[0]}s Comments
        </h1>
        <ShowAllToggler
          setShowingAll={setExpandClaims}
          showingAll={expandClaims}
        />
      </div>
      <div
        data-testid="comment-list"
        className="flex gap-5 flex-wrap max-w-4xl mx-2"
      >
        {scoreData.commentsCreated.map((comment) => (
          <ClaimCardHighlightedComment
            claim={comment.claim}
            key={comment.id}
            onClick={() => {}}
            truthValue={calculateTruthFactor(comment.claim)}
          />
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
          bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
        />
        <p className="text-red-500 font-semibold">{messageError}</p>
        <button
          onClick={() => handleMessageSending(message)}
          className="fact-gradient text-white font-semibold special-shadow rounded-2xl px-4 py-2 mt-3 "
        >
          Send Message
        </button>
      </ModalWrapper>
    </div>
  );
}
