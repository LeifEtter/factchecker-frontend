import { useEffect, useState } from "react";

interface IndicatorProps {
  validity: number;
  fullWidth?: boolean;
}
/**
 * @param validity - Value pertaining to the validity of a claim
 * @param fullWidth - Boolean deciding wether indicator should use fullwidth of parent or not
 *
 * @returns Indicator representing likelyhood of claim being True/False;
 * Reddish colors represent false claims, while greenish colors represent true claims
 */
export const Indicator = ({ validity, fullWidth = false }: IndicatorProps) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (validity == null) {
      setText("Undecided");
      setColor("grey-gradient");
    } else if (validity < 30) {
      setText("False");
      setColor("red-gradient");
    } else if (validity < 50) {
      setText("Likely False");
      setColor("red-gradient");
    } else if (validity < 80) {
      setText("Likely True");
      setColor("green-gradient");
    } else {
      setText("True");
      setColor("green-gradient");
    }
  }, [validity]);

  return fullWidth ? (
    <div
      className={`${color} text-white py-2 px-3 w-full font-semibold rounded-2xl special-shadow text-center`}
    >
      {text}
    </div>
  ) : (
    <div
      className={`${color} text-white py-2 px-3 font-semibold rounded-2xl special-shadow `}
    >
      {text}
    </div>
  );
};
