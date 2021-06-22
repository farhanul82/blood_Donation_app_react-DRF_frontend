import axios from "axios";
import {Fetch_DONOR,GRT_USER_PROFILE} from "../Type";

// export const fetchDonors = async (dispatch) => {
//   const result = await axios.get("http://localhost:8000/blood/donors/");

//   dispatch({
//     type: Fetch_DONOR,
//     payload: result.data,
//   });
// };


// export const fetchDonors=() => async (dispatch) => {
//   const result = await axios.get("http://localhost:8000/blood/userProfile/");

//   dispatch({
//     type: Fetch_DONOR,
//     payload: result.data.filter(item=>item)
//   });
// };


export const getUserProfile = (id) => async(dispatch)=>{
  
 await axios.get(`http://localhost:8000/blood/donorProfiles/${id}/`).then(res=>{
    localStorage.setItem("donorProfile", res);
    console.log(res.data)
    dispatch({
      type: GRT_USER_PROFILE,
      payload: res.data
    })
  })
  }



export const fetchDonors=(city,area)=> async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const result = await axios.get("http://localhost:8000/blood/donorProfiles/",
  config)

  dispatch({
    type: Fetch_DONOR,
    payload: result.data.filter(donor=>donor.city===city).filter(donor=>donor.area===area)
  });
};

// export const sendRequest = async(id)=>{
//   await axios({
//     method:"POST",
//     url:"http://localhost:8000/send_request/",
//     data:{"id":id},
//   }).then(res=>
//     console.log(res.data)
//   )
// }