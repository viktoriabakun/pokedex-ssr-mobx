import type { Method } from 'axios';
import type ApiClient from '@services/api-client';
import type { IApiClientReqOptions } from '@services/api-client';
import type { IUsers } from './interfaces/i-users';

interface IEndpointsCreateHandlerConfig extends Pick<IApiClientReqOptions, 'isCached'> {}

interface IEndpointsCreateHandlerOptions extends Omit<IApiClientReqOptions, 'isCached'> {}

/**
 * Backend API endpoints
 */
class Endpoints {
  /**
   * API client
   */
  public readonly apiClient: ApiClient;

  /**
   * @constructor
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;

    apiClient.setEndpoints(this);
  }

  /**
   * Create endpoint handler
   */
  private createHandler =
    <TInput, TOutput>(
      url: string,
      method: Method,
      { isCached }: IEndpointsCreateHandlerConfig = {},
    ) =>
    (params?: TInput, options?: IEndpointsCreateHandlerOptions) =>
      this.apiClient.sendRequest<TOutput, TInput>(url, method, params, {
        isCached,
        ...options,
      });

  /**
   * Backend API
   */
  backend = {
    getUsers: this.createHandler<never, IUsers>('/users', 'GET'),
    subscribe: this.createHandler<any, never>('/api/footer-requests', 'POST'),
  };
}

export default Endpoints;
