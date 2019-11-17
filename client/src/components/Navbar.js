import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/app';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				{this.props.isVisible && 
					<div className="navbar-cs">
						<div className="container">							
							<div className="navbar-cs__profile-pic">
								{this.props.profile.isLogged 
									? 
										<>
											<p className="mt-2 mr-2 text-white cursor-pointer d-text-underline" onClick={this.props.logout}>Log out</p>
											<Link to={'/u/' + this.props.profile.username}>
							  					<img src={this.props.profile.profilePic} className="img-fluid rounded-circle cursor-pointer" alt="nav-profile-pic" />
							  				</Link>
							  			</>
							  		: 
							  			<Link to='/'>
							  				<p className="mt-2 mr-2 text-white cursor-pointer d-text-underline">Log In</p>
							  			</Link>
							  	}
							</div>
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
	logout: () => dispatch(logout())
})
export default connect(stateToProps, dispatchToProps)(Navbar);