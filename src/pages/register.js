import Head from "next/head";
import { useEffect, useState } from "react";

const isEmail = (email) => {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email !== "" && email.match(emailFormat) ? true : false;
};

const isPassword = (password) => {
  var passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return password !== "" && password.match(passwordFormat) ? true : false;
};

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

const InputField = ({ value, setValue, title, error, resetError, obscure }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="ml-1 font-semibold text-fact-text-medium">{title}</p>
      <input
        type={obscure ? "password" : "text"}
        value={value}
        onChange={(e) => {
          if (error != null) {
            resetError();
          }
          setValue(e.target.value);
        }}
        className="bg-white rounded-2xl focus:outline-1 outline-blue-400 py-2 px-4 special-shadow"
        style={{
          border: error != null ? "2px solid red" : "none",
        }}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};
