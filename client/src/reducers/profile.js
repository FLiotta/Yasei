import { FETCH_PROFILE,
	RESTART_STATE,
	SET_LOADING,
	TOGGLE_SIDENAV} from '../actions/profile';
import { parseImageUrl } from '../utils/util';

const defaultState = {
	loading: true,
	visibleSidenav: true,
	username: null,
	description: null,
	profilePic: null
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
		case RESTART_STATE:
			return defaultState;
		default:
			return state;
	}
}
