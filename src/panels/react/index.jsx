import React from 'react';
import ReactDevTool from '../../components/reactDevTool/App.js';
import { render } from 'react-dom';
const ReactDevTools = () => {
  return (
    <div
      onClick={() => {
        const mdebugContainerId = `mdebug${parseInt(Math.random() * Number.MAX_SAFE_INTEGER, 10)}`;
        const iframe = document.createElement('div');
        iframe.id = mdebugContainerId;
        document.body.appendChild(iframe);
        render(<ReactDevTool />, document.getElementById(mdebugContainerId));
      }}>
      enable dev tools
    </div>
  );
};

export default ReactDevTools;
