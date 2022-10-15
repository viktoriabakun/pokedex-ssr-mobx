import type {
  After as AfterComponent,
  AfterpartyProps,
  DocumentgetInitialProps,
  DocumentProps,
  RenderPageResult,
} from '@lomray/after';
import {
  AfterData,
  AfterRoot,
  AfterScripts,
  AfterStyles,
  SerializeData,
  __AfterContext,
} from '@lomray/after';
import { StoreManagerProvider } from '@lomray/react-mobx-manager';
import type { ReactElement } from 'react';
import React, { Component } from 'react';
import CommonLayout from '@components/layouts/common/index.wrapper';
import { APP_NAME, BACKGROUND_COLOR, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import { iosIcons, manifestPath } from '@server/config';

/**
 * @see Manager.toJSON
 * @constructor
 */
function StoreData() {
  const { storeManager } = React.useContext(__AfterContext);

  return <SerializeData name="preloadedState" data={storeManager.toJSON()} />;
}

class Document extends Component<DocumentProps> {
  /**
   * order:
   * - component
   * - layout
   * - this document
   * - return html to client
   */
  static async getInitialProps(ctx: DocumentgetInitialProps): Promise<RenderPageResult> {
    const { renderPage, req, helmet, storeManager } = ctx;

    /**
     * Return only app-shell (for PWA)
     */
    if (IS_PWA && req.originalUrl === '/app-shell') {
      return {
        html: '',
        helmet,
        isOnlyShell: true,
      };
    }

    if (typeof CommonLayout['getInitialProps'] === 'function') {
      await CommonLayout['getInitialProps'](ctx);
    }

    const serverContext = {
      cookies: req.universalCookies,
      isWebpSupport: req.headers?.accept?.indexOf('image/webp') !== -1,
      domain: `${req.protocol}://${req.get('host') as string}`,
    };

    // @ts-ignore
    const page = await renderPage((After: typeof AfterComponent) => (props: AfterpartyProps) => (
      <StoreManagerProvider storeManager={storeManager}>
        <AppProvider initValue={serverContext}>
          <CommonLayout>
            <After {...props} storeManager={storeManager} />
          </CommonLayout>
        </AppProvider>
      </StoreManagerProvider>
    ));

    return {
      ...page,
    };
  }

  render(): ReactElement {
    const { helmet, isOnlyShell } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    // noinspection HtmlRequiredTitleElement
    return (
      <html lang="en" {...htmlAttrs}>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content={BACKGROUND_COLOR} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          {manifestPath && <link rel="manifest" href={`/${manifestPath}`} />}
          {iosIcons.length > 0 &&
            iosIcons.map(({ size, link }) => (
              <link key={link} rel="apple-touch-icon" sizes={size} href={link} />
            ))}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <AfterStyles />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          {!isOnlyShell && <StoreData />}
          <AfterScripts />
        </body>
      </html>
    );
  }
}

export default Document;
