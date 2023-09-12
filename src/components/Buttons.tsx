import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SourceButtonParams {
  link: String;
}

export const SourceButton = ({ link }: SourceButtonParams) => (
  <div className="shadow-md text-blue-500 px-4 py-1 rounded-xl flex flex-row">
    Source
    <FontAwesomeIcon icon={faShare} className="pl-2 w-5" />
  </div>
);

interface TruthFactorLabelParams {
  label: String;
  value: number;
}

export const TruthFactorLabel = ({ label, value }: TruthFactorLabelParams) => (
  <div
    className="ml-5 rounded-xl px-4 py-1"
    style={{
      backgroundColor:
        value == null ? "yellow" : value < 50 ? "#FF9494" : "#B1EFA7",
    }}
  >
    {label}
  </div>
);
