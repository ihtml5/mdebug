// Must be included first (before React or any compoents that might include React).
import './setupDevToolsBackend';

import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import Home from './content/Home';
import ROUTES from './routes';

import './index.css';

// const root = createSyncRoot();
render(
  <Router>
    <Home path="/" />
  </Router>,
  document.getElementById('root'),
);
