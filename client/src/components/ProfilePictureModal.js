import React, { Component } from 'react';
import Files from 'react-files'
import Rodal from 'rodal';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import cogoToast from 'cogo-toast';
import { connect } from 'react-redux';
import { changeImage } from '../actions/settings';

class ProfilePictureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    }

    this.cropper = React.createRef();

    this.onFileSelected = this.onFileSelected.bind(this);
    this.onFileError = this.onFileError.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  onFileSelected(File) {
    this.setState(() => ({
      file: File[0]
    }));

  }

  onFileError(error) {
    cogoToast.info(`Whoops, there was a problem with the file.`, {
      position: 'bottom-right'
    });
  }

  uploadPicture() {
    const crop = this.cropper.current.cropper.getData();
    console.log(crop);

    this.props.changeImage(this.state.file, crop);
  }

  render() {
    const modalCustomStyles = {
      height: 'fit-content',
      width: 'fit-content'
    };

    return (
      <Rodal
        visible={true}
        animation={'slideUp'}
        customStyles={modalCustomStyles}>
        <div style={{maxWidth: '400px'}}>
          {!this.state.file &&
            <Files
              className='dropzone mt-2'
              dropActiveClassName='dropzone--active'
              accepts={['image/png']}
              onChange={this.onFileSelected}
              onError={this.onFileError}
              maxFileSize={10000000}
              minFileSize={0}
              clickable>
              <div className="d-flex flex-column h-100 justify-content-center">
                <h2 className="text-center"><i className="far fa-file-image"></i></h2>
                <p className="text-center mb-0">Drag and drop your image here or...</p>
                <p className="text-center mb-0 btn-link cursor-pointer">Upload one from your device</p>
              </div>
            </Files>
          }
          {this.state.file &&
            <Cropper
              ref={this.cropper}
              src={this.state.file.preview.url}
              style={{height: 400, width: '100%'}}
              // Cropper.js options
              dragMode='move'
              zoomable={false}
              aspectRatio={1}
              viewMode={2}
              responsive={true}
              guides={false} />
          }
        </div>
        <div className="float-right">
          <button className="btn btn-light text-danger mt-2">Cancel</button>
          <button
            className="btn btn-success text-white ml-1 mt-2"
            onClick={this.uploadPicture}
            disabled={!this.state.file}>Upload</button>
        </div>
      </Rodal>
    );
  }
}

const dispatchToProps = dispatch => ({
  changeImage: (binary, crop) => dispatch(changeImage(binary, crop))
})
export default connect(undefined, dispatchToProps)(ProfilePictureModal);
