import { InputField } from "@/components/InputField";
import { isEmail } from "@/helpers/helpers";
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
    }
    if (!password) {
      setPasswordError("Password is required");
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
              validate();
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
