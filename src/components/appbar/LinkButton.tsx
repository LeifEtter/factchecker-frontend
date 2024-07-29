import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
  return (
    <Link
      data-testid={testId}
      href={path}
      className="py-1 px-2 rounded-xl font-semibold hover:scale-105 duration-150 ease-in-out flex items-center"
      style={{
        backgroundColor: isActive ? "rgb(239, 237, 237)" : "rgba(0,0,0,0)",
        color: isActive ? "black" : "#535353",
      }}
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
