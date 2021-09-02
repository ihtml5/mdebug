import React from 'react';
import Icon from '../Icon';
import App from '../App';

export default function Content() {
  return (
    <App title={Content.title}>
      <p>
        In React, an element's "owner" refers to the thing that rendered it.
        Sometimes an element's parent is also its owner, but usually they're
        different. This distinction is important because props come from owners.
      </p>
      <p>
        Let's use DevTools to find out which component rendered{' '}
        <code>AddItem</code>.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Select <code>AddItem</code> in the tree.
          </li>
          <li>In the right hand panel, scroll to the bottom.</li>
          <li>
            Underneath the "rendered by" header, you should see{' '}
            <code>Header</code> then <code>App</code>.
          </li>
          <li>
            The order of these indicates that <code>App</code> rendered{' '}
            <code>Header</code> and <code>Header</code> rendered{' '}
            <code>AddItem</code>.
          </li>
          <li>Click on either to select that component in the tree.</li>
        </ol>
      </details>
      <p>
        Sometimes it can be useful to see the list of things rendered by a
        particular component- (the things it "owns"). This can be a helpful way
        to explore large, unfamiliar React applications.
      </p>
      <p>
        Let's use DevTools to find out which components are owned (rendered by){' '}
        <code>App</code>.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Double click <code>App</code> in the tree.
          </li>
          <li>
            The tree now contains only the elements that were rendered by{' '}
            <code>App</code>.
          </li>
          <li>
            Double click on the <code>Header</code> element to zoom in further.
          </li>
          <li>
            The tree now contains only the elements that were rendered by{' '}
            <code>Header</code>.
          </li>
          <li>
            You can click on <code>App</code> in the toolbar above to zoom back
            out.
          </li>
          <li>
            When you are done, click the <Icon type="close" /> close button to
            return to the main components tree.
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Exploring Owners';
