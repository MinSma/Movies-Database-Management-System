import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import actors from './actors';
import genres from './genres';
import movies from './movies';
import movie from './movie';

const rootReducer = combineReducers({ actors, genres, movies, movie, form, routing: routerReducer });

export default rootReducer;