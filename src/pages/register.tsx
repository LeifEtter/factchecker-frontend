import { API } from "../assets/constants";
import { InputField } from "../components/InputField";
import { SnackBar, SnackbarType } from "../components/Snackbar";
import { CustomErrors } from "../types/errors";
import { isEmail, isPassword } from "../helpers/helpers";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);

  const [snackbar, setSnackbar] = useState(null);

  const validate = () => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    if (!isEmail(email)) {
      setEmailError("Please Enter a valid email");
      return false;
    }
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (!repeatPassword) {
      setRepeatPasswordError("Please Repeat your Password");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password needs to be a minimum of 8 characters");
      return false;
    } else if (!isPassword(password)) {
      setPasswordError(
        "Make sure Password contains at least one Uppercase and one Special character"
      );
      return false;
    } else if (repeatPassword != password) {
      setRepeatPasswordError("Repeat Password does not match Password");
      return false;
    }

    return true;
  };

  const attemptRegistration = async () => {
    const registerResult = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(registerResult);

    if (registerResult.status == 400) {
      const body = await registerResult.json();
      if (body.errorCode == CustomErrors.EmailAlreadyExists) {
        setEmailError("Email Does Already Exist");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        <div className="flex flex-col gap-2 w-80 mt-48">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5">
            Register
          </h1>
          <InputField
            testId={"name-field"}
            value={name}
            setValue={setName}
            title="Name"
            error={nameError}
            resetError={() => setNameError(null)}
          />
          <InputField
            testId={"email-field"}
            value={email}
            setValue={setEmail}
            title="Email"
            error={emailError}
            resetError={() => setEmailError(null)}
          />
          <InputField
            testId={"password-field"}
            value={password}
            setValue={setPassword}
            title="Password"
            error={passwordError}
            resetError={() => setPasswordError(null)}
            obscure
          />
          <InputField
            testId={"repeat-password-field"}
            value={repeatPassword}
            setValue={setRepeatPassword}
            title="Repeat Password"
            error={repeatPasswordError}
            resetError={() => setRepeatPasswordError(null)}
            obscure
          />
          <button
            data-testid={"submit-registration"}
            onClick={() => {
              if (!validate()) {
                return;
              }
              attemptRegistration();
            }}
            className="bg-white rounded-2xl special-shadow mt-6 p-2"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setSnackbar({
                title: "Registration Successfull!",
                description:
                  "You should have received an Email with a link to confirm your registration",
                type: SnackbarType.SUCCESS,
              });
            }}
          >
            Show popup
          </button>
        </div>
      </div>
    </>
  );
}
