import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toggleNavbar } from '../actions/app';
import { fetchProfile, newPost, fetchPosts } from '../actions/profile';
import { connect } from 'react-redux';
import Cropper from 'react-cropper';
import '../styles/pages/Profile.scss';

const cropper = React.createRef(null);

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
	}

	componentDidUpdate(prevProps) {
	    if (this.props.location !== prevProps.location) {
			this.props.fetchProfile(this.props.match.params.id);
			this.props.fetchPosts(this.props.match.params.id);    
	    }
  	}

	render(){
		return (
			<div className="container mt-5 pt-5">	
				<div className="row justify-content-center">
					<div className="col-8 justify-content-center d-flex">
						<div className="card mb-3" style={{"maxWidth": "540px"}}>
						  	<div className="row no-gutters">
						    	<div className="col-md-4">
						    		<img src={this.props.user.profilePic} className="card-img" alt="..." />
						    	</div>
						    	<div className="col-md-8">
						      		<div className="card-body">
						        		<h5 className="card-title">{this.props.user.username}</h5>
						        		<p className="card-text">{this.props.user.description}</p>
						        		<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						      		</div>
						    	</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-10 justify-content-center d-flex">
						<div className="card w-100 mb-3" style={{"maxWidth": "540px"}}>						  
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
				<div className="row justify-content-center">
					{
						!this.props.user.posts 
							? <p>Loading posts</p> 
							: this.props.user.posts.map((post, i) => (
								<div className="col-10 justify-content-center d-flex" key={post.message + i}>
									<div className="card w-100 mb-3" style={{"maxWidth": "540px"}}>						  
								    	<div className="card-body">
								      		<div className="row justify-content-between no-gutters">
								      			<div className="col-md-1">
								      				{post.author && <img src={post.author.profilePic} className="card-img" alt="..." />}
								      			</div>
								    			<div className="col-md-10">
								    				{post.author && <span className="mb-0"><Link to={'/u/' + post.author.username}>@{post.author.username}</Link></span>}
								        			<p className="mb-0">{post.message}</p>
								        		</div>
								        	</div>
								      	</div>						  
									</div>
								</div>
							))
					}
				</div>	
			</div>
		)
	}
}

const stateToProps = state => ({
	user: state.profile
})
const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	fetchProfile: value => dispatch(fetchProfile(value)),
	newPost: value => dispatch(newPost(value)),
	fetchPosts: value => dispatch(fetchPosts(value))
})

export default connect(stateToProps, dispatchToProps)(Profile);