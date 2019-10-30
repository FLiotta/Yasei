import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Logo from '../assets/images/logo.png';
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
					<div className="col-8 d-none d-md-flex flex-column justify-content-center pl-5 home__left">
						<h1 className="display-4 text-light home__left__text">						
							Adjust the focus
							<br/>
							and capture the moment.
						</h1>
						<p className="lead text-light home__left__text">Yasei 野生. Where the greatest photos are.</p>
					</div>
					<div className="col-12 col-md-4 bg-white home__right d-flex flex-column justify-content-center">
						<div className="row justify-content-center">
							<div className="col-6">
								<img src={Logo} className="mx-auto d-block img-fluid" />
							</div>
						</div>
						<div className="row pr-md-3">
							<div className="col-12 px-4">
								<div className="card border-0 rounded-0">
									<div className="card-body">
										<RegisterForm />
										<hr/>
										<LoginForm />
									</div>
								</div>
								<p className="text-center text-muted mt-1">
									29/10/2019
									<br/>
									Last relevant update
								</p>
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