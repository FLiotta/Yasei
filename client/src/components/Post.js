import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/profile';
import { Link, withRouter } from 'react-router-dom';

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
	    				{props.author && <span className="mb-0"><Link to={'/u/' + props.author.username}>@{props.author.username}</Link></span>}
	        			<p className="mb-0">{props.message}</p>
	        		</div>
        		</div>
        	</div>
      	</div>						  
	</div>
);

const stateToProps = state => ({
	logged: state.app.logged
});

const dispatchToProps = dispatch => ({
	deletePost: data => dispatch(deletePost(data))
});

export default connect(stateToProps, dispatchToProps)(withRouter(Post));