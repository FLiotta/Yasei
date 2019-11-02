import { DISCOVER_USERS, RESTART_STATE, SET_LOADING } from '../actions/discover';
import { parseImageUrl } from '../utils/util';

const defaultState = {
	loading: false,
	users: []
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case DISCOVER_USERS:
			return {
				...state,
				users: [
					...action.payload.users.map(user => ({
						...user,
						profilePic: parseImageUrl(user.profilePic)
					}))
				]
			}
		case RESTART_STATE:
			return defaultState;
		case SET_LOADING:
			return {
				...state,
				loading: action.payload.loading
			}
		default:
			return state;
	}
}