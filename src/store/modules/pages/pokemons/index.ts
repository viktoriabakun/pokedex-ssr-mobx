import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';
import type { IPokemonDetails } from '@store/endpoints/interfaces/pokemons/i-details';
import { IPokemon } from "@store/endpoints/interfaces/pokemons/i-list";

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
   * Get pokemons with details
   */
  public getPokemons = async (): Promise<void> => {
    const { result: pokemonsList } = await this.api.backend.getPokemons();

    const pokemonPromises = pokemonsList?.results.map(async ({ name }: IPokemon) => {
      const { result } = await this.api.backend.getPokemon(name)();

      return { ...result };
    }) as Promise<IPokemonDetails>[];

    const pokemons = await Promise.all(pokemonPromises);

    if (pokemons) {
      this.setPokemons(pokemons);
    }
  };
}

export default PokemonsStore;
