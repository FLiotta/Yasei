import { FETCH_PROFILE,
	RESTART_STATE,
	SET_LOADING,
	UPDATE_PROFILE_PICTURE,
	SET_PROFILE_DESCRIPTION,
	TOGGLE_EDITING_DESCRIPTION,
	TOGGLE_SIDENAV} from '../actions/profile';
import { parseImageUrl } from '../utils/util';

const defaultState = {
	loading: true,
	visibleSidenav: true,
	editingDescription: false,
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
		case TOGGLE_EDITING_DESCRIPTION:
			return {
				...state,
				editingDescription: !state.editingDescription
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
		case UPDATE_PROFILE_PICTURE:
			return {
				...state,
				profilePic: parseImageUrl(action.payload.url)
			}
		case SET_PROFILE_DESCRIPTION:
			return {
				...state,
				description: action.payload.description
			}
		case RESTART_STATE:
			return defaultState;
		default:
			return state;
	}
}
