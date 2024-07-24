import { default as Image } from "next/image";
import { Indicator } from "./Indicator";
interface ClaimCardHighlightedCommentProps {
  claim: Claim;
  onClick: Function;
  width?: string;
}

export const ClaimCardHighlightedComment = ({
  claim,
  onClick,
  width,
}: ClaimCardHighlightedCommentProps) => {
  return (
    <div
      className="rounded-2xl bg-white special-shadow h-44
             max-w-xs cursor-pointer w-60"
      onClick={() => onClick()}
      style={{ width: width ?? null }}
    >
      <div className="absolute w-60 bg-fact-red-gr-3 opacity-95 rounded-2xl overflow-hidden line-clamp-4 px-2 py-1 text-sm shadow-lg">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At...
        </p>
      </div>
      <div className="flex flex-col justify-start px-3 mt-3 filter bg-gray-100 h-full rounded-2xl mb-2 pt-16">
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-bold ">Claim</h1>
          <div className="text-xs w-34 h-10">
            <Indicator validity={35} />
          </div>
        </div>
        <h3 className="font-medium text-xs break-words">{claim.statement}</h3>
      </div>
    </div>
  );
};
/*
{
   <div className="w-32 mt-2 h-20">
          <Image
            src={claim.images[0].link}
            priority
            alt={`avatar-image-appbar`}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg special-shadow w-full h-full mt-1 object-cover"
          />
        </div> 
}
*/

{
  /* <div className="absolute text-xs w-34 h-10">
<Indicator validity={35} />
</div> */
}
