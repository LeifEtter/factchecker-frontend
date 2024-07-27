import Image from "next/image";
import { MouseEventHandler } from "react";

interface UserBarParams {
  user: User;
  avatarClick: MouseEventHandler;
  logout: MouseEventHandler;
  collapse?: Boolean;
}

export const UserBar = ({
  user,
  avatarClick,
  logout,
  collapse = false,
}: UserBarParams) => {
  return (
    <>
      {collapse ? (
        <p className="hidden md:block">{user.name}</p>
      ) : (
        <p>{user.name}</p>
      )}
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
