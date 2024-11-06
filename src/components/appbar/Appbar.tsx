import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../state/user";
import { API } from "../../assets/constants";
import { faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { LinkButton } from "./LinkButton";
import { UserBar } from "./UserBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserSettingsContext } from "../../state/settings";

interface AppbarParams {
  path: string;
  user: User;
}

/**
 * @param path - Path currently visited
 * @param user - User currently logged in
 *
 * @returns Appbar containing buttons to navigate to different pages, as well as some user info
 */
export const Appbar = ({ path, user }: AppbarParams) => {
  const { setUser } = useContext(UserContext);
  const { setDarkModeActive, darkModeActive } = useContext(UserSettingsContext);
  const router = useRouter();

  const logout = async () => {
    await fetch(`${API}/users/logout`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <div className=" flex justify-between">
        <div
          className={`flex justify-between ${
            darkModeActive ? "bg-gray-900 text-white" : "bg-white"
          } rounded-2xl shadow-md float-left gap-5 py-2 px-3`}
        >
          <LinkButton path="/" title="Home" isActive={path == "/"} />
          {user ? (
            <LinkButton
              path="/submitted"
              title="Submissions"
              isActive={path == "/submitted"}
            />
          ) : (
            <></>
          )}
          <LinkButton
            path="/scoreboard"
            title="Scoreboard"
            isActive={path == "/scoreboard"}
          />
          <LinkButton
            path="/explore"
            title="Explore"
            icon={faSearch}
            isActive={path == "/explore"}
          />
        </div>
        <div className="flex-1"></div>
        <Link
          data-testid={"create-claim-button"}
          href="/create-claim"
          className={`hidden md:flex ${
            darkModeActive
              ? "fact-gradient-dark text-white"
              : "fact-gradient-light text-green-900 font-extrabold"
          } transition-colors font-medium px-5 rounded-2xl special-shadow mr-5 items-center hover:scale-105 duration-200 ease-in-out`}
        >
          Create Claim
        </Link>
        <Link
          data-testid={"create-claim-button"}
          href="/create-claim"
          className="flex md:hidden fact-gradient font-medium px-5 rounded-2xl special-shadow mr-5 items-center hover:scale-105 duration-200 ease-in-out"
        >
          +
        </Link>
        <div
          className={`${
            darkModeActive ? "bg-gray-900 text-white" : "bg-white"
          } flex justify-between place-items-center rounded-2xl shadow-md float-left gap-2 pl-4 pr-2 py-1 cursor-pointer`}
        >
          {user ? (
            <>
              <UserBar
                viewStats={() => router.push(`/scores/${user.id}`)}
                user={user}
                avatarClick={() => router.push("/profile")}
                logout={logout}
                collapse={true}
              />
            </>
          ) : (
            <LinkButton
              testId="login-button"
              path="/login"
              title="Login/Register"
              isActive={path == "/login" || path == "/register"}
            />
          )}
        </div>
        <button
          onClick={() => setDarkModeActive(!darkModeActive)}
          className={`${
            darkModeActive
              ? "bg-gray-100 hover:bg-gray-300"
              : "bg-gray-700 hover:bg-gray-800"
          } hover:shadow-none rounded-xl w-12 h-12 flex items-center justify-center ml-4 shadow-xl cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={darkModeActive ? faSun : faMoon}
            className="text-yellow-500"
          />
        </button>
      </div>
    </>
  );
};
