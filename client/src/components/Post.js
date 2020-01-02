import React, {Component} from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import cogoToast from "cogo-toast";

class Post extends Component {
	constructor(props) {
		super(props);

		this.deletePost = this.deletePost.bind(this);
		this.ownsIt = this.ownsIt.bind(this);
		this.handleLike = this.handleLike.bind(this);
	}

	deletePost() {
		this.props.deletePost({ postId: this.props._id })
	}

	ownsIt() {
		return this.props.session._id == this.props.author._id || this.props.session.username == this.props.match.params.id;
	}

	handleLike() {
		if(!this.props.logged) {
			return cogoToast.warn(`You must be logged in to perform this action 😢`, {
				position: 'bottom-right'
			});
		}

		if(this.props.liked) {
			this.props.unlikePost(this.props._id)
		} else {
			this.props.likePost(this.props._id)
		}
	}

	render() {
		return (
			<div className="card w-100 my-5 post">
				<div className="card-body px-4 py-5 bg-white">
					<div className="post__avatar">
						<div className="post__avatar__image">
							<Link to={'/u/' + this.props.author.username}>
								<img src={this.props.author.profilePic} className="img-fluid border cursor-pointer rounded-circle" alt={this.props.author.username + '_profile-picture'} />
							</Link>
						</div>
						<div className="post__avatar__username border">
							<Link to={'/u/' + this.props.author.username}>@{this.props.author.username}</Link>
						</div>
					</div>
					<p className="my-0 py-0">{this.props.message}</p>
					{this.props.extra &&
						<div className="mt-3">
							<iframe width="100%" height="315" src={'https://www.youtube.com/embed/' + this.props.extra.value}
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
							</iframe>
						</div>
					}
					<small className="text-muted"><Moment fromNow date={this.props.createdAt} /></small>
					<div onClick={this.handleLike} className="bg-white border d-inline-flex px-3 py-1 rounded-pill post__likes cursor-pointer">
						<span className="text-danger">
							{this.props.likes} <i className={`mr-1 ${this.props.liked ? 'fas fa-heart' : 'far fa-heart'}`}></i>
						</span>
					</div>
					{this.ownsIt() &&
						<div onClick={this.deletePost} className="bg-white border d-inline-flex px-3 py-1 rounded-pill post__delete cursor-pointer">
							<span className="text-secondary">
								<i className="fas fa-times"></i>
							</span>
						</div>
					}
				</div>
			</div>
		)
	}
}

const stateToProps = state => ({
	logged: state.app.logged.isLogged,
	session: state.app.logged
});

const dispatchToProps = dispatch => ({
	deletePost: data => dispatch(deletePost(data)),
	likePost: postId => dispatch(likePost(postId)),
	unlikePost: postId => dispatch(unlikePost(postId))
});

export default connect(stateToProps, dispatchToProps)(withRouter(Post));