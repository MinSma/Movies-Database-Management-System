import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import actors from './actors';
import genres from './genres';
import movies from './movies';
import movie from './movie';
import actor from './actor';

const rootReducer = combineReducers({ actors, actor, genres, movies, movie, form, routing: routerReducer });

export default rootReducer;