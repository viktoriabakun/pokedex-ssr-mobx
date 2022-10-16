import { IPokemons } from "@store/endpoints/interfaces/pokemons/i-list";

export interface IPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemons;
}
