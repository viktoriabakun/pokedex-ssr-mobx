import type { FC, MouseEventHandler } from 'react';
import React, { useCallback, useRef } from 'react';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

interface IScrollTo extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  delay?: number; // we need small delay in some cases, e.g. force load lazy images before scroll
  onRunBefore?: () => void;
}

/**
 * Scroll to element
 * @constructor
 */
const ScrollTo: FC<IScrollTo> = ({ to, onRunBefore, className, children, delay = 0, ...props }) => {
  const timer = useRef<NodeJS.Timer>();

  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const element = document.getElementById(to);

      onRunBefore?.();

      if (!element) {
        return;
      }

      timer.current = setTimeout(
        () => element.scrollIntoView({ block: 'start', behavior: 'smooth' }),
        delay,
      );

      return () => timer.current && clearTimeout(timer.current);
    },
    [delay, onRunBefore, to],
  );

  return (
    <a
      {...props}
      className={combineCss(styles.link, className ? className : '')}
      onClick={onClick}
      href={`#${to}`}>
      {children}
    </a>
  );
};

export default ScrollTo;
