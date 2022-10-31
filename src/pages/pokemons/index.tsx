import React from 'react';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import type { StoreProps } from './index.stores';
import stores from './index.stores';
import PokemonListItem from "@pages/pokemons/list-item";
import styles from './styles.module.scss';


type IPokemons = StoreProps;

const Pokemons: SSRComponent<IPokemons> = ({ pokemonsStore: { pokemons } }) => (
  <div style={{ fontSize: '2rem' }}>
    <h1>Pokemons</h1>
    <a href="https://pokeapi.co/api/v2/pokemon" target="_blank">
      https://pokeapi.co/api/v2/pokemon
    </a>

    <ul className={styles.listContainer}>
      {pokemons?.map(({ name, sprites: { front_default: imgUrl } }) => (
        <PokemonListItem key={name} name={name} imgUrl={imgUrl} />
      ))}
    </ul>
  </div>
);

Pokemons.getInitialProps = InitialProps(async ({ pokemonsStore: { getPokemons } }) => {
  await getPokemons();
}, stores);

export default Pokemons;
