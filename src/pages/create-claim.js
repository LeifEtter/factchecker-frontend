import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { InputField, InputFieldMultiline } from "@/components/InputField";
import Head from "next/head";
import { useState } from "react";
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

export default function CreateClaim() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const [images, setImages] = useState([]);

  const [sources, setSources] = useState([]);

  const [showingModal, setShowingModal] = useState();

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("image", files[0]);
    data.append("description", "Some description");
    data.append("claimId", 2);

    const uploadResult = await fetch("http://localhost:3005/images/upload", {
      method: "POST",
      body: data,
    });
    const body = await uploadResult.json();

    console.log(body);
  };

  return (
    <>
      <Head></Head>
      <div>
        <Modal showingModal={showingModal} setShowingModal={setShowingModal} />
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
          <div className="flex">
            {images.map((image) => (
              <div
                className="w-48 h-48 bg-white rounded-2xl special-shadow"
                key={image}
              />
            ))}
            <div className="flex p-5 bg-white rounded-2xl special-shadow">
              <label for="image-upload" className="w-full h-full">
                <FontAwesomeIcon icon={faAdd} size="xl" />
              </label>
              <input
                id="image-upload"
                type="file"
                onChange={uploadImage}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <button onClick={() => {}}>Submit</button>
        <button
          onClick={() => {
            setShowingModal(true);
          }}
        >
          ShowModal
        </button>
      </div>
    </>
  );
}

const Modal = ({ showingModal, setShowingModal }) => {};
