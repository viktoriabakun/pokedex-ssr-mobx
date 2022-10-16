import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';
import type { IPokemonDetails } from '@store/endpoints/interfaces/pokemons/i-details';

/**
 * Pokemons store
 */
class PokemonsStore {
  /**
   * Store id
   */
  static id = 'PokemonsStore';

  /**
   * @private
   */
  private api: Endpoints;

  public pokemons: IPokemonDetails[] | null = null;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      pokemons: observable,
      setPokemons: action.bound,
    });
  }

  public setPokemons(pokemons: IPokemonDetails[]): void {
    this.pokemons = pokemons;
  }

  /**
   * Get pokemons
   */
  public getPokemons = async (): Promise<void> => {
    //probably here need to add some conditions on errors

    const { result: pokemonsList } = await this.api.backend.getPokemons();

    // get pokemons ids
    // probably not the best way to get ids =)
    const pokemonIds = pokemonsList?.results.map((pokemon: any, index: number) => index + 1);

    // get promises array for pokemons
    const pokemonPromises = pokemonIds?.map(async (id: number) => {
      const { result } = await this.api.backend.getPokemon(id)();

      return { ...result };
    }) as Promise<IPokemonDetails>[];

    // get pokemons with details
    // this all will be fetching on server side
    // and client will get only pokemons list with HTML
    const pokemons = await Promise.all(pokemonPromises);

    if (pokemons) {
      this.setPokemons(pokemons);
    }
  };
}

export default PokemonsStore;
