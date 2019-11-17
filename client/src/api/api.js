import axios from 'axios';
import cogoToast from 'cogo-toast';
import store from '../store';
import { logout } from '../actions/app';

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
				.catch(error => {
					//return store.dispatch(logout());
					/*error = error.response;
					//const { status, data } = e.response;

					cogoToast.error(`${error.status}: ${error.data.message}`);*/
					rej(error)
				});
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
				.catch(e => {
					const { status, data } = e.response;

					switch(status){
						case 401:
							store.dispatch(logout());
							break;	
					}
					
					cogoToast.error(`${status}: ${data.message}`);
					rej(e);
				});
		})
	}
}

export default Api;