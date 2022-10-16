import type { IConstructorParams } from "@lomray/react-mobx-manager";
import { action, makeObservable, observable } from "mobx";
import type Endpoints from "@store/endpoints";
import { IPokemon, IPokemons } from "@store/endpoints/interfaces/pokemons/i-list";

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

  public pokemons: IPokemons | null = null;

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

  public setPokemons(pokemons: IPokemon[]): void {
    this.pokemons = pokemons;
  }

  /**
   * Get pokemons
   */
  public getPokemons = async (): Promise<void> => {
    const { result } = await this.api.backend.getPokemons();

    if (result) {
      this.setPokemons([...result?.results]);
    }
  };
}

export default PokemonsStore;
