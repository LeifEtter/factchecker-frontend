import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../state/user";

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [editingPopupOpen, setEditingPopupOpen] = useState<boolean>(false);

  const chooseNewProfilePic = () => {};

  useEffect(() => {
    if (user) {
      console.log(user);
      fetch(`http://localhost:3005/users/${user.id}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  }, [user]);

  return !user ? (
    <></>
  ) : (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-82 mt-20">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5">
            Your Profile
          </h1>
          <div className="relative h-56 w-56">
            <Image
              src="https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c"
              priority
              alt={`avatar-image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute object-cover rounded-4xl special-shadow"
            />
            <div
              className="cursor-pointer opacity-0 hover:opacity-30 ease-in-out duration-200 absolute border rounded-3xl bg-white h-56 w-56 flex justify-center items-center"
              onClick={chooseNewProfilePic}
            >
              <FontAwesomeIcon icon={faEdit} className="w-10" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-10">{user.name}</h2>
        <p className="text-md font-medium mt-6 max-w-sm text-center">
          {user.biography}
        </p>
        <button
          onClick={() => {
            setEditingPopupOpen(true);
          }}
          className="bg-white py-3 rounded-3xl special-shadow mt-10 text-lg font-medium w-60 hover:scale-105"
        >
          Edit Biography
        </button>
        <button className="bg-white py-3 rounded-3xl special-shadow mt-4 text-lg font-medium w-60 hover:scale-105">
          Change Password
        </button>
      </div>
      <button onClick={() => setEditingPopupOpen(true)}>Set Display</button>
      <div
        onClick={() => setEditingPopupOpen(false)}
        className="absolute duration-200 ease-in-out w-full h-full backdrop-blur-sm bg-opacity-10 flex items-center justify-center"
        style={{
          opacity: editingPopupOpen ? "100%" : "0%",
          top: editingPopupOpen ? "0px" : "-100%",
        }}
      >
        <EditingPopup
          title={"Edit Biography"}
          value={user.biography}
          isTextField={true}
          setEditingPopupOpen={setEditingPopupOpen}
        />
      </div>
    </>
  );
};

interface EditingPopupProps {
  title: string;
  value: string;
  isTextField: boolean;
  setEditingPopupOpen: Function;
}

const EditingPopup = ({
  title,
  value,
  isTextField,
  setEditingPopupOpen,
}: EditingPopupProps) => {
  return (
    <div
      className="bg-white special-shadow w-6/12 flex-col p-5 rounded-2xl z-20"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{title}</h2>
      {isTextField ? (
        <textarea
          className="border w-full p-2"
          name="biography"
          rows={3}
          value={value}
        />
      ) : (
        <input value={value} />
      )}
      <button>Save</button>
    </div>
  );
};

export default Profile;
