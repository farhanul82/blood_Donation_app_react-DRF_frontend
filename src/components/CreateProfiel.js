import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { edit_profile } from '../Redux/Action/ProfileAction';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import CSRFToken from './CSRFToken';
import Navbar from './Navbar';

const CreateProfiel = () => {
    const dispatch = useDispatch()
    

      const [name,setName]=useState('')
      const [profession,setProfession]=useState('')
      const [country,setCountry]=useState('')
      const [city,setCity]=useState('')
      const [area,setArea]=useState(null)
      const [blood_group,setBlood_group]=useState('')
      const [phone,setPhone]=useState('')
    

           const onSubmit=(e) =>{
              e.preventDefault()
              const data = new FormData()
              data.append('name',name);
              data.append('profession',profession)
              data.append('country',country)
              data.append('city',city)
              data.append('area',area)
              data.append('blood_group',blood_group)
              data.append('phone',phone)
              
              
              axios.post( `${process.env.REACT_APP_API_URL}/blood/donorProfiles/`,data,{
                headers: {
                  'content-type': 'multipart/form-data',
                  'X-CSRFToken': Cookies.get('csrftoken'),
                  Authorization: `JWT ${localStorage.getItem("access")}`,
                }
              }).then(res=>console.log(res.data))
            }
           
           
    return (
        <div >
            <Navbar/>
            <div className="d-flex justify-content-center">

            <form onSubmit={(e) => onSubmit(e)} className="editProfileForm">
             
            <CSRFToken/>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="Name*"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="Profession"
                name="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select
               value={city} onChange={(e) => setCity(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                <option>--select--</option>
                <option>Dhaka</option>
                <option>Sylhet</option>
                <option>Chittagong</option>
                <option>Cumilla</option>
                <option>Jassor</option>
                <option>Rajshahi</option>
                <option>Rangpur</option>
                  {/* {
                    cities.map(x=>{
                      return <option>{x.name}</option>
                  })
                  } */}
            </select>

              {/* <input
                className="form-control loginInput"
                type="text"
                placeholder="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />   */}
            </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">               
                {/* <select value={area}   onChange={(e) => setArea(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                
                <option>--Area--</option>
                  { areas ?
                    (areas.map(x=>{
                      return <option>{x}</option>
                  })
                  ):
                  (<option>select city</option>)
                }
                  
                  </select> */}


              <input
                className="form-control loginInput"
                type="text"
                placeholder="area"
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="blood_group"
                name="blood_group"
                value={blood_group}
                onChange={(e) => setBlood_group(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="tel"
                placeholder="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
           
            {/* <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="YYYY-MM-DD"
               
                name="donation_date"
                value={donation_date}
                onChange={(e) => setDonation_date(e.target.value)}
                required
              />
            </div> */}

                </div>
              </div>
            </div>
            
              
                      
            
            
            <button className="btn editProfileBtn" type="submit">
              Register
            </button>
          </form>
          </div>
        </div>
    )
};

export default CreateProfiel;