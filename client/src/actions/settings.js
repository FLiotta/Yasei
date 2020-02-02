import axios from 'axios';
import FormData from 'form-data'
import { setProfilePic, setDescription } from '../actions/app';
import api from '../api/api';

const API = new api();

export const CHANGE_IMAGE = 'CHANGE_IMAGE',
				CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION'


export const changeImage = (binary, crop) => {
	return (dispatch, getState) => {
		const state = getState();
		const { username } = state.app.logged;
		const payload = new FormData();
		payload.append('newImage', binary);
		payload.append('crop', JSON.stringify(crop));

		API.post(`user/${username}/edit/info/profilePicture`,payload, {
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

export const changeDescription = description => {
	return (dispatch, getState) => {
		const state = getState();

		const username = state.app.logged.username;

		API.post(`user/${username}/edit/info/description`, { description })
			.then(res => {
				if(res.data.code == 200)
					dispatch(setDescription(res.data.response.newDescription));
			})
			.catch(e => console.log(e));
	}
}
