import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers/app';
import profileReducer from './reducers/profile';
import postsReducer from './reducers/posts';
import usersReducer from './reducers/users';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	app: appReducer,
	profile: profileReducer,
	posts: postsReducer,
	users: usersReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
