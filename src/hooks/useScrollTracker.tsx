import { useEffect, useState } from "react";

/**
 * Hook containing logic to track wether a user has reached bottom of the page by scrolling
 *
 * @param state - Any variable containing a state that will trigger adding a new listener
 * @param onBottomReach - Callback Function called when bottom of page is reached
 *
 * @returns Function for setting tracked most bottom element
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
