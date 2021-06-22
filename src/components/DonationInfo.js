import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cookies from 'js-cookie';
import CSRFToken from './CSRFToken';
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonationInfo } from "../Redux/Action/DonatiionInfoAction";
// donationInfo

const DonationInfo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
        dispatch(fetchDonationInfo())
  }, []);

  const Info = useSelector(state => state.donationInfo.donationInfo)
  console.log(Info)


    let history = useHistory();
    const { id } = useParams();

    const [hospital,setHospital]=useState('')
    const [donation_date,setDonation_date]=useState('')


    const onSubmit=(e) =>{
        e.preventDefault()
        dispatch(fetchDonationInfo())
        const data = new FormData()
        data.append('hospital',hospital);
        
        data.append('donation_date',donation_date)
      
        // history.push("/Profile")
        
        axios.post( `${process.env.REACT_APP_API_URL}/blood/donatonInfo/`,data,{
          headers: {
            'content-type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken'),
            Authorization: `JWT ${localStorage.getItem("access")}`,
          }
        }).then(res=>console.log(res.data))
      }


  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
          <form onSubmit={(e) => onSubmit(e)} className="editDonationInfo">
              <CSRFToken />
             
                    <div className="form-group">
                      <input
                        className="form-control loginInput"
                        type="text"
                        placeholder="Hospital*"
                        name="hospital"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        required
                      />
                    </div>

                <div className="form-group">
                    <input
                 className="form-control loginInput"
                 type="text"
                 placeholder="YYYY-MM-DD"
                
                 name="donation_date"
                 value={donation_date}
                 onChange={(e) => setDonation_date(e.target.value)}
                 required
                    />
                </div>
                 
                

              <button className="btn btn-danger " type="submit">
                Submit
              </button>
            </form>
          </div>


          <div className="col-md-6">

           
            <ul>
              {
                Info.map(item=>{
                  return(
                    <li className="my-2">
                        <div className="Donation_info_Div">
                          Hospital:{item.hospital}<br></br>
                          Last Donate:{item.donation_date}
                        </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DonationInfo;
