import { FETCH_PROFILE, FETCH_POSTS, NEW_POST, DELETE_POST, RESTART_STATE } from '../actions/profile';

const defaultState = {
	username: null,
	description: null,
	profilePic: null,	
	posts: {
		isThereMore: true,
		offset: 0,
		quantity: 5,		
		items: []
	}
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case FETCH_PROFILE:
			return {
				...state,
				...action.payload.response
			}			
		case FETCH_POSTS:

			if(!!action.payload.posts.length)
				return {
					...state,
					posts: {
						...state.posts,
						quantity: state.posts.quantity,
						offset: state.posts.offset + state.posts.quantity,
						items: [...state.posts.items,...action.payload.posts]
					}
				}
			return {
				...state,
				posts: {
					...state.posts,
					isThereMore: false
				}
			}
		case NEW_POST:			
			return {
				...state,
				posts: {
					...state.posts,
					items: [action.payload.newPost, ...state.posts.items]
				}
			}
		case DELETE_POST:
			return {
				...state,
				posts: {
					...state.posts,
					items: state.posts.items.filter(post => post._id != action.payload._id)
				}
			}
		case RESTART_STATE:
			return defaultState;
		default:
			return state;
	}
}