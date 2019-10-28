import { FETCH_PROFILE, FETCH_POSTS, NEW_POST } from '../actions/profile';

const defaultState = {
	username: null,
	description: null,
	profilePic: null,	
	posts: [1]	
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case FETCH_PROFILE:
			return {
				...action.payload.response
			}			
		case FETCH_POSTS:
			return {
				...state,
				posts: action.payload.posts
			}
		case NEW_POST:			
			return {
				...state,
				posts: [action.payload.newPost, ...state.posts]
			}
		default:
			return state;
	}
}