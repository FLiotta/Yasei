import FormData from 'form-data'
import { setProfilePic, setDescription, toggleProfilePictureModal } from '../actions/app';
import { updatePostsPicture } from '../actions/posts';
import { updateProfilePicture } from '../actions/profile';
import api from '../api/api';

const API = new api();

export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';


export const changeImage = (binary, crop) => {
  return dispatch => {
    const payload = new FormData();
    payload.append('crop', JSON.stringify(crop));
    payload.append('newImage', binary);


    API.patch(`user/settings/profilePicture`, payload, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
      }
    })
      .then(res => {
        dispatch(toggleProfilePictureModal());
        dispatch(updatePostsPicture(res.response.path));
        dispatch(updateProfilePicture(res.response.path));
        dispatch(setProfilePic(res.response.path));
      })
      .catch(e => console.log(e))
  }
}

export const changeDescription = description => {
  return dispatch => {

    API.patch(`user/settings/description`, { description })
      .then(res => {
        if (res.code == 200)
          dispatch(setDescription(res.response.newDescription));
      })
      .catch(e => console.log(e));
  }
}
