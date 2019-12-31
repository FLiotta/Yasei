import { FETCH_PROFILE, 
	FETCH_POSTS, 
	NEW_POST, 
	DELETE_POST, 
	RESTART_STATE,
	SET_LOADING, 
	SET_LOADING_POSTS,
	LIKE_POST,
	UNLIKE_POST } from '../actions/profile';
import { parseImageUrl } from '../utils/util';

const defaultState = {
	loading: true,
	username: null,
	description: null,
	profilePic: null,	
	posts: {
		loading: true,
		isThereMore: true,
		offset: 0,
		quantity: 5,		
		items: []
	}
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case FETCH_PROFILE:
			return {
				...state,				
				...action.payload,
				profilePic: parseImageUrl(action.payload.profilePic)
			}			
		case FETCH_POSTS:
			if(!!action.payload.posts.length)
				return {
					...state,
					posts: {
						...state.posts,
						offset: state.posts.offset + state.posts.quantity,
						items: [
							...state.posts.items,
							...action.payload.posts.map(post => ({
								...post,
								author: {
									...post.author, 
									profilePic: parseImageUrl(post.author.profilePic)
								}
							}))
						]
					}
				}
			return {
				...state,
				posts: {
					...state.posts,
					isThereMore: false
				}
			}
		case LIKE_POST:
			const { likedPost } = action.payload;

			return {
				...state,
				posts: {
					...state.posts,
					items: 
						state.posts.items.map(post => post._id == likedPost._id 
							? {
								...post,
								likes: likedPost.likes,
								likedBy: likedPost.likedBy,
								liked: true
							}
							: post
						)
				}
			}
		case UNLIKE_POST:
			const { unlikedPost } = action.payload;

			return {
				...state,
				posts: {
					...state.posts,
					items: 
						state.posts.items.map(post => post._id == unlikedPost._id 
							? {
								...post,
								likes: unlikedPost.likes,
								likedBy: unlikedPost.likedBy,
								liked: false
							}
							: post
						)
				}
			}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload.loading
			}
		case SET_LOADING_POSTS:
			return {
				...state,
				posts: {
					...state.posts,
					loading: action.payload.loading
				}			
			}
		case NEW_POST:			
			return {
				...state,
				posts: {
					...state.posts,
					items: [
						{
							...action.payload.newPost,
							author: {
								...action.payload.newPost.author,
								profilePic: parseImageUrl(action.payload.newPost.author.profilePic)
							}
						}, 
						...state.posts.items]
				}
			}
		case DELETE_POST:
			console.log(action.payload);
			return {
				...state,
				posts: {
					...state.posts,
					items: state.posts.items.filter(post => post._id != action.payload.deletedPost._id)
				}
			}
		case RESTART_STATE:
			return defaultState;
		default:
			return state;
	}
}