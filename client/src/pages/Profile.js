import React, { Component } from 'react';
import { toggleNavbar } from '../actions/app';
import { fetchProfile, restartState, toggleSidenav } from '../actions/profile';
import { fetchUserPosts, newPost, restartState as restartStatePosts } from '../actions/posts';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { connect } from 'react-redux';
import Post from '../components/Post';
import NewPostForm from '../components/NewPostForm';
import Loading from '../components/Loading';
import { logout } from '../actions/app';
import Auth from '../components/Auth';
import '../styles/pages/Profile.scss';

class Profile extends Component {
	constructor(props){
		super(props);

		console.log(props)
	}

	componentDidMount() {
		this.initializeProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.location !== prevProps.location) {
			this.props.restartState();
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

	render(){
		return (
			<div className="d-flex flex-column flex-md-row profile w-100">
				<div className={"d-flex sidenav flex-column " + (!this.props.profile.visibleSidenav ? 'sidenav--inactive' : '')}>
					<div className="sidenav__description">
						<img src={this.props.profile.profilePic}
							 className="img-fluid rounded-circle sidenav__avatar mx-auto d-block mt-5 mb-2"/>
						<p className="text-center text-white title mt-3">{this.props.profile.username}</p>
						<p className="text-left text-white description px-5">
							{this.props.profile.description || "It seems this user hasn't provided a description 🥴!"}
						</p>
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

				<BottomScrollListener onBottom={() => {this.fetchUserPosts()}}>
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
	profile: state.profile,
	posts: state.posts.items,
	postsLoading: state.posts.loading
});

const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	toggleSidenav: () => dispatch(toggleSidenav()),
	fetchProfile: value => dispatch(fetchProfile(value)),
	newPost: value => dispatch(newPost(value)),
	fetchUserPosts: value => dispatch(fetchUserPosts(value)),
	restartState: () => dispatch(restartState()),
	restartStatePosts: () => dispatch(restartStatePosts()),
	logout: () => dispatch(logout())
})

export default connect(stateToProps, dispatchToProps)(Profile);
