import type { RefObject } from 'react';
import { useCallback, useEffect } from 'react';

/**
 * Move element in x or y direction while scrolling
 */
const useMoveElementEffect = (
  shouldMove: boolean,
  startingPosition: number | undefined,
  element: RefObject<HTMLElement>,
  direction: 'left' | 'top' = 'top',
): void => {
  const moveElement = useCallback(() => {
    if (!element.current || !startingPosition) {
      return;
    }

    const elementTop = element.current.getBoundingClientRect().y;

    if (shouldMove) {
      element.current.style[direction] = `${(elementTop - startingPosition) * 0.15}px`;
    }
  }, [direction, element, shouldMove, startingPosition]);

  useEffect(() => {
    window.addEventListener('scroll', moveElement);

    return () => {
      window.removeEventListener('scroll', moveElement);
    };
  }, [moveElement]);
};

export default useMoveElementEffect;
