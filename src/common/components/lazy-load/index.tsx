import React from 'react';
import type { LazyLoadProps } from 'react-lazyload';
import DefaultLazyLoad from 'react-lazyload';
import type { FCC } from '@interfaces/fc-with-children';

const LazyLoad: FCC<LazyLoadProps> = ({ children, height = 400, ...props }) => (
  <DefaultLazyLoad {...props} height={height}>
    {children}
  </DefaultLazyLoad>
);

export default LazyLoad;
