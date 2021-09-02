import React from 'react';
import Icon from '../Icon';
import App from '../App';

export default function Content() {
  return (
    <App iframeSource="example-suspense-app.js" title={Content.title}>
      <p>
        React's experimental{' '}
        <a href="https://reactjs.org/docs/react-api.html#suspense">
          Suspense API
        </a>{' '}
        lets components "wait" for something before rendering.{' '}
        <code>&lt;Suspense&gt;</code> components can be used to specify loading
        states when components deeper in the tree are waiting to render.
      </p>
      <p>
        There are a couple of suspense boundaries in the nearby example app.
        Let's test the loading state for the entire email app.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click to select <code>EmailClient</code> in the tree.
          </li>
          <li>
            In the right hand panel, click the <Icon type="suspend" /> suspense
            toggle to suspend.
          </li>
          <li>
            The entire app should now be hidden and the loading fallback should
            be shown instead.
          </li>
          <li>
            In the right hand panel, click the <Icon type="suspend" /> suspense
            toggle again to unsuspend.
          </li>
          <li>The app should be visible again</li>
        </ol>
      </details>
      <p>Let's test one of the nested suspense boundaries next.</p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click to select any of the <code>Label</code> components in the
            tree.
          </li>
          <li>
            In the right hand panel, click the <Icon type="suspend" /> suspense
            toggle to suspend.
          </li>
          <li>
            The label should now be hidden and an inline loading fallback should
            be shown instead.
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Toggling Suspense Fallbacks';
