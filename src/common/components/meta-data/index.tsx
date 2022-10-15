import React from 'react';
import { Helmet } from 'react-helmet';
import WebsiteScreenImage from '@assets/images/website-screen.png';

const MetaData = () => (
  <Helmet>
    <meta name="format-detection" content="telephone=no" />
    <meta httpEquiv="x-rim-auto-match" content="none" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={WebsiteScreenImage} />
    <meta property="og:image:url" content={WebsiteScreenImage} />
    <meta property="og:image:secure_url" content={WebsiteScreenImage} />
    <meta property="og:image:type" content="image/jpg" />
    <meta
      property="og:image:alt"
      content="EURO2MOON | Non-profit European platform to explore future uses of natural lunar resources and to develop the rising lunar economy."
    />
  </Helmet>
);

export default MetaData;
