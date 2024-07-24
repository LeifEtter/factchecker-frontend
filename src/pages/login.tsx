import { InputField } from "../components/InputField";
import { CustomErrors } from "../types/errors";
import { isEmail } from "../helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../state/user";
import { API } from "../assets/constants";
import { SnackBar, SnackbarType } from "../components/Snackbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const { setUser } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState(null);

  const router = useRouter();

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
    const loginResult = await fetch(`${API}/users/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const body = await loginResult.json();
    if (loginResult.status != 200) {
      if (body.errorCode == CustomErrors.EmailNotExist) {
        setEmailError("Email Does Not Exist");
      } else if (
        body.errorCode == CustomErrors.InvalidPassword ||
        body.errorCode == CustomErrors.InvalidInput
      ) {
        setPasswordError("Password Does Not Match");
      }
    } else {
      sessionStorage.setItem("user", JSON.stringify(body.user));
      setUser(body.user);
      router.push("/");
    }
  };

  useEffect(() => {
    let query: Object = router.query;
    if (query.hasOwnProperty("popup")) {
      setSnackbar({
        title: "Registration Successfull!",
        description:
          "You should have received an Email with a link to confirm your registration",
        type: SnackbarType.SUCCESS,
      });
    }
    if (
      process.env.NEXT_PUBLIC_TESTING_EMAIL &&
      process.env.NEXT_PUBLIC_TESTING_PASSWORD
    ) {
      setEmail(process.env.NEXT_PUBLIC_TESTING_EMAIL);
      setPassword(process.env.NEXT_PUBLIC_TESTING_PASSWORD);
    }
  }, [router.query, router.isReady]);

  return (
    <>
      <div className="flex flex-col items-center">
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        <div className="flex flex-col gap-2 w-80 mt-48">
          <h1
            className="font-bold text-2xl text-fact-text-medium text-center mb-5"
            data-testid="login-title"
          >
            Login
          </h1>
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
          <button
            data-testid={"submit-login"}
            onClick={() => {
              const validateResult = validate();
              if (validateResult) {
                attemptLogin();
              }
            }}
            className="bg-white rounded-2xl special-shadow mt-6 p-2 transition-all duration-500 bg-gradient-to-t to-white via-fact-gradient-color-1 from-fact-gradient-color-2 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:text-white"
          >
            Submit
          </button>
          <Link
            data-testid="switch-to-register"
            href="/register"
            className="mt-5 text-center"
          >
            No Account? Register
          </Link>
        </div>
      </div>
    </>
  );
}
