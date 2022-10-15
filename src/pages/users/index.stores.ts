import type { StoresType } from '@interfaces/helpers';
import UsersStore from '@store/modules/pages/users';

const stores = {
  usersStore: UsersStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
