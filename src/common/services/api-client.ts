import type { Manager } from '@lomray/react-mobx-manager';
import type { AxiosError, AxiosRequestConfig, Method } from 'axios';
import axios from 'axios';
import { API_DOMAIN } from '@constants/index';
import type Endpoints from '@store/endpoints';

export interface IApiClientReqOptions {
  isCached?: boolean;
  request?: AxiosRequestConfig;
}

interface IApiClientParams {
  headers?: Record<string, any>;
}

/**
 * API client service
 */

class ApiClient {
  /**
   * API Endpoints
   * @private
   */
  private endpoints: Endpoints;

  /**
   * Mobx store manager
   * @private
   */
  private storeManager: Manager;

  /**
   * Request headers
   * @private
   */
  private readonly headers?: Record<string, any>;

  /**
   * @constructor
   */
  constructor({ headers }: IApiClientParams = {}) {
    // do not pass this to axios
    if (headers?.host) {
      delete headers.host;
    }

    this.headers = headers;
  }

  /**
   * Set API endpoints
   */
  public setEndpoints(endpoints: Endpoints): void {
    this.endpoints = endpoints;
  }

  /**
   * Set store manager
   */
  public setStoreManager(manager: Manager): void {
    this.storeManager = manager;
  }

  /**
   * Handle network and other internal errors
   * @private
   */
  private static handleInternalError(e: AxiosError): Error {
    const { message, response, code } = e || {};
    let errMessage = message;

    // api timeout
    if ((code === 'ECONNABORTED' && message.includes('timeout')) || response?.status === 504) {
      errMessage = 'Some think went wrong. Try again later.';
    } else if (!response && message === 'Network Error') {
      errMessage = 'No internet connection';
    }

    return new Error(errMessage);
  }

  /**
   * Send request to API
   */
  public async sendRequest<TResponse, TRequest>(
    url: string,
    method?: Method,
    params?: TRequest,
    options: IApiClientReqOptions = {},
  ): Promise<{ result?: TResponse; error?: Error }> {
    const { request = {} } = options;

    try {
      const { data } = await axios.request<TResponse>({
        baseURL: API_DOMAIN,
        method,
        url,
        headers: this.headers,
        ...request,
        ...(method?.toLowerCase() !== 'get' ? { data: params } : {}),
      });

      return { result: data };
    } catch (e) {
      return {
        error: ApiClient.handleInternalError(e as AxiosError),
      };
    }
  }
}

export default ApiClient;
