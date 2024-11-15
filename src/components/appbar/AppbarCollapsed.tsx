import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { LinkButton } from "./LinkButton";
import { UserBar } from "./UserBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { API } from "../../assets/constants";
import { UserContext } from "../../state/user";

interface AppbarCollapsedParams {
  path: string;
  user: User;
}

/**
 * @param path - Path currently visited
 * @param user - User currently logged in
 *
 * @returns Collapsed version of Appbar, that opens through click on a Burger Menu
 */
export const AppbarCollapsed = ({ path, user }: AppbarCollapsedParams) => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const router = useRouter();

  const { setUser } = useContext(UserContext);

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
    <nav>
      <div className="flex flex-row justify-end">
        <p>
          <FontAwesomeIcon
            onClick={() => (menuOpen ? setMenuOpen(false) : setMenuOpen(true))}
            icon={faBars}
            scale={3}
            fontSize={"1.5em"}
          />
        </p>
      </div>
      <div
        className="animate ease-in-out duration-100 overflow-hidden p-2 flex flex-col gap-2"
        style={{
          height: menuOpen ? "295px" : "0px",
        }}
      >
        <div className="h-3"></div>
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
        {/* <LinkButton
          path="/explore"
          title="Explore"
          icon={faSearch}
          isActive={path == "/explore"}
        /> */}
        <Link
          data-testid={"create-claim-button"}
          href="/create-claim"
          className="flex fact-gradient font-medium text-white px-5 py-2 rounded-2xl special-shadow mr-5 items-center hover:scale-105 duration-200 ease-in-out"
        >
          Create Claim
        </Link>
        {user ? (
          <>
            {/* <p>{user.name}</p> */}
            <LinkButton
              path={`scores/${user.id}`}
              title="My Stats"
              isActive={path == `/scores/${user.id}`}
            />
            <LinkButton
              path="/profile"
              title="Profile"
              isActive={path == "/profile"}
            />
            <LinkButton title="Logout" isActive={false} path="/home" />
          </>
        ) : (
          <LinkButton
            title="Login/Register"
            path="login"
            isActive={path == "/register" || path == "/login"}
          />
        )}
      </div>
    </nav>
  );
};
