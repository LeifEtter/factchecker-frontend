import { InputField, InputFieldMultiline } from "@/components/InputField";
import Head from "next/head";
import { useState } from "react";

export default function CreateClaim() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const [images, setImages] = useState([]);

  const [sources, setSources] = useState([]);

  return (
    <>
      <Head></Head>
      <div>
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
          <div>
            {images.map((image) => (
              <div
                className="w-48 h-48 bg-white rounded-2xl special-shadow"
                key={image}
              />
            ))}
            q
            <div className="w-48 h-48 bg-white rounded-2xl special-shadow"></div>
          </div>
        </div>
      </div>
    </>
  );
}
