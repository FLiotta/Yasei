import { TOGGLE_NAVBAR, SET_LOGIN_LOADING, SIGN_UP, SIGN_IN, RECONNECT, LOGOUT } from '../actions/app';

const defaultState = {
	navbar: {
		isVisible: false,
	},
	logged: {
		isLoading: false,
		isLogged: false,
		token: null,
		username: null,
		email: null,
		profilePic: null,
		description: null
	}
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case TOGGLE_NAVBAR:
			const { value: isVisible } = action.payload;
			return {
				...state,
				navbar: {
					isVisible
				}
			}
		case SET_LOGIN_LOADING:
			const { value: isLoading } = action.payload;
			return {
				...state,
				logged: {
					...state.logged,
					isLoading
				}
			}
		case SIGN_UP:
		case SIGN_IN:
			const { username, email, token, profilePic, description, _id } = action.payload;
			localStorage.setItem('last_session', JSON.stringify({...action.payload}));
			return {
				...state,
				logged: {
					isLoading: false,
					isLogged: true,
					token,
					username,
					email,
					profilePic,
					description,
					_id
				}
			}
		case RECONNECT:
			const { last_session } = action.payload;
			return {
				...state,
				logged: {
					isLoading: false,
					isLogged: true,
					...last_session
				}
			}
		case LOGOUT:
			return {
				...state,
				logged: defaultState.logged
			}
		default:
			return state;
	}
}