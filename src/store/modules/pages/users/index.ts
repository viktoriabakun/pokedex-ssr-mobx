import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';
import type { IUsers } from '@store/endpoints/interfaces/i-users';

/**
 * Home store
 */
class UsersStore {
  /**
   * Store id
   */
  static id = 'UsersStore';

  /**
   * @private
   */
  private api: Endpoints;

  public users: IUsers | null = null;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      users: observable,
      setUsers: action.bound,
    });
  }

  public setUsers(users: any[]): void {
    this.users = users;
  }

  /**
   * Get users details
   */
  public getUsers = async (): Promise<void> => {
    const { result } = await this.api.backend.getUsers();

    if (result) {
      this.setUsers(result);
    }
  };
}

export default UsersStore;
