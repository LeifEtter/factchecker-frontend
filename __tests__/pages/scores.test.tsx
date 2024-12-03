// import { render, screen } from "@testing-library/react";
// import Scores from "pages/scores/[id]";
// import { ScoreData } from "hooks/useScoreData";
// import userEvent from "@testing-library/user-event";
// import { mockScoreData } from "mocks/scoreData";
// import { lorem } from "mocks/lorem";
// import { mockClaims } from "mocks/claims";
// import { describe, it, expect } from "vitest";
// import { vi } from "vitest";

// vi.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: vi.fn(),
//       pathname: vi.fn(),
//       query: "5",
//     };
//   },
// }));

// vi.mock("../../hooks/useScoreData", () => ({
//   useScoreData: (): [boolean, ScoreData] => [false, mockScoreData],
// }));

// const mockUser: User = {
//   id: 10,
//   name: "Leif Etter",
//   avatar:
//     "https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c",
//   biography: lorem.generateWords(20),
// };

// vi.mock("../../hooks/useAuthentication", () => ({
//   useAuthentication: (): [boolean, boolean] => [false, true],
// }));

// vi.mock("../../hooks/useUserDetails", () => ({
//   useUserDetails: (): [boolean, User] => [false, mockUser],
// }));

// vi.mock("../../utils/scores", () => ({
//   sendMessage: () => true,
// }));

// vi.mock("../../utils/scores", () => ({
//   calculateLevelFromScoreData: () => 100,
//   determineUserTitleFromLevel: () => "Beacon of Truth",
// }));

// describe("should test the scores page", () => {
//   const CORRECT_LEVEL: number = 100;

//   it("should test the basic page setup", () => {
//     render(<Scores />);
//     const claimList = screen.getByTestId("claim-list");
//     expect(claimList).toBeInTheDocument();
//     expect(claimList.children).toHaveLength(3);

//     const userLevel = screen.getByTestId("indicator-user-level");
//     expect(userLevel).toBeInTheDocument();
//     expect(userLevel).toHaveTextContent(CORRECT_LEVEL.toString());

//     const userTitle = screen.getByTestId("user-title");
//     expect(userTitle).toBeInTheDocument();
//     expect(userTitle).toHaveTextContent("Beacon of Truth");

//     const userName = screen.getByTestId("user-name");
//     expect(userName).toHaveTextContent("Leif Etter");
//   });

//   it("should test the user flow for sending a message to the user being viewed", async () => {
//     render(<Scores />);
//     const sendMessageButton = screen.getByTestId("send-message-button");
//     await userEvent.click(sendMessageButton);
//     const modalWrapper = screen.getByTestId("modal-wrapper");
//     expect(modalWrapper).toHaveStyle("top: 0px;");
//   });

//   it("should test if clicking show all actually toggles between showing three and all claims", async () => {
//     render(<Scores />);
//     const showAllButton = screen.getByTestId("show-toggler-claims");
//     await userEvent.click(showAllButton);
//     const claimList = screen.getByTestId("claim-list");
//     expect(claimList.children).toHaveLength(mockClaims.length);
//     await userEvent.click(showAllButton);
//     expect(claimList.children).toHaveLength(3);
//   });
// });
