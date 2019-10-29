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
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  <div className="collapse navbar-collapse float-right" id="navbarNav">
					    <ul className="navbar-nav float-right">
					      <li className="nav-item">
					        <a className="nav-link" href="#" onClick={this.props.logout}>Logout</a>
					      </li>
					    </ul>
					  </div>
					  <div className="row justify-content-end">
					  		<div className="col-2">
					  			<Link to={'/u/' + this.props.profile.username}>
					  				<img src={this.props.profile.profilePic} className="img-fluid rounded-circle cursor-pointer" alt="..." />
					  			</Link>
					  		</div>
					  </div>
					</nav>
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