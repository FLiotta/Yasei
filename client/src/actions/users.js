import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const
				DISCOVER_USERS = 'DISCOVER_USERS',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING = 'SET_LOADING';

export const discoverUsers = (username) => {
	return (dispatch, getState) => {
		const state = getState();

    dispatch(setLoading(true));

    API.get('discover/users')
      .then(res => {
        if (res.code == 200)
          dispatch({
            type: DISCOVER_USERS,
            payload: res.response
          })

        dispatch(setLoading(false));
      })
      .catch(e => console.log(e));
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
