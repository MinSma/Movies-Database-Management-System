import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import actors from './actors';
import genres from './genres';
import movies from './movies';

const rootReducer = combineReducers({ actors, genres, movies, routing: routerReducer });

export default rootReducer;