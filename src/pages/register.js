import { InputField } from "@/components/InputField";
import { CustomErrors } from "@/errors";
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
    const registerResult = await fetch("http://localhost:3005/users/register", {
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
      <Head></Head>
      <div className="flex flex-col items-center">
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
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
                type: "success",
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

const SnackBar = ({ snackbar, setSnackbar }) => {
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (snackbar != null) {
      if (snackbar.type == "error") {
        setColor("#FF5A5F");
      } else if (snackbar.type == "success") {
        setColor("#50C878");
      } else if (snackbar.type == "info") {
        setColor("#48cae4");
      }
      timeout();
    }
  }, [snackbar]);

  const timeout = async () => {
    await new Promise((res) => setTimeout(res, 5000));
    setSnackbar(null);
  };

  return (
    <div
      className="fixed bg-red-500 w-10/12 z-10 animate-bounce duration-200 rounded-2xl special-shadow flex flex-col items-center justify-center p-3"
      style={{
        top: snackbar != null ? "50px" : "-50px",
        backgroundColor: color,
      }}
    >
      <h2 className="font-semibold">{snackbar ? snackbar.title : ""}</h2>
      <p className="text-center">{snackbar ? snackbar.description : ""}</p>
    </div>
  );
};
