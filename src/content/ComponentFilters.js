import React from 'react';
import App from '../App';
import Icon from '../Icon';

export default function Content() {
  return (
    <App title={Content.title}>
      <p>
        Large component trees can sometimes be hard to navigate. DevTools
        provides a way to filter components so that you can hide ones you're not
        interested in seeing.
      </p>
      <p>
        For example, "host components" (e.g. <code>&lt;div&gt;</code>) are
        hidden by default. Let's turn this filter off to see which host
        components are used in our app.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click the settings button <Icon type="settings" /> in DevTools.
          </li>
          <li>Select the "Components" tab.</li>
          <li>
            Click on the toggle <Icon type="toggle" /> to the left of the "host"
            type filter to disable it.
          </li>
          <li>Close the settings dialog.</li>
          <li>
            The components tree should now contain several host components (
            <code>&lt;input&gt;</code>, <code>&lt;span&gt;</code>,{' '}
            <code>&lt;ul&gt;</code>, etc.)
          </li>
        </ol>
      </details>
      <p>
        Next let's try using component filters to hide both the{' '}
        <code>List</code> and <code>ListItem</code> components without hiding
        the <code>App</code> or <code>AddItem</code> components.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Re-open the Components settings <Icon type="settings" /> in
            DevTools.
          </li>
          <li>
            Click the <Icon type="add" /> "add filter" button
          </li>
          <li>
            Select "name" from the first menu and type "List" into the input
            field to the right.
          </li>
          <li>Close the settings dialog.</li>
          <li>
            The <code>List</code> and <code>ListItem</code> components should
            now be hidden, but the <code>&lt;ul&gt;</code> and{' '}
            <code>&lt;li&gt;</code> they render should be visible.
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Component Filters';
