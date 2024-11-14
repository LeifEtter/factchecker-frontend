import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { InputField, InputFieldMultiline } from "../components/InputField";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ImageChooser } from "../components/ImageChooser";
import { v4 as uuidv4 } from "uuid";
import { SnackBar, SnackbarType } from "../components/Snackbar";
import { UserContext } from "../state/user";
import { UserSettingsContext } from "../state/settings";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { LoadingDots } from "../components/LoadingDots";
import { useCreateClaim } from "../hooks/useCreateClaim";
import Head from "next/head";

/**
 * @returns Page containing a form to submit claims, providing text and images
 */
export default function CreateClaim() {
  const { darkModeActive } = useContext(UserSettingsContext);

  const [snackbar, setSnackbar] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageChooserData, setImageChooserData] = useState<ClaimImageFile>({
    id: null,
    file: null,
    source: null,
  });

  const { user } = useContext(UserContext);

  const [categoriesIsLoading, categories, setCategories] = useFetchCategories();

  const [claimData, setClaimData] = useState<ClaimData | null>(null);

  const [claimCreateIsLoading, submitClaim, claimSubmitted] = useCreateClaim();

  useEffect(() => {
    if (categories && user && !categoriesIsLoading && claimData == null) {
      setClaimData({
        title: "",
        titleError: null,
        description: "",
        descriptionError: null,
        source: "",
        sourceError: null,
        categories: extractCatKeysByActive(true).map(
          (key) => categories[key].name
        ),
        creatorId: user.id,
        images: [],
      });
    }
  }, [user, categories]);

  useEffect(() => {
    if (claimSubmitted) {
      setSnackbar({
        title: "Claim Submitted",
        description:
          "Claim was successfully submitted and is ready to be reviewed.",
        type: SnackbarType.SUCCESS,
      });
    }
  }, [claimSubmitted]);

  const extractCatKeysByActive = (active: boolean): number[] =>
    Object.keys(categories)
      .map(Number)
      .filter((key: number) => categories[key].active == active);

  // setSnackbar({
  //   title: "Claim Submitted",
  //   description:
  //     "Claim was successfully submitted and is ready to be reviewed.",
  //   type: SnackbarType.SUCCESS,
  // });

  //TODO improve with more validation like on backend
  const validateFields = async () => {
    if (claimData.title == "") {
      setClaimData({ ...claimData, titleError: "Please enter a Claim" });
    } else if (claimData.description == "") {
      setClaimData({
        ...claimData,
        descriptionError: "Please Enter a Description",
      });
    } else if (claimData.source == "") {
      setClaimData({ ...claimData, sourceError: "Please Enter a Source" });
    } else {
      return true;
    }
    return false;
  };

  return !claimData ? (
    <LoadingDots />
  ) : (
    <div>
      <Head>
        <title>Submit your own Claim</title>
        <meta
          name="description"
          content="Here you can submit your own Claim, that you want other users to judge as truthful or a lie"
        />
      </Head>
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
            value={claimData.title}
            setValue={(title: string) => setClaimData({ ...claimData, title })}
            title="Claim"
            error={claimData.titleError}
            resetError={() => setClaimData({ ...claimData, titleError: null })}
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <InputFieldMultiline
            testId={"description-input"}
            value={claimData.description}
            setValue={(description: string) =>
              setClaimData({ ...claimData, description })
            }
            title="Description"
            error={claimData.descriptionError}
            resetError={() =>
              setClaimData({ ...claimData, descriptionError: null })
            }
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <div>
            <p className="ml-1 font-semibold mt-2">Images</p>
            <div className="flex items-center gap-5">
              {claimData.images.map((image, i) => (
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
                    onClick={() =>
                      setClaimData({
                        ...claimData,
                        images: claimData.images.filter(
                          (e) => e.id != image.id
                        ),
                      })
                    }
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
                  if (claimData.images.length >= 3) {
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
            value={claimData.source}
            setValue={(source: string) =>
              setClaimData({ ...claimData, source })
            }
            title="Source"
            error={claimData.sourceError}
            resetError={() => setClaimData({ ...claimData, sourceError: null })}
            bgColor={darkModeActive ? "bg-gray-700" : "bg-white"}
          />
          <p>Categories</p>
          <div className="flex justify-start flex-wrap gap-4">
            {categories ? (
              extractCatKeysByActive(false).map((key: number) => (
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
              extractCatKeysByActive(true).map((key: number) => (
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
            onClick={() => (validateFields() ? submitClaim(claimData) : null)}
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
            setClaimData({
              ...claimData,
              images: claimData.images.map((image) =>
                image.id == imageChooserData.id ? imageChooserData : image
              ),
            });
          } else {
            setClaimData({
              ...claimData,
              images: [
                ...claimData.images,
                { ...imageChooserData, id: uuidv4() },
              ],
            });
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
    </div>
  );
}
