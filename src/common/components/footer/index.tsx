import type { FC } from 'react';
import React, { memo } from 'react';
import { CURRENT_YEAR } from '@constants/index';
import styles from './styles.module.scss';

const Footer: FC = () => <footer className={styles.footer}>{CURRENT_YEAR}</footer>;

export default memo(Footer);
