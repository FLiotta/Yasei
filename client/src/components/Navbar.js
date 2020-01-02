import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/app';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import Auth from "./Auth";

class Navbar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				{this.props.isVisible && 
					<div className="navbar-cs bg-light d-none d-md-flex flex-column">
						<ReactTooltip
							place="top"
							effect="solid"
						/>
						<Auth>
							<Link to={'/u/' + this.props.profile.username}>
								<div className="navbar-cs__button"  data-tip="Profile">
									<img src={this.props.profile.profilePic} style={{'width': '35px', 'height': '35px'}} className='border img-fluid d-block mx-auto rounded-circle' />
								</div>
							</Link>
							<div className="navbar-cs__button"  data-tip="Explore">
								<p className="text-center my-0"><i className="fas fa-compass fa-2x"></i></p>
							</div>
							<div className="navbar-cs__button"  data-tip="Logout" onClick={this.props.logout}>
								<p className="text-center my-0"><i className="fas fa-sign-out-alt fa-2x"></i></p>
							</div>
						</Auth>
						<Auth whenLogged={false}>
							<Link to='/'>
								<div className="navbar-cs__button"  data-tip="Login" onClick={this.props.logout}>
									<p className="text-center my-0"><i className="fas fa-sign-in-alt fa-2x"></i></p>
								</div>
							</Link>
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
	logout: () => dispatch(logout())
})
export default connect(stateToProps, dispatchToProps)(Navbar);