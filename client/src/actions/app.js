import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const
				TOGGLE_NAVBAR = '[APP] TOGGLE_NAVBAR',
				TOGGLE_POST_MODAL = '[APP] TOGGLE_POST_MODAL',
				TOGGLE_PROFILE_PICTURE_MODAL = '[APP] TOGGLE_PROFILE_PICTURE_MODAL',
				TOGGLE_SETTINGS_MODAL = '[APP] TOGGLE_SETTINGS_MODAL',
				SET_PROFILE_PRIVACY = '[APP] SET_PROFILE_PRIVACY',
				SIGN_UP = '[APP] SIGN_UP',
				SIGN_IN = '[APP] SIGN_IN',
				RECONNECT = '[APP] RECONNECT',
				LOGOUT = '[APP] LOGOUT',
				SET_SETTINGS_LOADING = '[APP] SET_SETTINGS_LOADING',
				SET_LOGIN_LOADING = '[APP] SET_LOGIN_LOADING',
				SET_PROFILE_PICTURE = '[APP] SET_PROFILE_PICTURE',
				RESET_LAST_CONNECTION = '[APP] RESET_LAST_CONNECTION',
				SET_PROFILE_DESCRIPTION = '[APP] SET_PROFILE_DESCRIPTION',
				ERROR = '[APP] ERROR'


export const setLoginLoad = (value) => {
	return dispatch => dispatch({
		type: SET_LOGIN_LOADING,
		payload: {
			value
		}
	})
}

export const setSettingsLoad = (value) => {
	return dispatch => dispatch({
		type: SET_SETTINGS_LOADING,
		payload: {
			value
		}
	})
};

export const togglePostModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_POST_MODAL
	});
}

export const toggleSettingsModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_SETTINGS_MODAL
	});
}

export const toggleProfilePictureModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_PROFILE_PICTURE_MODAL
	});
}

export const toggleProfilePrivacy = () => {
	return dispatch => {
		dispatch(setSettingsLoad(true));

		API.patch('user/settings/privacy')
			.then(res => {
				dispatch({
					type: SET_PROFILE_PRIVACY,
					payload: res.response
				});
			})
			.catch(e => console.log(e))
			.then(() => {
				dispatch(resetLastConnection());
				dispatch(setSettingsLoad(false))
			});
	}
}
export const reconnect = (last_session) => {
	return dispatch => {
		dispatch(setLoginLoad(true));

		dispatch({
			type: RECONNECT,
			payload: {
				last_session
			}
		})
	}
}

export const resetLastConnection = () => {
	return dispatch => dispatch({
			type: RESET_LAST_CONNECTION
		});
}

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('last_session');
		dispatch(setLoginLoad(true));
		dispatch({
			type: LOGOUT
		})
		window.location.href = "/";
	}
}

export const signUp = ({username, password}) => {

	return dispatch => {
		dispatch(setLoginLoad(true));

		API.post('auth/sign-up', { username, password })
			.then(res => {
				if(res.code == 200){
					cogoToast.success(`Welcome aboard @${res.response.username}!`, {
					    position: 'bottom-right'
					});
					dispatch({
						type: SIGN_UP,
						payload: {
							...res.response
						}
					});
				}
			})
			.catch(e => console.log(e))
			.then(() => dispatch(setLoginLoad(false)));
	}
}

export const signIn = ({username, password}) => {
	return dispatch => {
		dispatch(setLoginLoad(true));

		API.post('auth/sign-in', { username, password })
			.then(res => {
				if(res.code == 200){
					cogoToast.success(`Welcome back @${res.response.username} :)!`, {
					    position: 'bottom-right'
					});
					dispatch({
							type: SIGN_IN,
							payload: {
								...res.response
							}
						});
				}
			})
			.catch(e => console.log(e))
			.then(() => dispatch(setLoginLoad(false)));
	}
}

export const setProfilePic = url => {
	return dispatch => {
		cogoToast.success(`Profile picture updated!`, {
		    position: 'bottom-right'
		});
		dispatch({
			type: SET_PROFILE_PICTURE,
			payload: {
				url
			}
		});

		dispatch(resetLastConnection());
	}
}

export const setDescription = description => {
	return dispatch => {
		cogoToast.success(`Description updated!`, {
		    position: 'bottom-right'
		});
		dispatch({
			type: SET_PROFILE_DESCRIPTION,
			payload: {
				description
			}
		});

		dispatch(resetLastConnection())
	}
}

export const toggleNavbar = (value) => {
	return dispatch => dispatch({
		type: TOGGLE_NAVBAR,
		payload: {
			value
		}
	})
}
