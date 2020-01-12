import { FETCH_PROFILE,
	NEW_POST,
	RESTART_STATE,
	SET_LOADING,
	TOGGLE_SIDENAV} from '../actions/profile';
import { parseImageUrl } from '../utils/util';

const defaultState = {
	loading: true,
	visibleSidenav: true,
	username: null,
	description: null,
	profilePic: null,
	posts: {
		loading: false,
		isThereMore: true,
		offset: 0,
		quantity: 5,
		items: []
	}
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case TOGGLE_SIDENAV:
			return {
				...state,
				visibleSidenav: !state.visibleSidenav
			}
		case FETCH_PROFILE:
			return {
				...state,
				...action.payload,
				profilePic: parseImageUrl(action.payload.profilePic)
			}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload.loading
			}
		case NEW_POST:
			return {
				...state,
				posts: {
					...state.posts,
					items: [{
						...action.payload.newPost,
						author: {
							...action.payload.newPost.author,
							profilePic: parseImageUrl(action.payload.newPost.author.profilePic)
						}
					}, ...state.posts.items]
				}
			}
		case RESTART_STATE:
			return defaultState;
		default:
			return state;
	}
}
