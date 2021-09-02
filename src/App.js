import React from 'react';
import FakeBrowserWindow from './FakeBrowserWindow';

import styles from './App.module.css';

export default function App({ children, defaultTabID, iframeSource, title }) {
  return (
    <div className={styles.App}>
      <div className={styles.Spacer} />
      <div className={styles.Right}>
        <FakeBrowserWindow
          defaultTabID={defaultTabID}
          iframeSource={iframeSource}
          title={title}
        />
      </div>
    </div>
  );
}
