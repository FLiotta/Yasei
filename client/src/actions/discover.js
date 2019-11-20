import axios from 'axios';
import api from '../api/api';

const API = new api();

export const DISCOVER_USERS = 'DISCOVER_USERS',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING = 'SET_LOADING';

export const discoverUsers = () => {
	return dispatch => {
		dispatch(setLoading(true));
		API.get('discover/users')
			.then(res => {										
				if(res.data.code == 200)
					dispatch({
						type: DISCOVER_USERS,
						payload: {
							users: res.data.response
						}
					});
			})
			.catch(e => console.log(e))
			.then(() => {
				dispatch(setLoading(false));
			})
	}
}

export const restartState = () => {
	return dispatch => dispatch({
		type: RESTART_STATE
	})
}

const setLoading = (value) => {
	return dispatch => dispatch({
		type: SET_LOADING,
		payload: {
			loading: value
		}
	})
}