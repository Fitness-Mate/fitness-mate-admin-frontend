import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as modules from './index';

const configure = createStore(combineReducers(modules), composeWithDevTools());

export default configure;
