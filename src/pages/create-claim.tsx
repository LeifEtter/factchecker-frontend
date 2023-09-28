import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { InputField, InputFieldMultiline } from "../components/InputField";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { TokenContext } from "../state/token";
import { Token } from "../token";
import { ImageChooser } from "../components/ImageChooser";
import { v4 as uuidv4 } from "uuid";
import { SnackBar } from "../components/Snackbar";

export default function CreateClaim() {
  // TODO Manage state from parent of image chooser modalInput
  const [snackbar, setSnackbar] = useState(null);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const [images, setImages] = useState<ClaimImageFile[]>([]);

  const [source, setSource] = useState("");
  const [sourceError, setSourceError] = useState(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageChooserData, setImageChooserData] = useState<ClaimImageFile>({
    id: null,
    file: null,
    source: null,
  });

  const { token, setToken } = useContext(TokenContext);

  const validate = async () => {
    if (title == "") {
      setTitleError("Please Enter a Claim");
      return false;
    } else if (description == "") {
      setDescriptionError("Please Enter a Description");
      return false;
    } else if (source == "") {
      setSourceError("Please Enter a Source");
      return false;
    }
    return true;
  };

  const submitClaim = async () => {
    try {
      const result = await fetch(`http://localhost:3005/claims/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statement: title,
          description: description,
          user_id: jwtDecode<Token>(token).id,
          source: source,
        }),
      });

      if (result.status == 201) {
        const body = await result.json();
        assignImages(body.result[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignImages = async (claimId) => {
    try {
      const result = await fetch(`http://localhost:3005/images/assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claimId: claimId,
          images: images,
        }),
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //TODO only upload images on form submit
  // const uploadImage = async (file: File, source: string) => {
  //   const data = new FormData();

  //   data.append("image", file);
  //   data.append("source", source);

  //   const uploadResult = await fetch("http://localhost:3005/images/upload", {
  //     method: "POST",
  //     body: data,
  //   });
  //   const body = await uploadResult.json();
  //   setImages([...images, { url: body.url, id: body.id }]);
  // };

  //TODO Add id on choosing image to prevent saving new image on editing

  return (
    <>
      {/* <Head></Head> */}

      <main className="flex justify-center">
        <div className="w-11/12 max-w-md flex flex-col gap-3">
          <h1 className="font-bold text-2xl text-fact-text-medium text-center mb-5 mt-24">
            Create Claim
          </h1>
          <InputField
            testId={"claim-input"}
            value={title}
            setValue={setTitle}
            title="Claim"
            error={titleError}
            resetError={() => setTitleError(null)}
          />
          <InputFieldMultiline
            testId={"description-input"}
            value={description}
            setValue={setDescription}
            title="Description"
            error={descriptionError}
            resetError={() => setDescriptionError(null)}
          />
          <div>
            <p className="ml-1 font-semibold text-fact-text-medium mt-2">
              Images
            </p>
            <div className="flex items-center gap-5">
              {images.map((image, i) => (
                <div
                  className="relative w-48 h-48 bg-white rounded-2xl special-shadow"
                  key={`image-div-${i}`}
                >
                  <Image
                    src={window.URL.createObjectURL(image.file)}
                    alt={`image-${i}`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => {
                      setImages(images.filter((e) => e.id != image.id));
                    }}
                    className="absolute flex items-center justify-center w-8 h-8 left-0 bg-red-300 rounded-md special-shadow"
                  >
                    <div className="w-4">
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setImageChooserData(image);
                      setShowModal(true);
                    }}
                    className="absolute flex items-center justify-center w-8 h-8 right-0 bg-blue-200 rounded-md special-shadow"
                  >
                    <div className="w-4">
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </button>
                </div>
              ))}
              <button
                className="flex items-center justify-center mt-2 p-2 bg-white rounded-2xl special-shadow"
                onClick={() => {
                  if (images.length >= 3) {
                    setSnackbar({
                      title: "3 Image Maximum",
                      description:
                        "You are only allowed to add 3 images to a claim. Please delete existing images to add new ones.",
                      type: "error",
                    });
                  } else {
                    setShowModal(true);
                  }
                }}
              >
                <div className="w-5">
                  <FontAwesomeIcon icon={faAdd} />
                </div>
              </button>
            </div>
          </div>

          <InputField
            testId={"source-input"}
            value={source}
            setValue={setSource}
            title="Source"
            error={sourceError}
            resetError={() => setSourceError(null)}
          />

          <button
            className="special-shadow fact-gradient rounded-xl text-white p-3 w-full"
            onClick={() => {
              if (validate()) {
                submitClaim();
              }
            }}
          >
            Submit
          </button>
        </div>
      </main>
      <ImageChooser
        showModal={showModal}
        imageChooserData={imageChooserData}
        setImageChooserData={setImageChooserData}
        saveImage={() => {
          if (imageChooserData.id != null) {
            setImages(
              images.map((image) =>
                image.id == imageChooserData.id ? imageChooserData : image
              )
            );
          } else {
            setImages([
              ...images,
              {
                ...imageChooserData,
                id: uuidv4(),
              },
            ]);
          }
          setImageChooserData({ id: null, file: null, source: null });
          setShowModal(false);
        }}
        resetImageChooser={() => {
          setImageChooserData({ id: null, file: null, source: null });
          setShowModal(false);
        }}
      />
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
}
