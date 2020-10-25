import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const FETCH_PROFILE = '[PROFILE] FETCH_PROFILE';
export const NEW_POST = '[PROFILE] NEW_POST';
export const RESTART_STATE = '[PROFILE] RESTART_STATE';
export const SET_LOADING = '[PROFILE] SET_LOADING';
export const UPDATE_PROFILE_PICTURE = '[PROFILE] UPDATE_PROFILE_PICTURE';
export const TOGGLE_EDITING_DESCRIPTION = '[PROFILE] TOGGLE_EDITING_DESCRIPTION';
export const SET_PROFILE_DESCRIPTION = '[APP] SET_PROFILE_DESCRIPTION';
export const TOGGLE_SIDENAV = '[PROFILE] TOGGLE_SIDENAV';

export const toggleSidenav = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SIDENAV
    });
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

export const toggleEditingDescription = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_EDITING_DESCRIPTION
    })
  }
}
export const updateProfilePicture = (url) => {
  return dispatch => {
    dispatch({
      type: UPDATE_PROFILE_PICTURE,
      payload: {
        url
      }
    })
  }
}
export const fetchProfile = (username) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(setLoading(true));

    API.get(`user/${username}`)
      .then(res => {
        if (res.code == 200)
          dispatch({
            type: FETCH_PROFILE,
            payload: {
              ...res.response,
              ownProfile: state.app.logged.username == res.response.username
            }
          })
      })
      .catch(e => {
        switch (e.response.status) {
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
