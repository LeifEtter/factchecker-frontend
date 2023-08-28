import { useEffect, useState } from "react";

interface IndicatorProps {
  validity: number;
}

export const Indicator = ({ validity }: IndicatorProps) => {
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
