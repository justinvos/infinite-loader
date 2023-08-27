import throttle from "lodash/throttle";
import { useMemo, useEffect } from "react";

export function useReachBottomListener({
  bottomOffset,
  onReachBottom,
}: UseReachBottomListenerProps) {
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const distanceFromBottom = calculateDistanceFromBottom();

        if (distanceFromBottom < bottomOffset) {
          onReachBottom();
        }
      }, 100),
    [bottomOffset, onReachBottom]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Calling handleScroll on load to check if the user begins with the bottom of the page showing (vertical screens)
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
}

interface UseReachBottomListenerProps {
  bottomOffset: number;
  onReachBottom: () => void;
}

/**
 * Calculates the distance between the bottom of the window and the bottom of the page
 */
function calculateDistanceFromBottom(): number {
  const windowBottomPosition = window.scrollY + window.innerHeight;
  return document.documentElement.scrollHeight - windowBottomPosition;
}
