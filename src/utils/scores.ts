import { API } from "../assets/constants";
import { ScoreData } from "../hooks/useScoreData";

/**
 * Calculates a Level representing total contributions
 *
 * @param scoreData - Object containing users contributions, up- and downvotes
 *
 * @returns number containing level
 */
export const calculateLevelFromScoreData = (scoreData: ScoreData): number => {
  return (
    scoreData.claimsCreated.length * 2 +
    scoreData.commentsCreated.length * 5 +
    scoreData.upvotesReceived * 10 -
    scoreData.downvotesReceived * 10
  );
};

/**
 * Takes level and produces an appropriate label
 *
 * @param level - Level Representing total Contributions
 *
 * @returns Text Label representing user level
 */
export const determineUserTitleFromLevel = (level: number): string => {
  if (level < 10) {
    return "Fact Seeker";
  } else if (level < 50) {
    return "Trusted Member";
  } else if (level < 100) {
    return "Verification Boss";
  } else {
    return "Beacon of Truth";
  }
};

interface SendMessageProps {
  message: string;
  receiverId: string;
}

/**
 * Facilitates messaging another user
 *
 * @param message - Message to a specific user
 * @param receiverId - Id of user to receive messsage
 *
 * @returns Boolean wether sending of message was successful
 */
export const sendMessage = async ({
  message,
  receiverId,
}: SendMessageProps): Promise<boolean> => {
  const result = await fetch(`${API}/users/message/${receiverId}`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });
  if (result.status == 200 || result.status == 201) {
    return true;
  } else {
    console.error(await result.json());
    return false;
  }
};
