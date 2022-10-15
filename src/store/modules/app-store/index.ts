import EventManager from '@lomray/event-manager';
import isMobile from 'ismobilejs';
import { action, makeObservable, observable } from 'mobx';
import PageLoading from '@services/page-loading';
import ScrollRestorationService from '@services/scroll-restoration';

interface ILoadingChanged {
  isLoading: boolean;
}

/**
 * App store
 */
class AppStore {
  static isSingleton = true;

  static id = 'appStore';

  /**
   * Transition between pages state
   */
  public isLoading = false;

  public isMobile = false;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isMobile: observable,
      setIsLoading: action.bound,
      detectMobile: action.bound,
    });
  }

  /**
   * Add store subscribers
   */
  public addSubscribers = (): (() => void) =>
    EventManager.subscribe<ILoadingChanged>('after:loading-changed', ({ isLoading }) => {
      this.setIsLoading(isLoading);
      PageLoading.setLoadingState(isLoading);
      ScrollRestorationService.setLoadingState(isLoading);
    });

  /**
   * Set transition between pages state
   */
  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public detectMobile(userAgent?: string): void {
    if (userAgent) {
      this.isMobile = isMobile(userAgent).any;
    }
  }
}

export default AppStore;
