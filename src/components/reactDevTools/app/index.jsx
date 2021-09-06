import React from 'react';
import BrowserWindow from '../browser/browserWindow';

import styles from './App.module.css';

export default function App({ children, defaultTabID, iframeSource, title }) {
  return (
    <div className={styles.App}>
      <div className={styles.Right}>
        <BrowserWindow defaultTabID={defaultTabID} iframeSource={iframeSource} title={title} />
      </div>
    </div>
  );
}
