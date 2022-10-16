import React from "react";
import InitialProps from "@helpers/initial-props";
import type { SSRComponent } from "@interfaces/ssr-component";
import type { StoreProps } from "./index.stores";
import stores from "./index.stores";

type IPokemons = StoreProps;

const Pokemons: SSRComponent<IPokemons> = ({ pokemonsStore: { pokemons } }) =>
  (
    <div style={{ fontSize: "2rem" }}>
      <h1>Pokemons</h1>
      <a href="https://pokeapi.co/api/v2/pokemon" target="_blank">
        https://pokeapi.co/api/v2/pokemon
      </a>

      <ul>
        {pokemons?.map(({ name, url }) => (
          <li key={name} style={{ fontSize: "2rem" }}>
            <a href={url}><h2>{name}</h2></a>
          </li>
        ))}
      </ul>
    </div>
  );

Pokemons.getInitialProps = InitialProps(async ({ pokemonsStore: { getPokemons } }) => {
  await getPokemons();
}, stores);

export default Pokemons;
