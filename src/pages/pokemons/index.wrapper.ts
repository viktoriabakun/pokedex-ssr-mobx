import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import Pokemons from './index';

export default withStores(Pokemons, stores);
