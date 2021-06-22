import React from 'react';
import {FETCH_USER_FRIENDS} from "../Type";

const FriendsReducer = (state = {
    friends: []
},action) => {
   switch(action.type){
    default:
        return state;
    case FETCH_USER_FRIENDS:
        return({
            ...state,
            friends:action.payload,

        })
   }
};

export default FriendsReducer;