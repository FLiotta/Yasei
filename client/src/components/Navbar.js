import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/app';

class Navbar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				{this.props.isVisible && 
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
					  <a className="navbar-brand" href="#">Navbar</a>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  <div className="collapse navbar-collapse" id="navbarNav">
					    <ul className="navbar-nav">
					      <li className="nav-item">
					        <a className="nav-link" href="#" onClick={this.props.logout}>Logout</a>
					      </li>
					    </ul>
					  </div>
					</nav>
				}
			</>
		)
	}
}

const stateToProps = state => ({
	isVisible: state.app.navbar.isVisible
})

const dispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
})
export default connect(stateToProps, dispatchToProps)(Navbar);