import React, { Component } from 'react';
import { changeDescription } from '../actions/settings';
import { toggleNavbar, toggleProfilePictureModal } from '../actions/app';
import { fetchProfile, restartState, toggleSidenav, toggleEditingDescription } from '../actions/profile';
import { fetchUserPosts, newPost, restartState as restartStatePosts } from '../actions/posts';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { connect } from 'react-redux';
import Post from '../components/Post';
import NewPostForm from '../components/NewPostForm';
import ProfilePictureModal from '../components/ProfilePictureModal';
import Loading from '../components/Loading';
import cogoToast from 'cogo-toast';

import { logout } from '../actions/app';
import Auth from '../components/Auth';
import '../styles/pages/Profile.scss';

class Profile extends Component {
	constructor(props){
		super(props);

		this.openProfilePictureModal = this.openProfilePictureModal.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
	}

	componentDidMount() {
		this.initializeProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.location !== prevProps.location) {
			this.props.restartState();
			this.props.restartStatePosts();
			this.initializeProfile();
		}
	}

	componentWillUnmount(){
		this.props.restartState();
		this.props.restartStatePosts();
	}

	fetchUserPosts() {
		const profileId = this.props.match.params.id;

		this.props.fetchUserPosts(profileId);
	}

	initializeProfile() {
		this.props.fetchProfile(this.props.match.params.id)
		this.fetchUserPosts();
	}

	openProfilePictureModal() {
		if(this.props.ownsProfile) {
			this.props.toggleProfilePictureModal();
		}
	}

	updateDescription(e) {
		e.preventDefault();
		const description = e.target.description.value;

		if(this.props.profile.description == description) {
			cogoToast.warn(<p>Ehm... i don't wanna be the one to tell you what to do but... <strong>descriptions are the same 🙊</strong></p>, {
					position: 'bottom-right'
			});
		} else if (description.length > 150) {
			cogoToast.warn("Descriptions shouldn't be longer than 150 characters", {
					position: 'bottom-right'
			});
		} else {
			Promise.resolve(this.props.changeDescription(description))
				.then(() => this.props.toggleEditingDescription());
		}

	}

	render(){
		return (
			<div className="d-flex flex-column flex-md-row profile w-100">
				{(this.props.profilePicModal && this.props.ownsProfile) && <ProfilePictureModal />}
				<div className={"d-none d-md-flex sidenav flex-column " + (!this.props.profile.visibleSidenav ? 'sidenav--inactive' : '')}>
					<div className="sidenav__description">
						<img src={this.props.profile.profilePic}
							 onClick={this.openProfilePictureModal}
							 className={'img-fluid rounded-circle sidenav__avatar mx-auto d-block mt-5 mb-2 ' + (this.props.ownsProfile && 'cursor-pointer')}/>
						<p className="text-center text-white title mt-3">{this.props.profile.username}</p>
						{this.props.profile.editingDescription
							?
								<div className="px-5 mb-3">
									<form onSubmit={this.updateDescription}>
										<div className="form-group">
											<textarea className="form-control"
																id="description"
																defaultValue={this.props.profile.description}
																maxLength={150}></textarea>
										</div>
										<div className="form-group d-flex justify-content-end">
											<button className="btn btn-light text-danger mr-2 rounded-pill"
															type="button"
															onClick={this.props.toggleEditingDescription}>Cancel</button>
											<button className="btn btn-brand text-white rounded-pill">Update</button>
										</div>
									</form>
								</div>
							:
							<p className="text-left text-white text-wrap description px-5 mb-0">
								{this.props.profile.description || "It seems this user hasn't provided a description 🥴!"}
							</p>
						}
						{(this.props.ownsProfile && !this.props.profile.editingDescription) &&
							<a className="text-left btn-link text-brand btn px-5"
								 onClick={this.props.toggleEditingDescription}>
											Edit description <i className="fas fa-pencil-alt"></i>
							</a>
						}
						<div className="d-flex flex-column justify-content-between h-100">
							<div className="d-flex justify-content-between px-5">
								<div>
									<p className="text-white mb-0">{this.props.profile.posts} Posts</p>
								</div>
								<div>
									<p className="text-white mb-0">{this.props.profile.likes} Likes</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<BottomScrollListener onBottom={() => {this.setState(() => ({...this.state})); this.fetchUserPosts()}}>
					{scrollRef => (
						<div className="d-flex position-relative profile__body justify-content-center flex-wrap" ref={scrollRef}>
							<Auth>
								<div className="profile__body__textarea w-100 mt-5 pt-5">
								<div className="card border-0">
									<div className="card-body">
										<NewPostForm profileId={this.props.match.params.id} />
									</div>
								</div>
							</div>
							</Auth>
							<div className="profile__body__posts w-100 mt-5">
								<div className="d-flex flex-column">
									{this.props.posts.map((post, i) => <Post {...post} key={post.message + '_' + i}/>)}
									{this.props.postsLoading && <div className="d-flex justify-content-center"><Loading classes="my-5"/></div>}
								</div>
							</div>
						</div>
					)}
				</BottomScrollListener>
			</div>
		)
	}
}

const stateToProps = state => ({
	logged: state.app.logged,
	ownsProfile: state.profile.ownProfile,
	profilePicModal: state.app.profilePicModal.isVisible,
	profile: state.profile,
	posts: state.posts.items,
	postsLoading: state.posts.loading
});

const dispatchToProps = dispatch => ({
	changeDescription: description => dispatch(changeDescription(description)),
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	toggleProfilePictureModal: () => dispatch(toggleProfilePictureModal()),
	toggleSidenav: () => dispatch(toggleSidenav()),
	fetchProfile: value => dispatch(fetchProfile(value)),
	newPost: value => dispatch(newPost(value)),
	fetchUserPosts: value => dispatch(fetchUserPosts(value)),
	restartState: () => dispatch(restartState()),
	toggleEditingDescription: () => dispatch(toggleEditingDescription()),
	restartStatePosts: () => dispatch(restartStatePosts()),
	logout: () => dispatch(logout())
})

export default connect(stateToProps, dispatchToProps)(Profile);
