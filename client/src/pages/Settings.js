import React, { Component } from 'react';
import { toggleNavbar } from '../actions/app';
import { changeImage, changeDescription } from '../actions/settings';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Files from 'react-files'
import '../styles/pages/Profile.scss';

class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			tempPic: undefined
		}

		this.props.toggleNavbar(true);		
		this.handleNewImage = this.handleNewImage.bind(this);
		this.handleNewDescription = this.handleNewDescription.bind(this);
	}

	componentDidUpdate(prevProps) {
	    
  	}

  	handleNewImage(File) {
  		this.props.changeImage(File[0]);
  	}

  	handleNewDescription(e) {
  		e.preventDefault();

  		const description = e.target.description.value;
  		this.props.changeDescription(description);
  	}

	render(){
		return (
			<div className="container mt-5 pt-5">	
				<div className="row">
					<div className="col-md-6">						
				        <form onSubmit={this.handleNewDescription}>
				        	<div className="form-group">
				        		<textarea className="form-control" rows="4" maxLength="125" name="description" id="description" placeholder="Profile's description" defaultValue={this.props.session.description}></textarea>
				        	</div>	
				        	<div className="form-group">
				        		<button className="btn btn-success btn-block">Change description</button>
				        	</div>
				        </form>
				        <Files
					        className='files-dropzone'
					        onChange={this.handleNewImage}
					        accepts={['image/png', 'image/jpg', 'image/jpeg']}
					        maxFiles={5}
					        maxFileSize={10000000}
					        minFileSize={0}
					        clickable>
				        	<button className="btn btn-primary btn-block">Upload profile picture</button>
				        </Files>
					</div>
					<div className="col-md-4">
						<h4 className="display-4">@{this.props.session.username}</h4>
						<p className="lead mb-0">{this.props.session.description}</p>
						<small className="text-muted text-small">{this.props.session.email} | {this.props.session._id}</small>						
						<img src={this.props.session.profilePic} className="img-fluid"/>
					</div>
				</div>				
			</div>
		)
	}
}

const stateToProps = state => ({
	session: state.app.logged
})
const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	changeImage: binary => dispatch(changeImage(binary)),
	changeDescription: description => dispatch(changeDescription(description))
})

export default connect(stateToProps, dispatchToProps)(Settings);