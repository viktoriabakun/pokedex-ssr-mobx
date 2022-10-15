import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

/**
 * Check if element in view sight and returning its starting position.
 */
const useElementInView = (
  element: RefObject<HTMLElement>,
  anchor: RefObject<HTMLElement>,
): [boolean, number | undefined] => {
  const [startingPosition, setStartingPosition] = useState<number>();
  const [isVisible, setIsVisible] = useState(false);

  const calculateStartingPosition = useCallback(() => {
    if (!element.current || startingPosition) {
      return;
    }

    setStartingPosition(element.current.getBoundingClientRect().y);
  }, [element, startingPosition]);

  const checkView = useCallback(() => {
    if (!anchor.current) {
      return;
    }

    const titleTop = anchor.current.getBoundingClientRect().top;

    const maxTopDot = window.innerHeight;

    if (titleTop < maxTopDot) {
      setIsVisible(true);
      calculateStartingPosition();
    }
  }, [anchor, calculateStartingPosition]);

  useEffect(() => {
    window.addEventListener('scroll', checkView);

    checkView();

    return () => {
      window.removeEventListener('scroll', checkView);
    };
  }, [checkView]);

  return [isVisible, startingPosition];
};

export default useElementInView;
