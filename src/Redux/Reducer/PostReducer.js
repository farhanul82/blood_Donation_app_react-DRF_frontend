import {FETCH_FRIENDS_POSTS} from "../Type";



const PostReducer  = (state={
    posts:[]
},action) => {
    switch(action.type){
        case FETCH_FRIENDS_POSTS:
            return({
                ...state,
                posts: action.payload
            })
        default:
            return state;
    }
};

export default PostReducer;

