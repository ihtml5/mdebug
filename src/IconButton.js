// @flow

import React from 'react';
import Icon from './Icon';

import styles from './IconButton.module.css';

export default function IconButton({
  className = '',
  isDisabled = false,
  onClick,
  type,
}) {
  const classNames = [
    className,
    isDisabled ? styles.ButtonDisabled : styles.Button,
  ];

  return (
    <button
      className={classNames.join(' ')}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon className={styles.Icon} type={type} />
    </button>
  );
}
