import { combineReducers } from 'redux';

import system from './system';
import tabInfo from './tab';
import application from './application';
import settings from './settings';
import network from './network';
import console from './console';

const rootReducer = combineReducers({
    tabInfo,
    system,
    application,
    settings,
    network,
    console,
});

export default rootReducer;
