import React from 'react';
import App from '../App';

export default function Content() {
  return (
    <App iframeSource="example-with-hocs.js" title={Content.title}>
      <p>
        <a href="https://reactjs.org/docs/higher-order-components.html">
          Higher order components
        </a>{' '}
        (or HOCs) often provide a{' '}
        <a href="https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging">
          custom "displayName"
        </a>{' '}
        in order to be more easily identifiable in React warnings and in
        DevTools. The Components tree formats these HOC names as a special badge
        to the right of the component name.
      </p>
      <p>Can you spot the HOC used in the example app?</p>
      <details>
        <summary>Show me.</summary>
        <ol>
          <li>
            The <code>ShowTheTime</code> component rendered by <code>App</code>{' '}
            is a HOC (<code>withCurrentDate</code>)
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Higher Order Components';
