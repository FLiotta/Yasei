import React, { Component } from 'react';
import { toggleNavbar } from '../actions/app';
import { changeImage } from '../actions/settings';
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
	}

	componentDidUpdate(prevProps) {
	    
  	}

  	handleNewImage(File) {
  		/*console.log(File[0])
  		this.setState(({
  			tempPic: File[0]
  		}));*/

  		this.props.changeImage(File[0]);
  	}

	render(){
		return (
			<div className="container mt-5 pt-5">	
				<label forhtml="profilepic">profilepic</label>
				<input type="file" id="profilepic" name="profilepic" onChange={this.handleNewImage} />

				<Files
			        className='files-dropzone'
			        onChange={this.handleNewImage}
			        accepts={['image/png', 'image/jpg', 'image/jpeg']}
			        maxFiles={5}
			        maxFileSize={10000000}
			        minFileSize={0}
			        clickable>
		        	<button>subir imagen</button>
		        </Files>
			</div>
		)
	}
}

const stateToProps = state => ({
	user: state.profile
})
const dispatchToProps = dispatch => ({
	toggleNavbar: value => dispatch(toggleNavbar(value)),
	changeImage: binary => dispatch(changeImage(binary))	
})

export default connect(stateToProps, dispatchToProps)(Settings);