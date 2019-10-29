import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
	<div className="card post w-100 mb-3" style={{"maxWidth": "540px"}}>						  
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
    					<button type="button" className="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
	    				{props.author && <span className="mb-0"><Link to={'/u/' + props.author.username}>@{props.author.username}</Link></span>}
	        			<p className="mb-0">{props.message}</p>
	        		</div>
        		</div>
        	</div>
      	</div>						  
	</div>
);
