import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

class Home extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		if(this.props.isLogged)
			this.props.history.push(`/u/${this.props.user}`)
	}

	componentDidUpdate() {
		if(this.props.isLogged)
			this.props.history.push(`/u/${this.props.user}`)
	}

	render(){
		return (
			<div className="home">
				<div className="row h-100">
					<div className="col-6 d-none d-md-flex flex-column justify-content-end pl-5 home__left">
						<h1 className="display-4 text-light home__left__text">						
							Adjust the focus
							<br/>
							and capture the moment.
						</h1>
						<p className="lead text-light home__left__text">Yasei 野生. Where the greatest photos are.</p>
					</div>
					<div className="col-12 col-md-6 home__right d-flex flex-column justify-content-end">
						<div className="row flex-column align-content-end pr-md-5">
							<div className="col-md-8 col-12 px-4 py-4">
								<div className="card">
									<div className="card-body">
										<RegisterForm />
										<hr/>
										<LoginForm />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>				
			</div>
		)
	}
}

const stateToProps = state => ({
	isLogged: state.app.logged.isLogged,
	user: state.app.logged.username
});

export default connect(stateToProps)(Home);