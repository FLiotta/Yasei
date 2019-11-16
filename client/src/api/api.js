import axios from 'axios';
import store from '../store';

class Api {
	constructor() {
		this.baseUrl = 'http://localhost:3000';
	}

	get(url) {		
		const state = store.getState();

		const config = {
			method: 'GET',
			headers: {
				'auth_token': state.app.logged.token
			}
		}

		return new Promise((res,rej) => {
			axios.get(`${this.baseUrl}/${url}`, config)
				.then(response => res(response))
				.catch(e => rej(e));
		})
	}

	post(url, params) {		
		const state = store.getState();

		const config = {
			method: 'POST',
			headers: {
				'auth_token': state.app.logged.token
			}
		}

		return new Promise((res,rej) => {
			axios.post(`${this.baseUrl}/${url}`, params, config)
				.then(response => res(response))
				.catch(e => rej(e));
		})
	}
}

export default Api;