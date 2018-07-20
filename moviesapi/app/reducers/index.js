import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import actors from './actors';
import genres from './genres';
import movies from './movies';

const rootReducer = combineReducers({ actors, genres, movies, form, routing: routerReducer });

export default rootReducer;