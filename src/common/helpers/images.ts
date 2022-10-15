import { MINIMUM_IMG_THUMBNAIL_WIDTH } from '@constants/index';
import type { IFormat, IImageFormats } from '@interfaces/i-image-formats';

// [original, webp]
type ImageSet = [string] | [string, string];

export enum MimeType {
  WEBP = 'image/webp',
  PNG = 'image/png',
  JPG = 'image/jpeg',
  GIF = 'image/gif',
}

interface ISet {
  '1x': ImageSet;
  '2x'?: ImageSet;
  '3x'?: ImageSet;
  size: keyof IImageFormats;
  mime: MimeType;
  width: number;
}

/**
 * Create image set for size
 */
const createImageSet = (set: ISet[]): Partial<IImageFormats> =>
  set.reduce((res, sizeSet) => {
    res[sizeSet.size] = {
      url: sizeSet['1x'][0],
      width: sizeSet.width,
      mime: sizeSet.mime,
      webp: sizeSet?.['1x']?.[1],
      destiny: {
        '2x': sizeSet?.['2x'],
        '3x': sizeSet?.['3x'],
      },
    };

    return res;
  }, {});

/**
 * Check backend images without thumbnails
 */
const isMinimumSize = (image?: IFormat) =>
  image?.width !== undefined && image.width < MINIMUM_IMG_THUMBNAIL_WIDTH;

/**
 * Replace image extension to webp
 */
const getWebpUrl = (image?: IFormat): string | undefined => {
  // Very small image from backend, without thumbnails
  if (isMinimumSize(image)) {
    return undefined;
  }

  if (image?.webp === undefined) {
    return image?.url?.replace(/\.(jpg|png|jpeg|gif)/g, '.webp') ?? '';
  }

  return image.webp || undefined;
};

/**
 * Get density image set for size
 */
const getDensitySet = (format?: IFormat): { original?: string; webp?: string } => {
  if (!format || !format.url || isMinimumSize(format)) {
    return {};
  }

  const original = [] as string[];
  const webp = [] as string[];

  original.push(`${format.url} 1x`);

  // local
  if (format.webp) {
    webp.push(`${format.webp} 1x`);
  }

  if (format.destiny) {
    // local images
    Object.entries(format.destiny).forEach(([density, densityUrls]) => {
      if (!densityUrls?.length) {
        return;
      }

      original.push(`${densityUrls[0]} ${density}`);

      if (densityUrls?.[1]) {
        webp.push(`${densityUrls[1]} ${density}`);
      }
    });
  } else {
    // backend images has no density property (add /@2x/ before file name)
    const densityUrl = format.url.split('/');

    densityUrl[densityUrl.length - 1] = `@2x/${densityUrl[densityUrl.length - 1]}`;

    const backendImgUrl = densityUrl.join('/');

    original.push(`${backendImgUrl} 2x`);
    webp.push(
      `${getWebpUrl({ url: format.url }) ?? ''} 1x`,
      `${getWebpUrl({ url: backendImgUrl }) ?? ''} 2x`,
    );
  }

  return {
    original: original.join(', '),
    webp: webp.join(', '),
  };
};

export { createImageSet, getWebpUrl, getDensitySet };
