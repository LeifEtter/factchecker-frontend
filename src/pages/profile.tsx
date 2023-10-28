import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../state/user";

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const chooseNewProfilePic = () => {};

  useEffect(() => {
    fetch(`http://localhost:3005/users/${user.id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-82 mt-36">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5">
            Profile
          </h1>
          <div className="relative h-56 w-56">
            <Image
              src="https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c"
              priority
              alt={`avatar-image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute object-cover rounded-full special-shadow"
            />
            <div
              className="cursor-pointer opacity-0 hover:opacity-30 ease-in-out duration-200 absolute border rounded-full bg-white h-56 w-56 flex justify-center items-center"
              onClick={chooseNewProfilePic}
            >
              <FontAwesomeIcon icon={faEdit} className="w-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
