import { useEffect, useState } from "react";

export enum SnackbarType {
  ERROR,
  INFO,
  SUCCESS,
}
export interface SnackbarDetails {
  type: SnackbarType;
  title: string;
  description: string;
}
export interface SnackbarProps {
  snackbar: SnackbarDetails;
  setSnackbar: Function;
}

export const SnackBar = ({ snackbar, setSnackbar }: SnackbarProps) => {
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (snackbar != null) {
      if (snackbar.type == SnackbarType.ERROR) {
        setColor("#FF5A5F");
      } else if (snackbar.type == SnackbarType.SUCCESS) {
        setColor("#50C878");
      } else if (snackbar.type == SnackbarType.INFO) {
        setColor("#48cae4");
      }
      const timer = setTimeout(() => {
        setSnackbar(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [snackbar, setSnackbar]);

  return (
    <div
      className="fixed w-10/12 z-10 animate-bounce duration-200 rounded-2xl special-shadow flex flex-col items-center justify-center p-3"
      style={{
        top: snackbar != null ? "50px" : "-50px",
        backgroundColor: color,
      }}
    >
      <h2 className="font-semibold">{snackbar ? snackbar.title : ""}</h2>
      <p className="text-center">{snackbar ? snackbar.description : ""}</p>
    </div>
  );
};
