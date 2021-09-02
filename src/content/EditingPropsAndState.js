import React from 'react';
import App from '../App';

export default function Content() {
  return (
    <App title={Content.title}>
      <p>
        Editing props and state in DevTools can be a quick way to test a
        component.
      </p>
      <p>
        Let's complete the third item on our todo list (laundry). We could just
        click the item to do this, but let's do it with DevTools.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Select the third <code>ListItem</code> in the Components tree.
          </li>
          <li>
            In the right side panel, click to expand the <code>item</code> prop.
          </li>
          <li>
            Click to toggle the <code>isComplete</code> attribute.
          </li>
          <li>The item should now be checked in the example app above.</li>
        </ol>
      </details>
      <p>Let's change the entry text too.</p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            In the same right side panel, click the text input to the right of{' '}
            <code>text</code>
          </li>
          <li>Edit the text and then type "Enter".</li>
          <li>The item should now show the new text you've entered.</li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Editing Props and State';
