import { useEffect, useState } from "react";

import { default as Image } from "next/image";

// TODO Implement Claim Card without images

interface ClaimCardWithImageProps {
  images: string[];
  statement: string;
  description: string;
  userId: number;
  source: string;
  onClick: () => void;
}

export const ClaimCardWithImage = ({
  images,
  statement,
  description,
  userId,
  source,
  onClick,
}: ClaimCardWithImageProps) => (
  <div>
    <div
      className="flex flex-col bg-white rounded-2xl special-shadow max-w-sm h-72 overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute z-10 h-10">
        <Indicator validity={35} />
      </div>
      <div className="basis-6/12 w-full flex flex-row">
        {images.map((image, index) => (
          <div className="flex-1 relative" key={image + "-container" + index}>
            <Image
              priority
              src={image}
              alt={`${image}-image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="basis-7/12 overflow-scroll flex flex-col p-3">
        <h1 className="text-xl font-semibold">{statement}</h1>
        <p>{description.slice(0, 80) + "..."}</p>
      </div>
    </div>
  </div>
);

interface IndicatorProps {
  validity: number;
}

const Indicator = ({ validity }: IndicatorProps) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (validity < 30) {
      setText("False");
      setColor("bg-red-500");
    } else if (validity < 50) {
      setText("Likely False");
      setColor("bg-red-300");
    } else if (validity < 80) {
      setText("Likely True");
      setColor("bg-green-300");
    } else {
      setText("True");
      setColor("bg-green-500");
    }
  }, [validity]);

  return <div className={`${color} p-2 rounded-2xl`}>{text}</div>;
};
