import { useEffect, useState } from "react";

const { default: Image } = require("next/image");

export const ClaimCard = ({
  images,
  statement,
  description,
  userId,
  source,
}) => {};

export const ClaimCardWithImage = ({
  images,
  statement,
  description,
  userId,
  source,
}) => (
  <div className="flex flex-col bg-white rounded-2xl special-shadow">
    {/* <div className="absolute flex w-4 bg-red-500 h-12">dd</div> */}
    <div className="flex">
      {images.map((image) => {
        <div className="flex h-32">
          <Image
            src={image}
            alt={`${image}-image`}
            width={1000}
            height={0}
            className="object-cover"
            style={{
              borderRadius: `16px ${images.length == 1 ? "16" : "0"}px 0px 0px`,
            }}
          />
        </div>;
      })}
    </div>
    <div className="flex items-center justify-between">
      <h1 class="text-xl font-semibold">{statement}</h1>
      <IndicatorNew validity={35} />
    </div>
    <div>{description}</div>
  </div>
);

const IndicatorNew = ({ validity }) => {
  const [text, setText] = useState();
  const [color, setColor] = useState();

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
