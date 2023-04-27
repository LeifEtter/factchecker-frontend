import { InputField } from "@/components/InputField";
import { CustomErrors } from "@/errors";
import { isEmail } from "@/helpers/helpers";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const validate = () => {
    if (!isEmail(email)) {
      setEmailError("Please Enter a valid email");
      return false;
    }
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    return true;
  };

  const attemptLogin = async () => {
    const loginResult = await fetch("http://localhost:3005/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const body = await loginResult.json();

    if (loginResult.status == 400) {
      if (body.errorCode == CustomErrors.EmailNotExist) {
        setEmailError("Email Does Not Exist");
      } else if (body.errorCode == CustomErrors.InvalidPassword) {
        setPasswordError("Password Does Not Match");
      }
    } else {
      Cookies.set("auth_token", body.token);
    }
  };

  return (
    <>
      <Head></Head>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-80 mt-60">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5">
            Login
          </h1>
          <InputField
            value={email}
            setValue={setEmail}
            title="Email"
            error={emailError}
            resetError={() => setEmailError(null)}
          />
          <InputField
            value={password}
            setValue={setPassword}
            title="Password"
            error={passwordError}
            resetError={() => setPasswordError(null)}
            obscure
          />
          <button
            onClick={() => {
              const validateResult = validate();
              if (validateResult) {
                attemptLogin();
              }
            }}
            className="bg-white rounded-2xl special-shadow mt-6 p-2"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
