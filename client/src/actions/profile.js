import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const FETCH_PROFILE = '[PROFILE] FETCH_PROFILE',
				NEW_POST = '[PROFILE] NEW_POST',
				RESTART_STATE = '[PROFILE] RESTART_STATE',
				SET_LOADING = '[PROFILE] SET_LOADING',
				TOGGLE_SIDENAV = '[PROFILE] TOGGLE_SIDENAV';

export const toggleSidenav = () => {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_SIDENAV
		});
	}
}

export const fetchProfile = (username) => {
	return (dispatch, getState) => {
		const state = getState();
		dispatch(setLoading(true));

		API.get(`user/${username}`)
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: FETCH_PROFILE,
						payload: {
							...res.data.response,
							ownProfile: state.app.logged.username == res.data.response.username
						}
					})
			})
			.catch(e => {
				switch(e.response.status){
					case 404:
						cogoToast.danger("404: User not found", {
						    position: 'bottom-right'
						});
						break;
					default:
						cogoToast.danger("Unexpected error", {
						    position: 'bottom-right'
						});
						break;
				}
			})
			.then(() => {
				dispatch(setLoading(false));
			})
	}
}

export const setLoading = loading => {
	return dispatch => dispatch({
		type: SET_LOADING,
		payload: {
			loading
		}
	})
}

export const restartState = (data) => {
	return dispatch => dispatch({
		type: RESTART_STATE
	})
}
