import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const FETCH_PROFILE = 'FETCH_PROFILE',
				FETCH_POSTS = 'FETCH_POSTS',
				NEW_POST = 'NEW_POST',
				DELETE_POST = 'DELETE_POST',
				RESTART_STATE = 'RESTART_STATE',
				SET_LOADING = 'SET_LOADING',
				SET_LOADING_POSTS = 'SET_LOADING_POSTS',
				LIKE_POST = 'LIKE_POST',
				TOGGLE_SIDENAV = 'TOGGLE_SIDENAV',
				UNLIKE_POST = 'UNLIKE_POST';

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

export const fetchPosts = (username) => {
	return (dispatch, getState) => {
		const state = getState();
		const { offset, quantity, isThereMore, loading } = state.profile.posts;
		const { _id: id } = state.app.logged;

		if(!loading) {
			if (isThereMore) {
				dispatch(setLoadingPosts(true));

				API.get(`user/${username}/posts?offset=${offset}&quantity=${quantity}`)
					.then(res => {
						if (res.data.code == 200)
							dispatch({
								type: FETCH_POSTS,
								payload: {
									posts: res.data.response.map(post => ({
										...post,
										liked: post.likedBy.includes(id)
									}))
								}
							})

						dispatch(setLoadingPosts(false));
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

export const newPost = (data) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username, message } = data;

		API.post(`user/${username}/new/post`, { ...data })
			.then(res => {				
				if(res.data.code == 200){
					cogoToast.success(`Post submitted`, { 
					    position: 'bottom-right'
					});
					dispatch({
						type: NEW_POST,
						payload: {
							newPost: res.data.response
						}
					})
				}
			})
			.catch(e => {
				cogoToast.error(`There were an error submitting your post.`, { 
				    position: 'bottom-right'
				});
			});
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

export const setLoadingPosts = (loading) => {
	return dispatch => dispatch({
		type: SET_LOADING_POSTS,
		payload: {
			loading
		}
	})
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