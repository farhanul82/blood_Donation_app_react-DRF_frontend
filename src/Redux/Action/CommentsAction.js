import axios from "axios";
import {FETCH_COMMENTS} from "../Type";

export const fetch_comments=() => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/comments/",config)
  dispatch({
    type: FETCH_COMMENTS,
    payload: result.data
  });
};