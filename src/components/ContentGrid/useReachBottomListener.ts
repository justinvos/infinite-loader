import throttle from "lodash/throttle";
import { useMemo, useEffect } from "react";

const BOTTOM_OFFSET = 300;

export function useReachBottomListener({
  onReachBottom,
}: UseReachBottomListenerProps) {
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const distanceFromBottom = calculateDistanceFromBottom();

        if (distanceFromBottom < BOTTOM_OFFSET) {
          onReachBottom();
        }
      }, 100),
    [onReachBottom]
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
  onReachBottom: () => void;
}

/**
 * Calculates the distance between the bottom of the window and the bottom of the page
 */
function calculateDistanceFromBottom(): number {
  const windowBottomPosition = window.scrollY + window.innerHeight;
  return document.documentElement.scrollHeight - windowBottomPosition;
}
