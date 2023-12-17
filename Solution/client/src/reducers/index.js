import { combineReducers } from 'redux';

import posts from './posts';
import post from './post'
import auth from './auth';
import user from './user';
import search from './search';

export const reducers = combineReducers({ posts, post, auth, user, search });