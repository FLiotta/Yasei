import React, { Component } from 'react';
import { toggleNavbar } from '../actions/app';
import { fetchProfile, newPost, fetchPosts, restartState } from '../actions/profile';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { changeImage, changeDescription } from '../actions/settings';
import Post from '../components/Post';
import Loading from '../components/Loading';
import cogoToast from 'cogo-toast';
import VerifiedBadge from '../components/VerifiedBadge';
import DiscoverUser from '../components/DiscoverUser';
import Files from 'react-files'
import '../styles/pages/Profile.scss';

class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			descriptionEditMode: false
		}

		this.props.toggleNavbar(true);
		this.props.fetchProfile(this.props.match.params.id);
		this.props.fetchPosts(this.props.match.params.id);

		this.handleNewPost = this.handleNewPost.bind(this); 
		this.toggleDescription = this.toggleDescription.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.handleNewImage = this.handleNewImage.bind(this);
	}

	toggleDescription() {
		if(this.props.ownsProfile)
			this.setState(() => ({
				descriptionEditMode: !this.state.descriptionEditMode
			}))
	}

	updateDescription(e) {
		e.preventDefault();

		const newDescription = e.target.newDescription.value;

		if(this.props.logged.description != newDescription) {
  			this.props.changeDescription(newDescription);

  			this.setState(() => ({
	  			descriptionEditMode: false
	  		}))
		}
  		else {
  			cogoToast.warn('Hmm... is it me or your description looks the same?', {
  				position: 'bottom-right'
  			})
  		}

  		
	}

	handleNewPost(e) {
		e.preventDefault();

		this.props.newPost({
			username: this.props.match.params.id,
			message: e.target.message.value
		})

		e.target.message.value = '';
	}


	handleNewImage(File) {
  		this.props.changeImage(File[0]);
  	}

	componentDidUpdate(prevProps) {
	    if (this.props.location !== prevProps.location) {
	    	this.props.restartState();
			this.props.fetchProfile(this.props.match.params.id);
			this.props.fetchPosts(this.props.match.params.id);    
	    }
  	}

  	componentWillUnmount(){
  		this.props.restartState();
  	}

	render(){
		return (
			<div className="container mt-5 pt-5 animated fadeIn">	
				{(!this.props.user.username && !this.props.user.loading) && 
					<Redirect to='/404' />
				}
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 justify-content-center d-flex">
						<div className="card mb-3 rounded-0 animated fadeIn profile" style={{"maxWidth": "540px"}}>
						  	<div className="row no-gutters">
						    	<div className="col-md-4 profile__image">						    		
						    		<img src={this.props.user.profilePic} className="card-img rounded-0" alt="Profile picture" />
						    		{this.props.ownsProfile && 
							    		<span>
							    			<Files
										        className='files-dropzone'
										        onChange={this.handleNewImage}
										        accepts={['image/png', 'image/jpg', 'image/jpeg']}
										        maxFiles={5}
										        maxFileSize={10000000}
										        minFileSize={0}
										        clickable>
									        	<i className="fas fa-camera-retro cursor-pointer ml-2 text-brand profile__image__icon"></i>
									        </Files>	
							    		</span>
						    		}
						    	</div>
						    	<div className="col-md-8">
						      		<div className="card-body">
						        		<h5 className="card-title d-inline-flex">
						        			@{this.props.user.username}	
						        			{this.props.user.verified && <VerifiedBadge />}
						        		</h5>						        		
					        			{this.state.descriptionEditMode 
					        				?	
			        						<form onSubmit={this.updateDescription} className="animated fadeIn">
			        							<div className="form-group">
			        								<textarea 
			        									id="newDescription" 
			        									placeholder="i like good music" 
			        									className="form-control" 
			        									maxLength="110"
			        									defaultValue={this.props.user.description}>
			        								</textarea>
			        							</div>
			        							<div className="form-group mb-0">
			        								<input type="submit" value="Update" className="my-0 py-0 text-primary cursor-pointer btn btn-link" />
			        								<button className="text-danger btn btn-link ml-2 my-0 py-0 cursor-pointer" onClick={this.toggleDescription}>Cancel</button>
			        							</div>
			        						</form>		
					        				: 
					        				<div className="animated fadeIn">
					        					<p className="card-text mb-0 py-0">
							        				{this.props.user.description} 
							        				{this.props.ownsProfile && 
							        					<i className="fas fa-pencil-alt cursor-pointer ml-2 text-brand" onClick={this.toggleDescription}></i>
							        				}	
							        			</p>
							        			<p className="card-text py-0 mt-2">
							        				<span>
							        					<small>570 <span className="text-muted">Followers</span></small>
							        					<small className="ml-3">320 <span className="text-muted">Following</span></small>
							        				</span>
							        			</p>
							        		</div>
					        			}						        		
						      		</div>
						    	</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row justify-content-center mb-3">
					<div className="col-12 col-md-10 d-flex justify-content-center">
						<div style={{"maxWidth": "540px"}} className="d-flex flex-grow-1">		
							<DiscoverUser />
						</div>
					</div>
				</div>
				{this.props.logged.isLogged &&
					<div className="row justify-content-center">
						<div className="col-12 col-md-10 justify-content-center d-flex">
							<div className="card w-100 mb-3 rounded-0" style={{"maxWidth": "540px"}}>						  
						    	<div className="card-body">
						      		<div className="row">
						    			<div className="col-md-12">					    				
						        			<form onSubmit={this.handleNewPost}>
						        				<div className="form-group">						        	
						        					<textarea 
						        						id="message" 
						        						name="message" 
						        						className="form-control" 
						        						rows="3" 
						        						placeholder="So basically, i'm very smol.">
						        					</textarea>
						        				</div>
						        				<div className="form-group">
						        					<button type="submit" className="btn btn-primary float-right">Publish</button>
						        				</div>
						        			</form> 
						        		</div>
						        	</div>
						      	</div>						  
							</div>
						</div>
					</div>				
				}
				<div className="row justify-content-center mb-5">
					{
						this.props.user.posts && (
							<>								
								{this.props.user.posts.items.map((post, i) => (
									<div className="col-12 col-md-10 justify-content-center d-flex animated slideInUp" key={post.message + i}>
										<Post {...post}/>
									</div>
								))}
								{this.props.user.posts.loading && <div className="col-12 d-flex justify-content-center"><Loading classes="my-3"/></div>}
							</>
						)	
					}
				</div>	
				<BottomScrollListener onBottom={() => {this.props.fetchPosts(this.props.user.username)}} />
			</div>
		)
	}
}

const stateToProps = state => ({
	logged: state.app.logged,
	user: state.profile.ownProfile 
		? {
			...state.profile, 
			...state.app.logged, 
			ownProfile: true
		} 
		: state.profile,
	ownsProfile: state.profile.ownProfile
})
const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	fetchProfile: value => dispatch(fetchProfile(value)),
	newPost: value => dispatch(newPost(value)),
	fetchPosts: value => dispatch(fetchPosts(value)),
	changeImage: binary => dispatch(changeImage(binary)),
	changeDescription: description => dispatch(changeDescription(description)),
	restartState: () => dispatch(restartState())	
})

export default connect(stateToProps, dispatchToProps)(Profile);