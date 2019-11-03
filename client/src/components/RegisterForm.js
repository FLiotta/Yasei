import React, { Component } from 'react';
import {connect} from 'react-redux';
import { signUp } from '../actions/app';

class RegisterForm extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const newUser = {
			username: e.target.username.value,
			password: e.target.password.value
		}

		this.props.signUp({...newUser})
	}

	render(){
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<fieldset disabled={this.props.isLoading}>						
						<div className="form-group">
							<input type="text" name="username" id="username" className="form-control border-0 rounded-0" placeholder="Username" />
						</div>
						<div className="form-group">
							<input type="password" name="password" id="password" className="form-control border-0 rounded-0" placeholder="••••••" />
						</div>
						<button className="btn btn-primary float-right border-0 rounded-0">Sign up!</button>
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

const dispatchToProps = dispatch => ({
	signUp: (value) => dispatch(signUp(value))
})

export default connect(stateToProps, dispatchToProps)(RegisterForm);