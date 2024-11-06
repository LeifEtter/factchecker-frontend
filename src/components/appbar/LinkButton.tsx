import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import { UserSettingsContext } from "../../state/settings";

type LinkButtonProps = {
  title: string;
  path: string;
  isActive: boolean;
  testId?: string;
  icon?: IconDefinition;
};

/**
 * @param title - Name of page to be navigated to
 * @param path - Path of page to be navigated to
 * @param isActive - Boolean representing if path if currently being visited
 * @param testId - Test Id
 * @param icon - Optional icon that will show next to name of page
 *
 * @returns Button used in Appbar to navigate to different pages
 */
export const LinkButton = ({
  title,
  path,
  isActive,
  testId = "",
  icon,
}: LinkButtonProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  const variants = {
    lightMode: isActive
      ? "bg-fact-light-gray text-black"
      : "bg-none fact-text-light",
    darkMode: isActive ? "bg-black text-white" : "bg-none text-gray-300",
  };

  return (
    <Link
      data-testid={testId}
      href={path}
      className={`${
        darkModeActive ? variants["darkMode"] : variants["lightMode"]
      } py-1 px-2 rounded-xl font-semibold hover:scale-105 ease-in-out flex items-center transition-colors duration-300`}
    >
      {title}
      {icon != null ? (
        <FontAwesomeIcon className="ml-2" icon={icon} width={18} />
      ) : (
        <></>
      )}
    </Link>
  );
};
