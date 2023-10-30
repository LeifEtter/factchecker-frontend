import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler, useContext } from "react";
import { UserContext } from "../state/user";

interface AppbarParams {
  path: string;
  user: User;
}

export const Appbar = ({ path, user }: AppbarParams) => {
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      <div className="mt-5 flex justify-between">
        <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-5 py-2 px-3">
          <LinkButton path="/" title="Home" isActive={path == "/"} />
          <LinkButton path="/new" title="New" isActive={path == "/new"} />
          <LinkButton
            path="/requests"
            title="Requests"
            isActive={path == "/requests"}
          />
        </div>
        <div className="flex-1"></div>
        <Link
          data-testid={"create-claim-button"}
          href="/create-claim"
          className="fact-gradient font-medium text-white px-5 rounded-2xl special-shadow mr-5 flex items-center"
        >
          Create Claim
        </Link>
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-md float-left gap-4 px-2 py-1">
          {user ? (
            <>
              <UserBar
                user={user}
                avatarClick={() => router.push("/profile")}
                logout={() => {
                  sessionStorage.removeItem("user");
                  setUser(null);

                  document.cookie =
                    "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }}
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
};

const LinkButton = ({
  title,
  path,
  isActive,
  testId = "",
}: LinkButtonProps) => {
  return (
    <Link
      data-testid={testId}
      href={path}
      className="py-1 px-2 rounded-xl font-semibold"
      style={{
        backgroundColor: isActive ? "rgb(239, 237, 237)" : "rgba(0,0,0,0)",
        color: isActive ? "black" : "#535353",
      }}
    >
      {title}
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
      <button className="relative w-10 h-10" onClick={avatarClick}>
        <div className="group">
          <Image
            src={user.avatar}
            priority
            alt={`avatar-image-appbar`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-full special-shadow"
          />
          <div className="absolute w-32 -ml-12 h-12" />
          <div className="absolute flex group-hover:flex flex-col special-shadow bg-white mt-8 -ml-20 w-32 rounded-xl py-3 gap-3 [&>*]:duration-300 [&>*]:ease-in-out [&>*]:mx-4 [&>*]:rounded-md">
            <button className="hover:bg-blue-100" onClick={avatarClick}>
              Profile
            </button>
            <button className="hover:bg-blue-100" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      </button>
    </>
  );
};
