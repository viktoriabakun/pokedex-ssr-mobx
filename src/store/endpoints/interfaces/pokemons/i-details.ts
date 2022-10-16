export interface IPokemonDetails {
  id: number;
  name: string;
  types: IPokemonType[];
  sprites: IPokemonSprite;
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/**
 * Images or gifs of pokemon
 */
interface IPokemonSprite {
  ['front_default']: string;
  other: {
    ['official-artwork']: {
      ['front_default']: string;
    };
  };
  versions: {
    ['generation-v']: {
      ['black-white']: {
        animated: {
          ['back_default']: string;
          ['back_shiny']: string;
          ['back_shiny_female']: string;
          ['front_default']: string;
          ['front_female']: string;
          ['front_shiny']: string;
          ['front_shiny_female']: string;
        };
      };
    };
  };
}
