import axios from 'axios';

export const DISCOVER_USERS = 'DISCOVER_USERS',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING = 'SET_LOADING';

export const discoverUsers = () => {
	return dispatch => {
		dispatch(setLoading(true));
		axios.get('http://localhost:3000/discover/users')
			.then(res => {			
				dispatch(setLoading(false));				
				if(res.data.code == 200)
					dispatch({
						type: DISCOVER_USERS,
						payload: {
							users: res.data.response
						}
					});
			})
			.catch(e => console.log(e));
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