import React, { Component } from 'react';
import {connect} from 'react-redux';

class AuthForm extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const user = {
			username: e.target.username.value,
			password: e.target.password.value
		}

		this.props.onSuccess({...user})
	}

	render(){
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<fieldset disabled={this.props.isLoading}>
						<div className="form-group">
							<label htmlFor="username" className="mb-1 text-muted">
								<small>Username</small>
							</label>
							<input type="text" name="username" id="username" className="form-control rounded-0" required minLength="5" />
						</div>
						<div className="form-group">
							<label htmlFor="password" className="mb-1 text-muted">
								<small>Password</small>
							</label>
							<input type="password" name="password" id="password" className="form-control rounded-0" required minLength="5" />
						</div>
						<button className="btn btn-brand text-light float-right border-0 rounded-pill">{this.props.type == 'signup' ? "Sign Up" : "Login"}</button>
						{this.props.backMethod &&
							<button
								onClick={this.props.backMethod}
								type="button"
								className="btn btn-brand-secondary text-white float-right border-0 rounded-pill mx-3">
								Go back
							</button>
						}
					</fieldset>
				</form>
			</>
		)
	}
}

const stateToProps = state => ({
	isAuth: state.app.logged.isLogged,
	isLoading: state.app.logged.isLoading
});

export default connect(stateToProps)(AuthForm);
