import React, { useEffect, useRef, useState } from 'react';
import IconButton from './IconButton';
import { usePrevAndNextRoutes } from './hooks';
import { navigate } from '@reach/router';
import DevTools from './DevTools';

import styles from './FakeBrowserWindow.module.css';

function loadBabel(iframe, scriptSource) {
  fetch(scriptSource)
    .then((response) => response.text())
    .then((input) => {
      const { contentDocument } = iframe;

      if (contentDocument == null) {
        // We unmounted in the middle of the sequence.
        return;
      }

      // eslint-disable-next-line no-undef
      const { code } = Babel.transform(input, { presets: ['es2015', 'react'] });

      const script = contentDocument.createElement('script');
      script.textContent = code;

      contentDocument.head.appendChild(script);
    });
}

function loadScript(iframe, scriptSource, onLoadFn) {
  const { contentDocument } = iframe;

  const script = contentDocument.createElement('script');
  script.addEventListener('load', onLoadFn);
  script.src = scriptSource;

  contentDocument.head.appendChild(script);
}

export default function FakeBrowserWindow({
  defaultTabID = 'components',
  iframeSource = 'example-todo-list-app.js',
  title,
}) {
  const iframeRef = useRef(null);
  const [tabID, setTabID] = useState(defaultTabID);

  const { nextLink, prevLink } = usePrevAndNextRoutes();

  useEffect(() => {
    if (iframeSource) {
      const iframe = iframeRef.current;
      iframe.addEventListener('load', () => {
        // Load React, ReactDOM, and example app after hook has been installed.
        // loadScript(
        //   iframe,
        //   'https://unpkg.com/react@0.0.0-a1dbb852c/umd/react.development.js',
        //   () =>
        //     loadScript(
        //       iframe,
        //       'https://unpkg.com/react-dom@0.0.0-a1dbb852c/umd/react-dom.development.js',
        //       () =>
        //         loadScript(
        //           iframe,
        //           'https://unpkg.com/mdebug@latest/dist/index.js',
        //           () => loadBabel(iframe, iframeSource),
        //         ),
        //     ),
        // );
      });
    }
  }, [iframeSource]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.BrowserWindow}>
        {/* <div className={styles.BrowserRow}>
          <div className={styles.BrowserColumnLeft}>
            <IconButton
              className={styles.BrowserButton}
              isDisabled={prevLink === null}
              onClick={() => navigate(prevLink)}
              type="left"
            />
            <IconButton
              className={styles.BrowserButton}
              isDisabled={nextLink === null}
              onClick={() => navigate(nextLink)}
              type="right"
            />
          </div>
          <div className={styles.BrowserColumnMiddle}>
            <div className={styles.BrowserInput}>{title}</div>
          </div>
          <div className={styles.BrowserColumnRight}>
            <div className={styles.BrowserMenuRight}>
              <span className={styles.BrowserBar} />
              <span className={styles.BrowserBar} />
              <span className={styles.BrowserBar} />
            </div>
          </div>
        </div> */}
        <div className={styles.BrowserContent}>
          <iframe
            key={iframeSource}
            ref={iframeRef}
            className={styles.Frame}
            title="Demo app"
            src={window.location.href}
          ></iframe>
          <div className={styles.TabBar}>
            <div
              className={tabID === 'components' ? styles.TabActive : styles.Tab}
              onClick={() => setTabID('components')}
            >
              <span
                className={styles.ReactIcon}
                role="img"
                aria-label="React Components tab button"
              >
                ⚛️
              </span>
              Components
            </div>
            <div
              className={tabID === 'profiler' ? styles.TabActive : styles.Tab}
              onClick={() => setTabID('profiler')}
            >
              <span
                className={styles.ReactIcon}
                role="img"
                aria-label="React Profiler tab button"
              >
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
