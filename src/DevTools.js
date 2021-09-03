import React, { useLayoutEffect, useState } from 'react';
import {
  activate as activateBackend,
  initialize as initializeBackend,
} from 'react-devtools-inline/backend';
import { initialize as initializeFrontend } from 'react-devtools-inline/frontend';

export default function DevTools({ iframeRef, tabID }) {
  const [DevTools, setDevTools] = useState(null);

  useLayoutEffect(() => {
    const iframe = iframeRef.current;

    const contentWindow = iframe.contentWindow;

    contentWindow.__REACT_DEVTOOLS_TARGET_WINDOW__ = window;

    initializeBackend(contentWindow);

    localStorage.removeItem('React::DevTools::componentFilters');

    const DevTools = initializeFrontend(contentWindow);

    setDevTools(DevTools);

    activateBackend(contentWindow);
  }, [iframeRef]);

  return DevTools !== null && <DevTools overrideTab={tabID} />;
}
