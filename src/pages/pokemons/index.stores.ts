import type { StoresType } from '@interfaces/helpers';
import PokemonsStore from "@store/modules/pages/pokemons";

const stores = {
  pokemonsStore: PokemonsStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
