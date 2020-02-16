import React, {Component} from 'react';
import { connect } from 'react-redux';
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs';
import { likePost, unlikePost, deletePost } from '../actions/posts';
import { Link, withRouter } from 'react-router-dom';
import Linkify from 'react-linkify';
import cogoToast from "cogo-toast";

class Post extends Component {
	constructor(props) {
		super(props);

		this.deletePost = this.deletePost.bind(this);
		this.canDeleteIt = this.canDeleteIt.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.parseText = this.parseText.bind(this);

		dayjs.extend(relativeTime)
	}

	deletePost() {
		this.props.deletePost({ postId: this.props._id })
	}

	canDeleteIt() {
		if(this.props.session._id && this.props.author._id) {
			// If i own the post.
			return this.props.session._id == this.props.author._id
		} else if (this.props.session.username && this.props.match.params.id) {
			// If the post is in my profile, even if i don't own it.
			return this.props.session.username == this.props.match.params.id;
		}
	}

	parseText() {
		const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
		const textFractions = this.props.message.split
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
				<div className="card-header bg-white pb-0 border-0 d-flex justify-content-between">
					<div>
						<small className="text-muted">{dayjs().from(dayjs(this.props.createdAt))} ago.</small>
					</div>
					<div className="d-flex">
						<div>
							<Link to={'/u/' + this.props.author.username}>{this.props.author.username}</Link>
						</div>
						<div className="post__avatar ml-2">
							<Link to={'/u/' + this.props.author.username}>
								<img src={this.props.author.profilePic} className="img-fluid cursor-pointer rounded-circle" />
							</Link>
						</div>
					</div>
				</div>
				<div className="card-body px-4 py-4">
						<Linkify properties={{target: '_blank'}}>
							<p className="my-0 py-0 ws-pre-line">{this.props.message}</p>
						</Linkify>
					{this.props.extra &&
						<div className="mt-3">
							<iframe width="100%" height="315" src={'https://www.youtube.com/embed/' + this.props.extra.value}
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
							</iframe>
						</div>
					}
					<div onClick={this.handleLike} className="d-inline-flex px-3 py-1 text-brand-secondary rounded-pill post__likes cursor-pointer">
						<span>
							{this.props.likes} <i className={`mr-1 ${this.props.liked ? 'fas fa-heart' : 'far fa-heart'}`}></i>
						</span>
					</div>
					{this.canDeleteIt() &&
						<div onClick={this.deletePost} className="d-inline-flex px-3 py-1 rounded-pill post__delete cursor-pointer">
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
