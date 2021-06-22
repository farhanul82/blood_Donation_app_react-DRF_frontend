import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import RenderFriend from './RenderFriend';

const Friends = () => {
    const friend=useSelector((state) => state.friends.friends);
    

    return (
        <div>
           {
               friend?(
                   <RenderFriend friends={friend}/>
               )
               :(
                   <h1>You have nothing to show</h1>
               )
           }
        </div>
    );
};

export default Friends;