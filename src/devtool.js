// Must be included first (before React or any compoents that might include React).
import './components/reactDevTools/setupDevToolsBackend';

import React from 'react';
import { render } from 'react-dom';
import Home from './components/reactDevTools/content/Home';

import './components/reactDevTools/index.css';

render(<Home />, document.getElementById('root'));
