import axios from 'axios';
import cogoToast from 'cogo-toast';
import api from '../api/api';

const API = new api();

export const
				FETCH_USER_POSTS = '[POST] FETCH_USER_POSTS',
				NEW_POST = '[POST] NEW_POST',
				DISCOVER_POSTS = '[POST] DISCOVER_POSTS',
				DELETE_POST = '[POST] DELETE_POST',
				RESTART_STATE = '[POST] RESTART_STATE',
				SET_LOADING = '[POST] SET_LOADING',
				LIKE_POST = '[POST] LIKE_POST',
				UNLIKE_POST = '[POST] UNLIKE_POST',
				UPDATE_PROFILE_PICTURE = '[POST] UPDATE_PROFILE_PICTURE';

export const fetchUserPosts = (usernamePosts) => {
	return (dispatch, getState) => {
		const state = getState();
		const { offset, quantity, isThereMore, loading } = state.posts;
		const { username } = state.app.logged;
		if (isThereMore && !loading) {
			dispatch(setLoading(true))

			API.get(`user/${usernamePosts}/posts?offset=${offset}&quantity=${quantity}`)
				.then(res => {
					if (res.data.code == 200)
						dispatch({
							type: FETCH_USER_POSTS,
							payload: res.data.response.map(post => ({
								...post,
								liked: post.likedBy.includes(username)
							}))
						})
				})
				.catch(e => console.log(e))
				.then(() => dispatch(setLoading(false)));
		} else {
			cogoToast.info(`You have reached the bottom 😱!`, {
				position: 'bottom-right'
			});
		}
	}
}

export const discoverPosts = (username) => {
	return (dispatch, getState) => {
		const state = getState();
		const { isThereMore, loading } = state.posts;
		const { _id: id } = state.app.logged;

		if (isThereMore && !loading) {
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

				})
				.catch(e => console.log(e))
				.then(() => dispatch(setLoading(false)));
		} else {
			cogoToast.info(`You have reached the bottom 😱!`, {
				position: 'bottom-right'
			});
		}
	}
}

export const newPost = (data) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username: profile } = state.profile;
		const { username, message } = data;

		API.post(`user/${username}/new/post`, { ...data })
			.then(res => {
				if(res.data.code == 200){
					cogoToast.success(`Post submitted`, {
					    position: 'bottom-right'
					});

					if(username == profile) {
						dispatch({
							type: NEW_POST,
							payload: {
								newPost: res.data.response
							}
						})
					}
				}
			})
			.catch(e => {
				cogoToast.error(`There were an error submitting your post.`, {
				    position: 'bottom-right'
				});
			});
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

export const updatePostsPicture = url => {

	return (dispatch, getState) => {
		const state = getState();
		const username = state.app.logged.username;

		dispatch({
			type: UPDATE_PROFILE_PICTURE,
			payload: {
				url, username
			}
		})
	}
}

export const restartState = (data) => {
	return dispatch => dispatch({
		type: RESTART_STATE
	})
}
