import React from 'react';
import App from '../App';
import Icon from '../Icon';

export default function Content() {
  return (
    <App title={Content.title} defaultTabID="profiler">
      <p>
        Sometimes it can be useful to share profiling data with someone else, or
        to save it for later for comparison purposes. Let's familiarize
        ourselves with the process of exporting profiling data.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click the <Icon type="record" /> record button to start profiling.
          </li>
          <li>Add or a remove a todo list item.</li>
          <li>
            Click the <Icon type="record" /> record button to stop profiling.
          </li>
          <li>
            Click the <Icon type="export" /> export button.
          </li>
          <li>
            A JSON file containing profiling data should now be downloading.
          </li>
        </ol>
      </details>
      <p>
        Now let's re-import the data, but first- reload the page or click the{' '}
        <Icon type="clear" /> clear button.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click the <Icon type="import" /> import button.
          </li>
          <li>Select the JSON file that was downloaded earlier.</li>
          <li>
            The profiler should now show the data that was exported earlier.
          </li>
        </ol>
      </details>
    </App>
  );
}

Content.title = 'Sharing Profile Data';
