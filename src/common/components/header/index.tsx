import React, { memo } from 'react';
import type { FC } from 'react';
import styles from './styles.module.scss';

const Header: FC = () => <header className={styles.header}></header>;

export default memo(Header);
