import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const
				FETCH_USER_POSTS = 'FETCH_USER_POSTS',
				DISCOVER_POSTS = 'DISCOVER_POSTS',
				DELETE_POST = 'DELETE_POST',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING = 'SET_LOADING',
				LIKE_POST = 'LIKE_POST',
				UNLIKE_POST = 'UNLIKE_POST';

export const fetchUserPosts = (username) => {
	return (dispatch, getState) => {
		const state = getState();
		const { offset, quantity, isThereMore, loading } = state.posts;
		const { _id: id } = state.app.logged;
		if(loading) {
			if (isThereMore) {
				dispatch(setLoading(true));

				API.get(`user/${username}/posts?offset=${offset}&quantity=${quantity}`)
					.then(res => {
						dispatch(setLoading(false))
						console.log(res.data)

						if (res.data.code == 200)
							dispatch({
								type: FETCH_USER_POSTS,
								payload: res.data.response.map(post => ({
									...post,
									liked: post.likedBy.includes(id)
								}))
							})
					})
					.catch(e => console.log(e));
			} else {
				cogoToast.info(`You have reached the bottom 😱!`, {
					position: 'bottom-right'
				});
			}
		}
	}
}

export const discoverPosts = (username) => {
	return (dispatch, getState) => {
		const state = getState();
		const { isThereMore, loading } = state.posts;
		const { _id: id } = state.app.logged;

		if(!loading) {
			if (isThereMore) {
				dispatch(setLoading(true));

				API.get('discover/posts')
					.then(res => {
						if (res.data.code == 200)
							dispatch({
								type: DISCOVER_POSTS,
								payload: res.data.response.map(post => ({
									...post,
									liked: post.likedBy.includes(id)
								}))
							})

						dispatch(setLoading(false));
					})
					.catch(e => console.log(e));
			} else {
				cogoToast.info(`You have reached the bottom 😱!`, {
					position: 'bottom-right'
				});
			}
		}
	}
}

export const likePost = (postId) => {
	return (dispatch, getState) => {
		const state = getState();

		API.post(`post/${postId}/like`)
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: LIKE_POST,
						payload: {
							likedPost: res.data.response
						}
					})
			})
			.catch(e => console.log(e));
	}
}

export const unlikePost = (postId) => {
	return (dispatch, getState) => {
		const state = getState();

		API.post(`post/${postId}/unlike`)
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: UNLIKE_POST,
						payload: {
							unlikedPost: res.data.response
						}
					})
			})
			.catch(e => console.log(e));
	}
}

export const deletePost = (data) => {
	return (dispatch, getState) => {
		const state = getState();
		const { postId } = data;
		API.get(`post/${postId}/delete`)
			.then(res => {
				cogoToast.warn(`Post deleted`, {
				    position: 'bottom-right'
				});
				dispatch({
					type: DELETE_POST,
					payload: {
						...res.data
					}
				})
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
