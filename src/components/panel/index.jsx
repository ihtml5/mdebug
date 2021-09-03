import React, { memo } from 'react';
import Protector from '@/components/protector';
import styles from './pannel.module.css';

const Panel = props => {
  const { isActive, children, id } = props;
  if (id === 'react') {
    return null;
  }
  if (isActive) {
    return (
      <Protector name={id}>
        <div className={styles['mdebug-panel']}>{children}</div>
      </Protector>
    );
  }
  return null;
};

export default memo(Panel);
