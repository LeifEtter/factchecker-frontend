import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

interface ImageChooserParams {
  showModal: Function;
  setModalInput: Function;
  setShowModal: Function;
  callback: Function;
}

export const ImageChooser = ({
  showModal,
  setModalInput,
  setShowModal,
  callback,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File>(null);
  const [error, setError] = useState(false);

  const validate = () => {
    console.log(imageFile);
    if (imageUrl == "" || imageFile == null) {
      setError(true);
      return false;
    }
    return true;
  };

  const resetModal = () => {
    setImageUrl("");
    setImageFile(null);
    setError(null);
    setShowModal(false);
  };

  return showModal ? (
    <div>
      <div
        onClick={() => {
          setImageFile(null);
          setImageUrl("");
          setModalInput(null);
          setShowModal(false);
          setError(false);
        }}
        className="fixed flex top-0 justify-center w-full h-full bg-gray-500 opacity-50"
      />
      <div className="fixed top-0 flex justify-center w-full">
        <div className="flex flex-col items-center fixed z-10 blue-background top-96 p-5 rounded-2xl w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-5">Add Image</h2>
          <p>Source:</p>
          <input
            className="special-shadow bg-white rounded-md py-1 px-2 mt-1 w-full"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          {imageFile != null ? (
            <div className="relative w-full h-36 mt-4 rounded-xl">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={window.URL.createObjectURL(imageFile)}
                alt={`current-selected-image`}
                className="object-cover rounded-xl special-shadow"
              />
            </div>
          ) : null}
          <label
            htmlFor="image-upload"
            className="z-10 w-full h-full mt-3 bg-white rounded-md py-2 special-shadow flex justify-center items-center gap-2"
          >
            {imageFile ? "Change Image" : "Select Image"}{" "}
            <div className="w-4">
              <FontAwesomeIcon icon={faAdd} />
            </div>
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />

          {error ? (
            <p className="text-sm text-red-500 mt-2">
              Please select an image and source
            </p>
          ) : (
            <></>
          )}

          <button
            className="fact-gradient p-2 text-white rounded-xl special-shadow mt-5"
            onClick={() => {
              if (!validate()) {
                return;
              }
              resetModal();
              callback({ file: imageFile, source: imageUrl } as ClaimImageFile);
            }}
          >
            Submit Image
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
