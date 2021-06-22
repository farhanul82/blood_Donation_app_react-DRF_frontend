import axios from "axios";
import {FETCH_USER_PROFILE} from "../Type";

export const fetch_User_Profile=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/blood/userProfile/",config)
  dispatch({
    type: FETCH_USER_PROFILE,
    payload: result.data
  });
};



export const edit_profile=(formData)=> async()=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify(formData)

 

  await axios.put(
    `${process.env.REACT_APP_API_URL}/blood/userProfile/`,
  
    config,body
  ).then(res=>console.log(res.data))
}