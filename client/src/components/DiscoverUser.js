import React, { Component } from 'react';
import { discoverUsers, restartState } from '../actions/discover';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import Loading from './Loading';

class DiscoverUser extends Component {
	constructor(props){
		super(props);		
	}

	componentDidMount() {
		this.props.discoverUsers();
	}

	componentDidUpdate(prevProps) {
	    if (this.props.location !== prevProps.location) {
			this.props.discoverUsers();	
		}
	}

	componentWillUnmount() {
		this.props.restartState();
	}

	render(){
		return (
			<div className="card discover-user rounded-0 d-flex flex-grow-1">
				<div className="card-header bg-brand text-white">
					Discover new users!
				</div>
				<div className="card-body">
					<div className="row">
						{this.props.isLoading && 
							<div className="col-12 d-flex justify-content-center my-4">
								<Loading />
							</div>
						}		
						{this.props.users && this.props.users.map(user => 
							<div className="col-2 flex-column animated fadeIn" key={'discover_user_' + user._id}>
								<Link to={'/u/' + user.username}>
									<img src={user.profilePic} alt={user.username} className="img-fluid d-block mx-auto rounded-circle discover-user__picture"  data-tip={'@' + user.username} />
								</Link>
								<ReactTooltip 
									place="top"
									effect="solid"
								/>
							</div>
						)}				
					</div>					
				</div>				
			</div>
		)
	}	
}

const stateToProps = state => ({
	isLoading: state.discover.loading,
	users: state.discover.users
});

const dispatchToProps = dispatch => ({
	discoverUsers: () => dispatch(discoverUsers()),
	restartState: () => dispatch(restartState())
})

export default connect(stateToProps, dispatchToProps)(withRouter(DiscoverUser));
