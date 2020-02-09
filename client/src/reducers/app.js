import {
	TOGGLE_NAVBAR,
	TOGGLE_POST_MODAL,
	TOGGLE_PROFILE_PICTURE_MODAL,
	SET_LOGIN_LOADING,
	SIGN_UP,
	SIGN_IN,
	RECONNECT,
	LOGOUT,
	SET_PROFILE_PICTURE,
	SET_PROFILE_DESCRIPTION,
	RESET_LAST_CONNECTION } from '../actions/app';

const defaultState = {
	profilePicModal: {
		isVisible: false
	},
	postModal: {
		isVisible: false
	},
	navbar: {
		isVisible: true
	},
	logged: {
		isLoading: false,
		isLogged: false,
		token: null,
		username: null,
		profilePic: null,
		description: null,
		error: null
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
		case TOGGLE_POST_MODAL:
			return {
				...state,
				postModal: {
					isVisible: !state.postModal.isVisible
				}
			};
		case TOGGLE_PROFILE_PICTURE_MODAL:
			return {
				...state,
				profilePicModal: {
					isVisible: !state.profilePicModal.isVisible
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
		case SET_PROFILE_PICTURE:
			return {
				...state,
				logged: {
					...state.logged,
					profilePic: action.payload.url
				}
			}
		case SET_PROFILE_DESCRIPTION:
			return {
				...state,
				logged: {
					...state.logged,
					description: action.payload.description
				}
			}
		case SIGN_UP:
		case SIGN_IN:
			const { username, token, profilePic, description, _id } = action.payload;
			localStorage.setItem('last_session', JSON.stringify({...action.payload}));
			return {
				...state,
				logged: {
					isLoading: false,
					isLogged: true,
					token,
					username,
					profilePic: profilePic,
					description,
					_id
				}
			}
		case RECONNECT:
			const { last_session } = action.payload;
			return {
				...state,
				logged: {
					...last_session,
					isLoading: false,
					isLogged: true,
					profilePic: last_session.profilePic
				}
			}
		case RESET_LAST_CONNECTION:
			localStorage.setItem('last_session', JSON.stringify({...state.logged}));
			return state;
		case LOGOUT:
			return {
				...state,
				logged: defaultState.logged
			}
		default:
			return state;
	}
}
