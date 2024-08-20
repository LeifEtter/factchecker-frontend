import Image from "next/image";
import { MouseEventHandler, useEffect } from "react";
import DefaultAvatar from "../../../assets/default_avatar.jpg";
import { useRouter } from "next/router";

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
  return (
    <>
      {collapse ? (
        <p className="hidden md:block">{user.name}</p>
      ) : (
        <p>{user.name}</p>
      )}
      <div className="group relative w-10 h-10">
        <Image
          src={user.avatar ?? DefaultAvatar}
          priority
          alt={`avatar-image-appbar`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-full special-shadow"
        />
        <div className="absolute w-32 -ml-12 h-12" />
        <div className="absolute hidden group-hover:flex flex-col special-shadow bg-white mt-12 -ml-20 w-32 rounded-xl py-3 gap-3 [&>*]:duration-300 [&>*]:ease-in-out [&>*]:mx-4 [&>*]:rounded-md">
          <button
            className={`hover:bg-blue-100 p-1 ${
              router.pathname.includes("scores")
                ? "fact-gradient text-white"
                : ""
            }`}
            onClick={viewStats}
          >
            My Stats
          </button>
          <button
            className={`hover:bg-blue-100 p-1 ${
              router.pathname == "/profile" ? "fact-gradient text-white" : ""
            }`}
            onClick={avatarClick}
          >
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
