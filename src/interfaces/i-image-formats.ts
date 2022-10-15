export interface IFormat {
  url: string;
  mime?: string;
  width?: number;
  // local property
  webp?: string;
  // local property
  destiny?: { '2x'?: string[]; '3x'?: string[] };
}

export enum Sizes {
  thumbnail = 'thumbnail',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type IImageFormats = {
  [key in keyof typeof Sizes]: IFormat;
};

export interface IImageBackend extends IFormat {
  alternativeText: string;
  formats: IImageFormats;
}
