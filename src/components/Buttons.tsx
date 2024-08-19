import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SourceButtonParams {
  link: String;
  onClick: Function;
}

/**
 * @param link - Text or link containing the source of the claim
 * @param onClick - Callback for opening Modal view containing source
 *
 * @returns Button Containing Claims Source as a link or text
 */
export const SourceButton = ({ link, onClick }: SourceButtonParams) => (
  <div
    className="shadow-md text-blue-500 px-4 py-1 rounded-xl flex flex-row justify-center items-center cursor-pointer hover:scale-110 font-semibold"
    onClick={() => onClick()}
  >
    Source
  </div>
);

interface TruthFactorLabelParams {
  label: String;
  value: number;
}

/**
 * @param label - Text to show, in this case text indicating how true claim is
 * @param value - Value from 1-100 containing value on how true claim probably is
 *
 * @returns Styled label that shows different color depending on value passed
 */
export const TruthFactorLabel = ({ label, value }: TruthFactorLabelParams) => (
  <div
    className="ml-5 rounded-xl px-4 py-1 font-semibold"
    style={{
      backgroundColor:
        value == null ? "yellow" : value < 50 ? "#FF9494" : "#B1EFA7",
    }}
  >
    {label}
  </div>
);
