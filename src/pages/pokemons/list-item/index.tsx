import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IPokemonListItem {
  name: string;
  imgUrl: string;
}

const PokemonListItem: FC<IPokemonListItem> = ({ name, imgUrl }) => (
  <li className={styles.container}>
    <div className={styles.content}>
      <img className={styles.image} src={imgUrl} alt={name} />
      <h2 className={styles.name}>{name}</h2>
    </div>
  </li>
);

export default PokemonListItem;
