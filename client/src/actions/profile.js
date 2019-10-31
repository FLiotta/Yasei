import axios from 'axios';

export const FETCH_PROFILE = 'FETCH_PROFILE',
				FETCH_POSTS = 'FETCH_POSTS',
				NEW_POST = 'NEW_POST',
				DELETE_POST = 'DELETE_POST',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING_POSTS = 'SET_LOADING_POSTS';

export const fetchProfile = (username) => {
	return dispatch => {
		axios.get(`http://localhost:3000/user/${username}`)
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: FETCH_PROFILE,
						payload: {
							...res.data
						}
					})
			})
	}
}

export const fetchPosts = (username) => {
	return (dispatch, getState) => {
		const { offset, quantity, isThereMore } = getState().profile.posts;

		if(isThereMore) {

			dispatch(setLoadingPosts(true));
			
			axios.get(`http://localhost:3000/user/${username}/posts?offset=${offset}&quantity=${quantity}`)
				.then(res => {
					if(res.data.code == 200)
						dispatch({
							type: FETCH_POSTS,
							payload: {
								posts: res.data.response
							}
						})

					dispatch(setLoadingPosts(false));
				})
				.catch(e => console.log(e));
		}
	}
}

export const newPost = (data) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username, message } = data;
		const { token } = state.app.logged;

		axios.post(`http://localhost:3000/user/${username}/new/post`, { message, token })
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: NEW_POST,
						payload: {
							newPost: res.data.response
						}
					})
			})
			.catch(e => console.log(e));
	}
}

export const deletePost = (data) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username, postId } = data;
		const { token } = state.app.logged;

		axios.post(`http://localhost:3000/user/${username}/delete/post`, { postId, token })
			.then(res => {
				dispatch({
					type: DELETE_POST,
					payload: {
						...res.data.response
					}
				})
			})
			.catch(e => console.log(e));
	}
}

export const setLoadingPosts = (loading) => {
	return dispatch => dispatch({
		type: SET_LOADING_POSTS,
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