import axios from "axios";
import {FETCH_DONATION_INFO} from "../Type";


export const fetchDonationInfo=() => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/donatonInfo/",config)
  dispatch({
    type: FETCH_DONATION_INFO,
    payload: result.data
  });
};