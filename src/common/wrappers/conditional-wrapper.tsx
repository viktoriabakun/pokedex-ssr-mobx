import type { FC, ReactElement } from 'react';

interface IConditionalWrapper {
  isCondition: boolean;
  wrapper: (children: ReactElement) => ReactElement;
  children: ReactElement;
}

const ConditionalWrapper: FC<IConditionalWrapper> = ({ isCondition, wrapper, children }) =>
  isCondition ? wrapper(children) : children;

export default ConditionalWrapper;
