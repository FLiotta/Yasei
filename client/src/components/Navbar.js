import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, togglePostModal } from '../actions/app';
import { Link, NavLink } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
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
					<div className="navbar-cs bg-light d-flex flex-row flex-md-column">
						<ReactTooltip
							place="left"
							effect="solid"
						/>
						<Auth>
							<NavLink to={'/u/' + this.props.profile.username} className="navbar-cs__button" data-tip="Profile">
								<img src={this.props.profile.profilePic} style={{'width': '35px', 'height': '35px'}} className='border img-fluid d-block mx-auto rounded-circle' />
							</NavLink>
							<div className="navbar-cs__button" onClick={this.props.togglePostModal} data-tip="Submit a post">
								<p className="text-center my-0"><i className="fas fa-comment fa-2x"></i></p>
							</div>
						</Auth>
							<NavLink to={'/explore'} className="navbar-cs__button" activeClassName={'bg-brand text-white'}  data-tip="Explore">
								<p className="text-center my-0"><i className="fas fa-compass fa-2x"></i></p>
							</NavLink>
							<a href='https://www.github.com/fliotta/reactsocial' className="navbar-cs__button" target="_blank" data-tip="Source code">
								<p className="text-center my-0"><i className="fab fa-github fa-2x"></i></p>
							</a>
						<Auth>
							<div className="navbar-cs__button"  data-tip="Logout" onClick={this.props.logout}>
								<p className="text-center my-0"><i className="fas fa-sign-out-alt fa-2x"></i></p>
							</div>
						</Auth>
						<Auth whenLogged={false}>
							<NavLink to='/' className="navbar-cs__button"  data-tip="Login" onClick={this.props.logout}>
									<p className="text-center my-0"><i className="fas fa-sign-in-alt fa-2x"></i></p>
							</NavLink>
						</Auth>
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
