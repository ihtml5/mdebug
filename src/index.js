// Must be included first (before React or any compoents that might include React).
import './setupDevToolsBackend';

import React from 'react';
import { render } from 'react-dom';
import Home from './content/Home';

import './index.css';

render(<Home />, document.getElementById('root'));
