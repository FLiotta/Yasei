import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import VerifiedBadge from '../components/VerifiedBadge';

const Post = (props) => (
	<div className="card post w-100 mb-3 rounded-0" style={{"maxWidth": "540px"}}>						  
    	<div className="card-body">
      		<div className="row no-gutters">
      			<div className="col-2 col-md-1">
      				{props.author && 
      					<Link to={'/u/' + props.author.username}>
      						<img src={props.author.profilePic} className="card-img post__image cursor-pointer" alt="..." />
      					</Link>
      				}
      			</div>
    			<div className="col-10 col-md-11 post__body">
    				<div className="ml-3">    
    					{(props.logged._id == props.author._id || props.logged.username == props.match.params.id) && 
    					<button type="button" className="close" aria-label="Close" onClick={() => props.deletePost({username: props.author.username, postId: props._id})}>
							<span aria-hidden="true">&times;</span>
						</button>
						}
	    				{props.author && 
	    					<span className="mb-0">
	    						<Link to={'/u/' + props.author.username}>@{props.author.username}</Link> 
	    						{props.author.verified && <VerifiedBadge />}
	    					</span>
	    				}                
	        			<p className="mb-3">{props.message}</p>
                <small><Moment fromNow date={props.createdAt} /></small>
	        		</div>
        		</div>
        	</div>
      </div>						  
      <div className="card-footer px-0 py-0 d-flex justify-content-around">
        <div className="w-100 text-center cursor-pointer post__option px-2 py-2" 
              onClick={() => props.liked ? props.unlikePost(props._id) : props.likePost(props._id)}>
          <span><i className={`mr-1 fas fa-heart ${props.liked ? 'text-brand' : ''}`}></i> {props.likes}</span>
        </div>             
      </div>
	</div>
);

const stateToProps = state => ({
	logged: state.app.logged
});

const dispatchToProps = dispatch => ({
	deletePost: data => dispatch(deletePost(data)),
  likePost: postId => dispatch(likePost(postId)),
  unlikePost: postId => dispatch(unlikePost(postId))
});

export default connect(stateToProps, dispatchToProps)(withRouter(Post));