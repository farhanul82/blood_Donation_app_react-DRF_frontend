import {FETCH_FRIENDS_POSTS} from "../Type";
import axios from "axios";


export const fetch_friends_posts=() => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/post/",config)
  dispatch({
    type: FETCH_FRIENDS_POSTS,
    payload: result.data
  });
};