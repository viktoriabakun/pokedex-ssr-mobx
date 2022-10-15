/* eslint-disable @typescript-eslint/naming-convention */
import type Cookies from 'universal-cookie';

declare module 'express' {
  export interface Request {
    universalCookies?: Cookies;
  }
}
