import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Navbar from "../components/Navbar";
import Explore from '../pages/Explore';
import NewPostModal from '../components/NewPostModal';

class AppRouter extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Home} exact />
					<Fragment>
						<div className="d-flex page">
							<NewPostModal />
							<Route path="/explore" component={Explore} />
							<Route path="/u/:id" component={Profile} />
							<Navbar />
						</div>
					</Fragment>
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default AppRouter;
