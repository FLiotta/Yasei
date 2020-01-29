import {
	DISCOVER_POSTS,
	DELETE_POST,
	NEW_POST,
	RESTART_STATE,
	SET_LOADING,
	FETCH_USER_POSTS,
	LIKE_POST,
	UNLIKE_POST } from '../actions/posts';
import { parseImageUrl } from '../utils/util';


const defaultState = {
  loading: false,
  isThereMore: true,
	offset: 0,
	quantity: 5,
  items: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
		case FETCH_USER_POSTS:
			return {
				...state,
				isThereMore: !!action.payload.length,
				offset: state.offset + state.quantity,
				items: [
					...state.items,
					...action.payload.map(post => ({
						...post,
						author: {
							...post.author,
							profilePic: parseImageUrl(post.author.profilePic)
						}
					}))
				]
			}
    case DISCOVER_POSTS:
      return {
				...state,
				items: [
	        ...state.items,
	        ...action.payload.map(post => ({
						...post,
						author: {
							...post.author,
							profilePic: parseImageUrl(post.author.profilePic)
						}
					}))
	      ]
			}
		case NEW_POST:
			return {
				...state,
				items: [
					{
						...action.payload.newPost,
						author: {
							...action.payload.newPost.author,
							profilePic: parseImageUrl(action.payload.newPost.author.profilePic)
						}
					},
					...state.items
				]
			}
		case LIKE_POST:
			const { likedPost } = action.payload;

			return {
				...state,
				items: state.items.map(post => post._id == likedPost._id
						? {
							...post,
							likes: likedPost.likes,
							likedBy: likedPost.likedBy,
							liked: true
						}
						: post
					)
			}
		case UNLIKE_POST:
				const { unlikedPost } = action.payload;

				return {
					...state,
					items: state.items.map(post => post._id == unlikedPost._id
							? {
								...post,
								likes: unlikedPost.likes,
								likedBy: unlikedPost.likedBy,
								liked: false
							}
							: post
						)
				}
		case DELETE_POST:
			return {
				...state,
				items: state.items.filter(post => post._id != action.payload.deletedPost._id)
			}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload.loading
			}
		case RESTART_STATE:
			return defaultState;
    default:
      return state;
  }
}
