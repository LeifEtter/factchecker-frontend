import { useState } from "react";
import { API } from "../assets/constants";

/**
 * Hook that helps create a claim and upload claim images
 *
 * @returns Loading State, Function to submit claim and Claim submission status
 */

export const useCreateClaim = (): [
  boolean,
  (arg0: ClaimData) => void,
  boolean
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claimSubmitted, setClaimIsSubmitted] = useState<boolean>(false);

  const submitClaimText = async (claimData: ClaimData) => {
    const result = await fetch(`${API}/claims/create`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statement: claimData.title,
        description: claimData.description,
        user_id: claimData.creatorId,
        source: claimData.source,
        categories: claimData.categories,
      }),
    });
    const body = await result.json();
    return body;
  };

  const buildImagesForm = (images: ClaimImageFile[]): FormData => {
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
    return data;
  };

  const submitClaimImages = async (claimId: number, imageForm: FormData) => {
    const res = await fetch(`${API}/images/upload/multiple/${claimId}`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: imageForm,
    });
    if (res.status == 201) {
      setClaimIsSubmitted(true);
    }
  };

  const submitClaim = async (claimData: ClaimData) => {
    setIsLoading(true);
    try {
      const claimSubmitResult = await submitClaimText(claimData);
      const imagesForm = buildImagesForm(claimData.images);
      await submitClaimImages(claimSubmitResult.id, imagesForm);
      setClaimIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return [isLoading, submitClaim, claimSubmitted];
};
