import {FETCH_USER_POSTS} from "../Type";



const UserPostReducer  = (state={
    posts:[]
},action) => {
    switch(action.type){
        case FETCH_USER_POSTS:
            return({
                ...state,
                posts: action.payload
            })
        default:
            return state;
    }
};

export default UserPostReducer;
