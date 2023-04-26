import { InputField } from "@/components/InputField";
import { isEmail, isPassword } from "@/helpers/helpers";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);

  const validate = () => {
    if (!name) {
      setNameError("Name is required");
    }
    if (!isEmail(email)) {
      setEmailError("Please Enter a valid email");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!repeatPassword) {
      setRepeatPasswordError("Please Repeat your Password");
    }

    if (name && email && password && repeatPassword) {
      if (password.length < 8) {
        setPasswordError("Password needs to be a minimum of 8 characters");
      } else if (!isPassword(password)) {
        setPasswordError(
          "Make sure Password contains at least one Uppercase and one Special character"
        );
      } else if (repeatPassword != password) {
        setRepeatPasswordError("Repeat Password does not match Password");
      }
    }
  };

  return (
    <>
      <Head></Head>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-80 mt-60">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5">
            Register
          </h1>
          <InputField
            value={name}
            setValue={setName}
            title="Name"
            error={nameError}
            resetError={() => setNameError(null)}
          />
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
          <InputField
            value={repeatPassword}
            setValue={setRepeatPassword}
            title="Repeat Password"
            error={repeatPasswordError}
            resetError={() => setRepeatPasswordError(null)}
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
