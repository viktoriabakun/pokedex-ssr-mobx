import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import useToggle from '@hooks/use-toggle';
import styles from './styles.module.scss';

export interface IModalRef {
  toggle: () => void;
  isOpen: boolean;
}

interface IModal {
  shouldClickOutside: boolean;
  children: ReactNode;
}

const Modal = forwardRef<IModalRef, IModal>(({ children, shouldClickOutside, ...props }, ref) => {
  const [isOpen, toggle] = useToggle(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  const onOutsideClick = useCallback(
    () => shouldClickOutside && toggle(),
    [shouldClickOutside, toggle],
  );

  useImperativeHandle(ref, () => ({ isOpen, toggle }), [isOpen, toggle]);

  return (
    <div {...props} className={classNames(styles.modal, { [styles.open]: isOpen })}>
      <div className={styles.child}>{children}</div>
      <div role="presentation" onClick={onOutsideClick} className={styles.blurredBackground} />
    </div>
  );
});

export default Modal;
