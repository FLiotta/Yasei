import React, { Component } from 'react';
import { toggleNavbar } from '../actions/app';
import { fetchProfile, newPost, fetchPosts, restartState } from '../actions/profile';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import Loading from '../components/Loading';
import '../styles/pages/Profile.scss';

class Profile extends Component {
	constructor(props){
		super(props);

		this.props.toggleNavbar(true);
		this.props.fetchProfile(this.props.match.params.id);
		this.props.fetchPosts(this.props.match.params.id);
		this.handleNewPost = this.handleNewPost.bind(this); 
	}

	handleNewPost(e) {
		e.preventDefault();

		this.props.newPost({
			username: this.props.match.params.id,
			message: e.target.message.value
		})

		e.target.message.value = '';
	}

	componentDidUpdate(prevProps) {
	    if (this.props.location !== prevProps.location) {
	    	this.props.restartState();
			this.props.fetchProfile(this.props.match.params.id);
			this.props.fetchPosts(this.props.match.params.id);    
	    }
  	}

	render(){
		return (
			<div className="container mt-5 pt-5">	
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 justify-content-center d-flex">
						<div className="card mb-3 rounded-0" style={{"maxWidth": "540px"}}>
						  	<div className="row no-gutters">
						    	<div className="col-md-4">
						    		<img src={this.props.user.profilePic} className="card-img rounded-0" alt="..." />
						    	</div>
						    	<div className="col-md-8">
						      		<div className="card-body">
						        		<h5 className="card-title d-inline-flex">
						        			{this.props.user.username}						        			
						        		</h5>
						        		{this.props.logged.username == this.props.match.params.id &&
							        		<Link to="/settings">
							        			<i className="fas fa-cog ml-1"></i>
							        		</Link>
						        		}
						        		<p className="card-text">{this.props.user.description}</p>
						        		<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						      		</div>
						    	</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 justify-content-center d-flex">
						<div className="card w-100 mb-3 rounded-0" style={{"maxWidth": "540px"}}>						  
					    	<div className="card-body">
					      		<div className="row">
					    			<div className="col-md-12">
					        			<form onSubmit={this.handleNewPost}>
					        				<div className="form-group">						        	
					        					<textarea id="message" name="message" className="form-control" placeholder="So basically, i'm very smol."></textarea>
					        				</div>
					        				<div className="form-group">
					        					<button type="submit" className="btn btn-primary float-right">Submit</button>
					        				</div>
					        			</form> 
					        		</div>
					        	</div>
					      	</div>						  
						</div>
					</div>
				</div>				
				<div className="row justify-content-center mb-5">
					{
						this.props.user.posts && (
							<>								
								{this.props.user.posts.items.map((post, i) => (
									<div className="col-12 col-md-10 justify-content-center d-flex" key={post.message + i}>
										<Post {...post}/>
									</div>
								))}
								{this.props.user.posts.loading && <div className="col-12 d-flex justify-content-center"><Loading classes="my-3"/></div>}
							</>
						)	
					}
				</div>	
				<BottomScrollListener onBottom={() => {this.props.fetchPosts(this.props.match.params.id)}} />
			</div>
		)
	}
}

const stateToProps = state => ({
	logged: state.app.logged,
	user: state.profile
})
const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	fetchProfile: value => dispatch(fetchProfile(value)),
	newPost: value => dispatch(newPost(value)),
	fetchPosts: value => dispatch(fetchPosts(value)),
	restartState: () => dispatch(restartState())
})

export default connect(stateToProps, dispatchToProps)(Profile);