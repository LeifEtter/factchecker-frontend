import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { InputField, InputFieldMultiline } from "@/components/InputField";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

export default function CreateClaim() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const [images, setImages] = useState([]);

  const [currentImage, setCurrentImage] = useState();

  const [sources, setSources] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState();

  useEffect(() => {
    if (modalInput) {
      uploadImage(modalInput.imageFile, modalInput.imageUrl);
      setModalInput(null);
    }
  }, [modalInput]);

  const uploadImage = async (file, source) => {
    const data = new FormData();

    data.append("image", file);
    data.append("description", source);
    data.append("claimId", 2);

    const uploadResult = await fetch("http://localhost:3005/images/upload", {
      method: "POST",
      body: data,
    });
    const body = await uploadResult.json();

    setImages([...images, body.url]);
  };

  return (
    <>
      <Head></Head>
      <div>
        <Modal
          showModal={showModal}
          setModalInput={setModalInput}
          setShowModal={setShowModal}
        />
        <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5 mt-24">
          Create Claim
        </h1>
        <InputField
          value={title}
          setValue={setTitle}
          title="Title"
          error={titleError}
          resetError={() => setTitleError(null)}
        />
        <InputFieldMultiline
          value={description}
          setValue={setDescription}
          title="Description"
          error={descriptionError}
          resetError={() => setDescriptionError(null)}
        />
        <div>
          <p className="ml-1 font-semibold text-fact-text-medium">Images</p>
          <div className="flex items-center gap-5">
            {images.map((image) => (
              <div
                className="relative -z-10 w-48 h-48 bg-white rounded-2xl special-shadow"
                key={image}
              >
                <Image
                  src={image}
                  alt={image}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            ))}
            <button
              className="flex p-5 bg-white rounded-2xl special-shadow"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faAdd} size="xl" />
            </button>
          </div>
        </div>

        <button onClick={() => {}}>Submit</button>
      </div>
    </>
  );
}

const Modal = ({ showModal, setModalInput, setShowModal }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState();

  return showModal ? (
    <div>
      <div
        onClick={() => {
          setImageFile(null);
          setImageUrl("");
          setModalInput(null);
          setShowModal(false);
        }}
        className="fixed flex top-0 justify-center w-full h-full bg-gray-500 opacity-50"
      />
      <div className="fixed top-0 flex justify-center w-full">
        <div className="flex flex-col items-center fixed z-10 blue-background top-96 p-5 rounded-2xl">
          <h2 className="text-xl font-semibold mb-5">Add Image</h2>
          <p>Source:</p>
          <input
            className="special-shadow bg-white rounded-md p-1 mt-1"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label
            htmlFor="image-upload"
            className="w-full h-full mt-3 bg-white rounded-md py-2 special-shadow flex justify-center items-center gap-2"
          >
            {imageFile ? "Change Image" : "Select Image"}{" "}
            <FontAwesomeIcon icon={faAdd} />
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />
          <button
            className="fact-gradient p-2 text-white rounded-xl special-shadow mt-5"
            onClick={() => {
              setShowModal(false);
              setModalInput({
                imageUrl: imageUrl,
                imageFile: imageFile,
              });
              setImageUrl("");
              setImageFile(null);
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
