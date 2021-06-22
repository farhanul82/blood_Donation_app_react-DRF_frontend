import axios from "axios";
import {Fetch_REQUESTS} from "../Type";


export const fetchRequests=() => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/requests/",config)
  dispatch({
    type: Fetch_REQUESTS,
    payload: result.data.filter(item=>item)
  });
};