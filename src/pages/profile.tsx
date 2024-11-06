import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../state/user";
import { API } from "../assets/constants";
import { ImageChooser } from "../components/ImageChooser";
import DefaultAvatar from "../../assets/default_avatar.jpg";
import { SnackBar, SnackbarType } from "../components/Snackbar";
import { UserSettingsContext } from "../state/settings";

/**
 * @returns Screen containing the logged in users profile information as well as
 * the functionality to change avatar, biography, password
 */
const Profile: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { darkModeActive } = useContext(UserSettingsContext);

  const [newBiography, setNewBiography] = useState<string>(null);
  const [newPassword, setNewPassword] = useState<string>(null);

  const [editingPopupProps, setEditingPopupProps] =
    useState<EditingPopupProps>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageChooserData, setImageChooserData] = useState<ClaimImageFile>({
    id: null,
    file: null,
    source: null,
  });

  const [snackbar, setSnackbar] = useState(null);

  const saveChanges = async () => {
    if (imageChooserData.file != null) {
      uploadAvatar();
    }
    const result = await fetch(`${API}/users/profile/update`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        biography: newBiography,
      }),
    });
    setSnackbar({
      title: "Profile Updated!",
      description:
        "You should have received an Email with a link to confirm your registration",
      type: SnackbarType.SUCCESS,
    });
  };

  const uploadAvatar = async () => {
    const form = new FormData();
    form.append("avatar", imageChooserData.file);
    const uploadResult = await fetch(`${API}/users/profile/avatar`, {
      method: "PATCH",
      credentials: "include",
      mode: "cors",
      body: form,
    });
  };

  // useEffect(() => {
  //   if (user) {
  //     fetch(`${API}/users/profile/${user.id}`, {
  //       method: "GET",
  //       mode: "cors",
  //       credentials: "include",
  //     }).then((res) => res.json());
  //   }
  // }, [user]);

  return !user ? (
    <></>
  ) : (
    <>
      <div
        className={`${
          darkModeActive ? "text-gray-200" : "text-fact-text-medium"
        } flex flex-col items-center`}
      >
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        <div className="flex flex-col gap-2 w-82 mt-20">
          <h1 className="font-bold text-2xl text-center mb-5">Your Profile</h1>
          <div
            className="relative h-56 w-56"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Image
              src={
                imageChooserData.file != null
                  ? window.URL.createObjectURL(imageChooserData.file)
                  : user.avatar ?? DefaultAvatar
              }
              priority
              alt={`avatar-image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute object-cover rounded-4xl special-shadow"
            />
            <div className="cursor-pointer opacity-0 hover:opacity-30 ease-in-out duration-200 absolute border rounded-3xl bg-white h-56 w-56 flex justify-center items-center">
              <FontAwesomeIcon icon={faEdit} className="w-10" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-10">{user.name}</h2>
        <p className="text-md font-medium mt-6 max-w-sm text-center">
          {newBiography ?? user.biography}
        </p>
        <button
          onClick={() => {
            setEditingPopupProps({
              title: "Edit Biography",
              value: user.biography,
              onSubmit: (value: string) => {
                console.log(value);
                setEditingPopupProps(null);
                setNewBiography(value);
              },
              isTextField: true,
              cancel: () => setEditingPopupProps(null),
              bgColor: darkModeActive ? "bg-gray-800" : "bg-white",
              textColor: darkModeActive ? "text-gray-300" : "text-fact-medium",
            });
          }}
          className={`${
            darkModeActive ? "bg-gray-800" : "bg-white"
          } py-3 rounded-3xl special-shadow mt-10 text-lg font-medium w-60 hover:scale-105`}
        >
          Edit Biography
        </button>
        <button
          onClick={() => {
            setEditingPopupProps({
              title: "Edit Password",
              value: "",
              onSubmit: (value: string) => {
                setEditingPopupProps(null);
                setNewPassword(value);
              },
              isTextField: false,
              cancel: () => setEditingPopupProps(null),
              bgColor: darkModeActive ? "bg-gray-800" : "bg-white",
              textColor: darkModeActive ? "text-gray-300" : "text-fact-medium",
            });
          }}
          className={`${
            darkModeActive ? "bg-gray-800" : "bg-white"
          } py-3 rounded-3xl special-shadow mt-4 text-lg font-medium w-60 hover:scale-105`}
        >
          Change Password
        </button>
        <button
          onClick={saveChanges}
          className={`${
            darkModeActive ? "fact-gradient-dark" : "fact-gradient"
          } text-white py-3 rounded-3xl special-shadow mt-4 text-lg font-medium w-60 hover:scale-105`}
        >
          Save Changes
        </button>
      </div>

      <div
        onClick={() => setEditingPopupProps(null)}
        className="absolute duration-200 ease-in-out w-full h-full backdrop-blur-sm bg-opacity-10 flex items-center justify-center"
        style={{
          opacity: editingPopupProps != null ? "100%" : "0%",
          top: editingPopupProps != null ? "0px" : "-100%",
        }}
      >
        <EditingPopup {...editingPopupProps} />
      </div>
      <ImageChooser
        showModal={showModal}
        imageChooserData={imageChooserData}
        setImageChooserData={setImageChooserData}
        saveImage={() => {
          setShowModal(false);
        }}
        resetImageChooser={() => {
          setImageChooserData({ id: null, file: null, source: null });
          setShowModal(false);
        }}
        bgColor={darkModeActive ? "bg-gray-800" : "bg-white"}
        fieldsBgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
        textColor={darkModeActive ? "text-gray-300" : "text-fact-medium"}
      />
    </>
  );
};

interface EditingPopupProps {
  title: string;
  value?: string;
  isTextField: boolean;
  onSubmit: Function;
  cancel: Function;
  bgColor: string;
  textColor: string;
}

const EditingPopup = ({
  title,
  value = "",
  isTextField,
  onSubmit,
  cancel,
  bgColor,
  textColor,
}) => {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <div
      className={`${bgColor} special-shadow w10/12 md:w-6/12 flex-col p-5 rounded-2xl z-20`}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className={`${textColor} text-lg font-medium mb-3`}>{title}</h2>
      {isTextField ? (
        <textarea
          className="border-2 rounded-md w-full p-2"
          name="biography"
          rows={3}
          defaultValue={value ?? ""}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      ) : (
        <input
          onChange={(e) => setCurrentValue(e.target.value)}
          defaultValue={value}
          className="p-1 border w-full"
        />
      )}
      <button
        className="mt-3 border fact-gradient rounded-xl text-white px-3 py-1"
        onClick={() => onSubmit(currentValue)}
      >
        Save
      </button>
      <button
        className="ml-3 mt-3 border bg-red-500 rounded-xl text-white px-3 py-1"
        onClick={cancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default Profile;
