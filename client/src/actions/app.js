import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR',
				SIGN_UP = 'SIGN_UP',
				SIGN_IN = 'SIGN_IN',
				RECONNECT = 'RECONNECT',
				LOGOUT = 'LOGOUT',
				SET_LOGIN_LOADING = 'SET_LOGIN_LOADING',
				SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE',
				RESET_LAST_CONNECTION = 'RESET_LAST_CONNECTION',
				SET_PROFILE_DESCRIPTION = 'SET_PROFILE_DESCRIPTION',
				ERROR = 'ERROR'


export const setLoginLoad = (value) => {
	return dispatch => dispatch({
		type: SET_LOGIN_LOADING,
		payload: {
			value
		}
	})
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
				if(res.data.code == 200){					
					cogoToast.success(`Welcome aboard @${res.data.response.username}!`, { 
					    position: 'bottom-right'
					});
					dispatch({
						type: SIGN_UP,
						payload: {
							...res.data.response
						}
					});
				}
			})
			.catch(e => {				
				cogoToast.error(e.response.data.response, { 
				    position: 'bottom-right'
				});
				dispatch(setLoginLoad(false));
			});
	}
}

export const signIn = ({username, password}) => {
	return dispatch => {
		dispatch(setLoginLoad(true));

		API.post('auth/sign-in', { username, password })
			.then(res => {				
				if(res.data.code == 200){
					cogoToast.success(`Welcome back @${res.data.response.username} :)!`, { 
					    position: 'bottom-right'
					});
					dispatch({
							type: SIGN_IN,
							payload: {
								...res.data.response
							}
						});
				}
			})
			.catch(e => {
				console.log(e)
				dispatch(setLoginLoad(false));
			});
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