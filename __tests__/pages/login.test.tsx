// import { render, screen } from "@testing-library/react";
// import Login from "../../src/pages/login";
// import { UserContext } from "../../src/state/user";
// import userEvent from "@testing-library/user-event";
// import { describe, it, expect } from "vitest";

// describe("testing functionality", () => {
//   it("should test login page functionality", async () => {
//     const user = null;
//     const setUser = () => {};
//     render(
//       <UserContext.Provider value={{ user, setUser }}>
//         <Login />
//       </UserContext.Provider>
//     );

//     const emailInput = screen.getByTestId("email-field");
//     const passwordInput = screen.getByTestId("password-field");
//     const loginButton = screen.getByTestId("submit-login");
//     const emailError = screen.getByTestId("email-field-error");

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();

//     await userEvent.type(emailInput, "username");
//     await userEvent.type(passwordInput, "badPassword");
//     await userEvent.click(loginButton);

//     expect(emailError).toHaveTextContent("Please Enter a valid email");
//   });
// });
