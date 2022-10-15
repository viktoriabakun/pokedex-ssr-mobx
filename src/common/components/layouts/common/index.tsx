import React, { useEffect } from 'react';
import LoadingBar from '@components/loading-bar';
// import MetaData from '@components/meta-data';
import ScrollRestoration from '@components/scroll-restoration';
import { useAppContext } from '@context/app';
import initSPA from '@helpers/init-spa';
import InitialProps from '@helpers/initial-props';
import type { SSRLayoutComponent } from '@interfaces/ssr-component';
import stores from './index.stores';
import type { StoreProps } from './index.stores';

const Common: SSRLayoutComponent<StoreProps> = ({ children, appStore: { addSubscribers } }) => {
  const { hasLoadingBar } = useAppContext();

  /**
   * Initialize spa app
   */
  useEffect(() => {
    initSPA();
  }, []);

  /**
   * Add app subscribers
   */
  useEffect(() => addSubscribers(), [addSubscribers]);

  return (
    <>
      {hasLoadingBar && <LoadingBar />}
      {/*<MetaData />*/}
      <ScrollRestoration />
      {children}
    </>
  );
};

Common.getInitialProps = InitialProps(({ appStore: { detectMobile } }, { req }) => {
  detectMobile(req?.headers['user-agent']);
}, stores) as SSRLayoutComponent<StoreProps>['getInitialProps'];

export default Common;
