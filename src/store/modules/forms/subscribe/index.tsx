import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';

/**
 * Subscribe Store
 */
class SubscribeStore {
  /**
   * Store id
   */
  static id = 'SubscribeStore';

  /**
   * Transition between pages state
   */
  public isLoading = false;

  /**
   * Footer Subscribe form API response
   */
  public error = '';

  /**
   * Footer Subscribe form API success state
   */
  public isSuccess = false;

  /**
   * @private
   */
  private api: Endpoints;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      isLoading: observable,
      isSuccess: observable,
      setIsLoading: action.bound,
      setIsSuccess: action.bound,
      sendSubscribe: action.bound,
    });
  }

  public async sendSubscribe(value: any): Promise<void> {
    this.setIsLoading(true);

    const { result, error } = await this.api.backend.subscribe({ data: value.data });

    if (error) {
      this.setError('Something went wrong');
    }

    if (result) {
      this.setIsSuccess(Boolean(result));
    }

    this.setIsLoading(false);
  }

  /**
   * Set error
   */
  public setError(error: string): void {
    this.error = error;
  }

  /**
   * Set isLoading state
   */
  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Set isSuccess state
   */
  public setIsSuccess(isSuccess: boolean): void {
    this.isSuccess = isSuccess;
  }
}

export default SubscribeStore;
