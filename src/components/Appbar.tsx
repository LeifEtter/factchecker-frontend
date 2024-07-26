import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler, useContext } from "react";
import { UserContext } from "../state/user";
import { API } from "../assets/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface AppbarParams {
  path: string;
  user: User;
}

export const Appbar = ({ path, user }: AppbarParams) => {
  const { setUser } = useContext(UserContext);

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
      <div className="mt-5 flex justify-between">
        <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-5 py-2 px-3">
          <LinkButton path="/" title="Home" isActive={path == "/"} />
          {user ? (
            <LinkButton
              path="/submitted"
              title="Your Claims"
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
          className="fact-gradient font-medium text-white px-5 rounded-2xl special-shadow mr-5 flex items-center hover:scale-105 duration-200 ease-in-out"
        >
          Create Claim
        </Link>
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-md float-left gap-2 pl-4 pr-2 py-1 cursor-pointer">
          {user ? (
            <>
              <UserBar
                user={user}
                avatarClick={() => router.push("/profile")}
                logout={logout}
              ></UserBar>
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
      </div>
    </>
  );
};

type LinkButtonProps = {
  title: string;
  path: string;
  isActive: boolean;
  testId?: string;
  icon?: IconDefinition;
};

const LinkButton = ({
  title,
  path,
  isActive,
  testId = "",
  icon,
}: LinkButtonProps) => {
  return (
    <Link
      data-testid={testId}
      href={path}
      className="py-1 px-2 rounded-xl font-semibold hover:scale-105 duration-150 ease-in-out flex items-center"
      style={{
        backgroundColor: isActive ? "rgb(239, 237, 237)" : "rgba(0,0,0,0)",
        color: isActive ? "black" : "#535353",
      }}
    >
      {title}
      {icon != null ? (
        <FontAwesomeIcon className="ml-2" icon={icon} width={18} />
      ) : (
        <></>
      )}
    </Link>
  );
};

interface UserBarParams {
  user: User;
  avatarClick: MouseEventHandler;
  logout: MouseEventHandler;
}

const UserBar = ({ user, avatarClick, logout }: UserBarParams) => {
  return (
    <>
      <p>{user.name}</p>
      <div className="group relative w-10 h-10" onClick={avatarClick}>
        <Image
          src={user.avatar}
          priority
          alt={`avatar-image-appbar`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-full special-shadow"
        />
        <div className="absolute w-32 -ml-12 h-12" />
        <div className="absolute hidden group-hover:flex flex-col special-shadow bg-white mt-12 -ml-20 w-32 rounded-xl py-3 gap-3 [&>*]:duration-300 [&>*]:ease-in-out [&>*]:mx-4 [&>*]:rounded-md">
          <button className="hover:bg-blue-100 p-1" onClick={avatarClick}>
            Profile
          </button>
          <button className="hover:bg-blue-100 p-1" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
