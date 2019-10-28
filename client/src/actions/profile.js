import axios from 'axios';

export const FETCH_PROFILE = 'FETCH_PROFILE',
				FETCH_POSTS = 'FETCH_POSTS',
				NEW_POST = 'NEW_POST';

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
	return dispatch => {
		axios.get(`http://localhost:3000/user/${username}/posts`)
			.then(res => {
				if(res.data.code == 200)
					dispatch({
						type: FETCH_POSTS,
						payload: {
							posts: res.data.response.reverse()
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