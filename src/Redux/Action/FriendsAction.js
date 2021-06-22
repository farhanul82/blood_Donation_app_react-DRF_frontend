import axios from "axios";
import {FETCH_USER_FRIENDS} from "../Type";


export const fetch_friends=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/friends/",config)
  dispatch({
    type: FETCH_USER_FRIENDS,
    payload: result.data.filter(x=>x)
  });
};