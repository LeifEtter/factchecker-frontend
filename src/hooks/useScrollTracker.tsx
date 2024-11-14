import { useEffect, useState } from "react";

/**
 * @returns //TODO Add Description
 */
export const useScrollTracker = (state: any, onBottomReach: Function) => {
  const [trackedElem, setTrackedElem] = useState<any>(null);

  const onScroll = () => {
    let rect = trackedElem.getBoundingClientRect();
    let rectDistanceFromTop = rect.y;
    if (rectDistanceFromTop < window.outerHeight) {
      onBottomReach();
    }
  };

  useEffect(() => {
    if (trackedElem) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [trackedElem, state]);

  return [setTrackedElem];
};
