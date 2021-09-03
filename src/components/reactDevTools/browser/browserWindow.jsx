import React, { useRef, useState } from 'react';
import DevTools from './DevTools';

import styles from './browserWindow.module.css';

export default function FakeBrowserWindow({
  defaultTabID = 'components',
  iframeSource = 'example-todo-list-app.js',
  title,
}) {
  const iframeRef = useRef(null);
  const [tabID, setTabID] = useState(defaultTabID);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.BrowserWindow}>
        <div className={styles.BrowserContent}>
          <iframe
            style={{
              position: 'fixed',
              left: -10000,
              bottom: -10000,
            }}
            key={iframeSource}
            ref={iframeRef}
            className={styles.Frame}
            title="mdebug-devtools"
            src={window.location.href}></iframe>
          <div className={styles.TabBar}>
            <div
              className={tabID === 'components' ? styles.TabActive : styles.Tab}
              onClick={() => setTabID('components')}>
              <span
                className={styles.ReactIcon}
                role="img"
                aria-label="React Components tab button">
                ⚛️
              </span>
              Components
            </div>
            <div
              className={tabID === 'profiler' ? styles.TabActive : styles.Tab}
              onClick={() => setTabID('profiler')}>
              <span className={styles.ReactIcon} role="img" aria-label="React Profiler tab button">
                ⚛️
              </span>
              Profiler
            </div>
          </div>
          <div className={styles.DevTools}>
            <DevTools
              hidden={tabID !== 'components' && tabID !== 'profiler'}
              iframeRef={iframeRef}
              tabID={tabID}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
