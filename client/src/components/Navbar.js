import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, togglePostModal } from '../actions/app';
import { Link, NavLink } from 'react-router-dom';
import NewPostModal from './NewPostModal';
import Auth from "./Auth";

class Navbar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				{this.props.isVisible &&
					<div className="navbar-cs bg-light d-flex flex-column justify-content-between">
						<div className="d-flex flex-row flex-md-column">
						<Auth>
							<NavLink
								to={'/u/' + this.props.profile.username}
								className="navbar-cs__button"
								data-balloon-pos="left"
								aria-label="Profile"
								data-balloon-blunt>
								<img src={this.props.profile.profilePic} style={{'width': '35px', 'height': '35px'}} className='img-fluid d-block mx-auto rounded-circle' />
							</NavLink>
							<div
								className="navbar-cs__button" onClick={this.props.togglePostModal}
								data-balloon-pos="left"
								aria-label="Submit a post"
								data-balloon-blunt>
								<p className="text-center my-0"><i className="fas fa-plus-circle fa-2x"></i></p>
							</div>
						</Auth>
							<NavLink
								to={'/explore'}
								className="navbar-cs__button"
								activeClassName={'bg-brand text-white'}
								data-balloon-pos="left"
								aria-label="Explore"
								data-balloon-blunt>
								<p className="text-center my-0"><i className="fas fa-compass fa-2x"></i></p>
							</NavLink>
							<a
								href='https://www.github.com/fliotta/reactsocial'
								className="navbar-cs__button"
								target="_blank"
								data-balloon-pos="left"
								aria-label="Source code"
								data-balloon-blunt>
								<p className="text-center my-0"><i className="fab fa-github fa-2x"></i></p>
							</a>
						<Auth>
							<div
								className="navbar-cs__button"
								onClick={this.props.logout}
								data-balloon-pos="left"
								aria-label="Logout"
								data-balloon-blunt>
								<p className="text-center my-0"><i className="fas fa-sign-out-alt fa-2x"></i></p>
							</div>
						</Auth>
						<Auth whenLogged={false}>
							<NavLink
								to='/'
								className="navbar-cs__button"
								onClick={this.props.logout}
								data-balloon-pos="left"
								aria-label="Login"
								data-balloon-blunt>
									<p className="text-center my-0"><i className="fas fa-sign-in-alt fa-2x"></i></p>
							</NavLink>
						</Auth>
						</div>
						<div className="d-none d-md-block">
							<img src="assets/images/small_logo.png" className="d-block mx-auto img-fluid" />
						</div>
					</div>
				}
			</>
		)
	}
}

const stateToProps = state => ({
	isVisible: state.app.navbar.isVisible,
	profile: state.app.logged
})

const dispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	togglePostModal: () => dispatch(togglePostModal())
})
export default connect(stateToProps, dispatchToProps)(Navbar);
