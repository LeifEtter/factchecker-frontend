import Image from "next/image";
import { MouseEventHandler, useContext, useEffect } from "react";
import DefaultAvatar from "../../../assets/default_avatar.jpg";
import { useRouter } from "next/router";
import { UserSettingsContext } from "../../state/settings";

interface UserBarParams {
  user: User;
  avatarClick: MouseEventHandler;
  viewStats: MouseEventHandler;
  logout: MouseEventHandler;
  collapse?: Boolean;
}
/**
 * @param user - User currently logged in
 * @param avatarClick - Callback function called on selecting to navigate to profile
 * @param viewStats - Callback function, called on selecting to navigate to Stats page
 * @param logout - Logout Callback
 * @param collapse - Boolean that tells user bar to hide name if screen is to small
 *
 * @returns Appbar Component showing the users name and profile image, and providing
 * extra navigation to user specific pages
 */
export const UserBar = ({
  user,
  avatarClick,
  viewStats,
  logout,
  collapse = false,
}: UserBarParams) => {
  const router = useRouter();
  const { darkModeActive } = useContext(UserSettingsContext);

  const hoverStyle = {
    lightMode: "bg-white hover:bg-blue-100",
    darkMode: "bg-gray-900 hover:bg-black",
  };

  return (
    <>
      {collapse ? (
        <p className="hidden md:block">{user.name}</p>
      ) : (
        <p>{user.name}</p>
      )}
      <nav className="group relative w-10 h-10">
        <Image
          src={user.avatar ?? DefaultAvatar}
          priority
          alt={`avatar-image-appbar`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-full special-shadow"
        />
        <div className="absolute w-32 -ml-12 h-12" />
        <div
          className={`${
            darkModeActive ? "bg-gray-900" : "bg-white"
          } absolute [&>button]:p-1 hidden group-hover:flex flex-col special-shadow mt-12 -ml-20 w-32 rounded-xl py-3 gap-3 [&>*]:duration-300 [&>*]:ease-in-out [&>*]:mx-4 [&>*]:rounded-md`}
        >
          <button
            className={`${
              darkModeActive ? hoverStyle["darkMode"] : hoverStyle["lightMode"]
            } ${
              router.pathname.includes("scores")
                ? darkModeActive
                  ? "fact-gradient-dark text-white"
                  : "fact-gradient"
                : ""
            }`}
            onClick={viewStats}
          >
            My Stats
          </button>
          <button
            className={`${
              darkModeActive ? hoverStyle["darkMode"] : hoverStyle["lightMode"]
            } ${
              router.pathname == "/profile"
                ? darkModeActive
                  ? "fact-gradient-dark text-white"
                  : "fact-gradient"
                : ""
            }`}
            onClick={avatarClick}
          >
            Profile
          </button>
          <button
            className={
              darkModeActive ? hoverStyle["darkMode"] : hoverStyle["lightMode"]
            }
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
};
