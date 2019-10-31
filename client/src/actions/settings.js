import axios from 'axios';
import FormData from 'form-data'
import { setProfilePic } from '../actions/app';

export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export const changeImage = (binary) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username } = state.app.logged;
		const payload = new FormData();
		payload.append('newImage', binary);

		axios.post(`http://localhost:3000/user/${username}/edit/info/profilePicture`,payload, {
			  headers: {
			    'accept': 'application/json',
			    'Accept-Language': 'en-US,en;q=0.8',
			    'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
			  }
			})
			.then(res => {
				dispatch(setProfilePic(res.data.response.path));
			})
			.catch(e => console.log(e))
	}
}