import React from 'react';
import App from '../App';
import Icon from '../Icon';

export default function Content() {
  return (
    <App title={Content.title}>
      <p>
        Beside of this is an example TODO List. To add a new item to the list,
        enter some text and click the <Icon type="add" /> button.
      </p>
      <p>
        Using React DevTools, can you identify which component rendered the{' '}
        <Icon type="add" /> button?
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click the selector button <Icon type="selector" /> in DevTools.
          </li>
          <li>
            Then click on the <Icon type="add" /> button in the app above.
          </li>
          <li>
            The <code>AddItem</code> component should now be selected.
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Element selector tool';
