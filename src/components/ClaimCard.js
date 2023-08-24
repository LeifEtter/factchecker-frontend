import { useEffect, useState } from "react";

const { default: Image } = require("next/image");

export const ClaimCard = () => (
  <div className="flex flex-col h-60 bg-red-500">
    <div className="basis-6/12 bg-green-500">d</div>
    <div className="basis-6/12 bg-orange-500">d</div>
  </div>
);
export const ClaimCardWithImage = ({
  images,
  statement,
  description,
  userId,
  source,
  onClick,
}) => (
  <div>
    <div
      className="flex flex-col bg-white rounded-2xl special-shadow max-w-sm h-72 overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute z-10 h-10">
        <IndicatorNew validity={35} />
      </div>
      <div className="basis-6/12 w-full flex flex-row">
        {images.map((image) => (
          <div className="flex-1 relative" key={image + "-container"}>
            <Image
              src={image}
              alt={`${image}-image`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="basis-7/12 overflow-scroll flex flex-col p-3">
        <h1 class="text-xl font-semibold">{statement}</h1>
        <p>{description.slice(0, 80) + "..."}</p>
      </div>
    </div>
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
