import React from 'react';
import App from '../App';
import Icon from '../Icon';

export default function Content() {
  return (
    <App title={Content.title} defaultTabID="profiler">
      <p>
        The DevTools profiler is a powerful tool for performance tuning React
        components. It helps identify parts of an application that are slow and
        may benefit from optimizations such as memoization.
      </p>
      <p>
        Let's use the profiler to see what happens when we add a new todo list
        item.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click the <Icon type="record" /> record button to start profiling.
          </li>
          <li>
            Type something in the input up top and click the <Icon type="add" />{' '}
            add button.
          </li>
          <li>
            Click the <Icon type="record" /> record button to stop profiling.
          </li>
          <li>
            DevTools should now display data for each time React updated while
            you were profiling.
          </li>
        </ol>
      </details>
      <p>
        Using the newly recorded profiling data, let's see how many times the{' '}
        <code>List</code> component updated.
      </p>
      <details>
        <summary>Show me how.</summary>
        <ol>
          <li>
            Click on the <code>List</code> component in the flame graph to
            select it.
          </li>
          <li>
            In the right-hand panel, under "rendered at", you should see one
            entry.
          </li>
          <li>Click that entry to jump to that specific update.</li>
        </ol>
      </details>
      <p>
        The profiler is a very powerful tool. To learn more about it, check out
        the{' '}
        <a href="https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html">
          profiler documentation on reactjs.org
        </a>
        .
      </p>
    </App>
  );
}

Content.title = 'Profiling';
