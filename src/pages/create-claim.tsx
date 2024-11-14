import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { InputField, InputFieldMultiline } from "../components/InputField";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ImageChooser } from "../components/ImageChooser";
import { v4 as uuidv4 } from "uuid";
import { SnackBar, SnackbarType } from "../components/Snackbar";
import { UserContext } from "../state/user";
import { API } from "../assets/constants";
import { UserSettingsContext } from "../state/settings";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { LoadingDots } from "../components/LoadingDots";

/**
 * @returns Page containing a form to submit claims, providing text and images
 */
export default function CreateClaim() {
  const { darkModeActive } = useContext(UserSettingsContext);

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

  const { user, setUser } = useContext(UserContext);

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

  const [categoriesIsLoading, categories, setCategories] = useFetchCategories();

  const submitClaim = async () => {
    try {
      //   const result = await fetch(`${API}/claims/create`, {
      //     method: "POST",
      //     mode: "cors",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       statement: title,
      //       description: description,
      //       user_id: user.id,
      //       source: source,
      //       categories: chosenCategories.map((cat) => cat.name),
      //     }),
      //   });
      //   if (result.status == 201) {
      //     const body = await result.json();
      //     uploadImage(images, body.result[0].id);
      //     setSnackbar({
      //       title: "Claim Submitted",
      //       description:
      //         "Claim was successfully submitted and is ready to be reviewed.",
      //       type: SnackbarType.SUCCESS,
      //     });
      //   }
      //   if (result.status == 400) {
      //     console.log(await result.json());
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (images: ClaimImageFile[], claimId: number) => {
    const data = new FormData();
    let sources = [];
    for (let image of images) {
      data.append(image.file.name, image.file);
      sources.push({
        fileName: image.file.name,
        source: image.source,
      });
    }
    data.append("sources", JSON.stringify(sources));

    const uploadResult = await fetch(
      `${API}/images/upload/multiple/${claimId}`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: data,
      }
    );
    const body = await uploadResult.json();
  };

  return (
    <>
      <main
        className={`${
          darkModeActive ? "text-gray-200" : "text-fact-text-medium"
        } flex justify-center`}
      >
        <div className="w-11/12 max-w-md flex flex-col gap-3">
          <h1 className="font-bold text-2xl  text-center mb-5 mt-24">
            Create Claim
          </h1>
          <InputField
            testId={"claim-input"}
            value={title}
            setValue={setTitle}
            title="Claim"
            error={titleError}
            resetError={() => setTitleError(null)}
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <InputFieldMultiline
            testId={"description-input"}
            value={description}
            setValue={setDescription}
            title="Description"
            error={descriptionError}
            resetError={() => setDescriptionError(null)}
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <div>
            <p className="ml-1 font-semibold mt-2">Images</p>
            <div className="flex items-center gap-5">
              {images.map((image, i) => (
                <div
                  className="relative w-48 h-48 bg-white text-fact-text-medium rounded-2xl special-shadow"
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
                className={`${
                  darkModeActive ? "bg-gray-800" : "bg-white"
                } flex items-center justify-center mt-2 p-2 rounded-2xl special-shadow`}
                onClick={() => {
                  if (images.length >= 3) {
                    setSnackbar({
                      title: "3 Image Maximum",
                      description:
                        "You are only allowed to add 3 images to a claim. Please delete existing images to add new ones.",
                      type: SnackbarType.ERROR,
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
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <p>Categories</p>
          <div className="flex justify-start flex-wrap gap-4">
            {categories ? (
              Object.keys(categories)
                .map(Number)
                .filter((key: number) => !categories[key].active)
                .map((key: number) => (
                  <button
                    key={`cat-button-${key}`}
                    className={`${
                      darkModeActive ? "bg-gray-700" : "bg-white"
                    } p-1 rounded-md shadow-md cursor-pointer`}
                    onClick={() =>
                      setCategories({
                        ...categories,
                        [key]: {
                          name: categories[key].name,
                          active: true,
                        },
                      })
                    }
                  >
                    {categories[key].name}
                  </button>
                ))
            ) : (
              <LoadingDots />
            )}
          </div>
          <p>Chosen Categories</p>
          <div className="flex justify-start flex-wrap gap-2">
            {categories ? (
              Object.keys(categories)
                .map(Number)
                .filter((key: number) => categories[key].active)
                .map((key: number) => (
                  <button
                    key={`cat-button-${key}`}
                    className={`${
                      darkModeActive ? "bg-gray-700" : "bg-white"
                    } shadow-md rounded-md p-1 cursor-pointer"`}
                    onClick={() =>
                      setCategories({
                        ...categories,
                        [key]: {
                          name: categories[key].name,
                          active: false,
                        },
                      })
                    }
                  >
                    {categories[key].name}
                  </button>
                ))
            ) : (
              <LoadingDots />
            )}
          </div>
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
        requestSource={true}
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
        bgColor={darkModeActive ? "bg-gray-800" : "bg-white"}
        fieldsBgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
        textColor={darkModeActive ? "text-gray-300" : "text-fact-medium"}
      />
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
}
