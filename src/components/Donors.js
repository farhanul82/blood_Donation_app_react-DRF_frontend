import axios from 'axios';
import Cookies from 'js-cookie';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector, useDispatch } from "react-redux";
import { fetchDonors, getUserProfile, sendRequest } from '../Redux/Action/SearchDonorsAction';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import CSRFToken from './CSRFToken';

const Donors = () => {
  useEffect(() => {
        
  }, []);
   const dispatch = useDispatch()
   let history = useHistory();
    const[donor,setDonor]=useState(null)
    const [city,setCity]=useState('')
    const [area,setArea]=useState(null)


    const cities = [
      {
        name: "Dhaka",
        area: [
          "Mohammadpur",
          "Dhanmondi",
          "Mirpur",
          "Firmgate",
          "Mohakhali",
          "Gulshan",
          "Uttara",
          "Motijhil",
        ],
      },
      {
        name: "Chittagong",
        area: [
          "Kotwali",
          "Khulshi",
          "Panchlaish",
          "Pahartali",
          "Halishahar",
          "Anowara",
          "Patiya",
          "Boalkhali",
          "Rangunia",
          "Hathazari",
          "Satkania",
          "Patenga",
        ],
      },
      {
        name: "Sylhet",
        area: ["Ambarkhana", "Subid Bazar", "Tilagor", "Upashahar", "Kazalshah"],
      },
    ];
  
    const [areas, setAreas] = useState(null);




    const onChange = (e) =>{
      console.log(e.target.value)
      setCity(e.target.value)
      
      
      setAreas(cities.find(x=>x.name===e.target.value).area)
  
    }
  
    
    
      const onSubmit = (e) => {
        e.preventDefault();
        setDonor(true)
        dispatch(fetchDonors(city,area))
        
      }

      const sendProfileId=(id)=>{
        
        dispatch(getUserProfile(id));
        history.push('/donorProfile')
      }

      const sendRequest = async(id)=>{
        await axios({
          method:"POST",
          url:`${process.env.REACT_APP_API_URL}/send_request/`,
          data:{"id":id},
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
          
        }).then(res=>
          console.log(res.data)
        )
      }

    const donors=useSelector((state) => state.donor.filterDonor);
    console.log(donors)
    return (
        <div>
          {/* <Navbar/>
          <button className="btn  donorSearchBtn"  onClick={() => onSubmit()}>
              Search
              </button>
            <h1>Hi</h1>
            <div className="container-fluid">
              <div className="row">
              {
              donors.map(item=>{
                console.log(item.id)
                
               return(
                <div className="col-md-4">
                <Card className="DonorSearchcard">
                  <CSRFToken/>
                        <Card.Img className="Donor_Search_card_img" variant="top" src="http://localhost:8000/media/profilepic/images/face_Uz08K7w.jpg" />
                        <Card.Body>
                          <Card.Title>{item.user.username}</Card.Title>
                          <Card.Text>
                           
                          </Card.Text>
                          <Button onClick={()=>sendProfileId(item.id)}  variant="primary">Profile</Button>
                          <Button onClick={()=>sendRequest(item.id)}  className="btn btn-danger" variant="primary">Request to Donate</Button>
                          
                           <Button> Call  </Button>
                        </Card.Body>
                      </Card>
                </div>
             
               )
              })
            }
              </div>
            </div> */}
            {!donor?(
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="loginGifDiv">
              <img src="/images/blood.gif" alt=''></img>
            </div>
            <div className="login-text">
              <h3>
                <span className="span1">Blood</span>{" "}
                <span className="span2">Donation</span>
              </h3>
            </div>
          </div>
  
          <div className="col-md-6">
              <div className="donorHeadingDIV">
              <h5 className="tag1">Search DONORS</h5>
            <h3 className="tag2">By</h3>
            
              </div>
            

            <form >
            <div className="form-group donorsSelectCity">
              
           
                  <select
                    value={city}
                    onChange={(e) =>onChange(e)}
                    class="form-control"
                    id="exampleFormControlSelect1"
                  >
                  
                    {cities.map((x) => {
                      return <option>{x.name}</option>;
                    })}
                  </select>

                
                
              </div>

             
                <div className="form-group donorAreaSelect">
                  <select  className="" value={area}   onChange={(e) => setArea(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                
                <option>--Area--</option>
                  { areas ?
                    (areas.map(x=>{
                      return <option>{x}</option>
                  })
                  ):
                  (<option>select city</option>)
                }
                  
                  </select>

                </div>

            <button className="btn  donorSearchBtn"  onClick={(e) => onSubmit(e)}>
              Search
              </button>
          </form>
            </div>
        </div>
      </div>
    ):(
        <div>
            <Navbar/>
            <h1>Hi</h1>
            <div className="container-fluid">
              <div className="row">
              {
              donors.map(item=>{
                console.log(item.user.id)
                
               return(
                <div className="col-md-4">
                <Card className="DonorSearchcard">
                  <CSRFToken/>
                        <Card.Img className="Donor_Search_card_img" variant="top" src="http://localhost:8000/media/profilepic/images/face_Uz08K7w.jpg" />
                        <Card.Body>
                          <Card.Title>{item.user_name}</Card.Title>
                          <Card.Text>
                           
                          </Card.Text>
                          <Button onClick={()=>sendProfileId(item.id)}  variant="primary">Profile</Button>
                          <Button onClick={()=>sendRequest(item.user.id)}  className="btn btn-danger" variant="primary">Request to Donate</Button>
                        </Card.Body>
                      </Card>
                </div>
                //  <div className="col-md-4">
                //    <div class="card" style="width: 18rem;">
                //     <img src="http://localhost:8000/media/profilepic/images/face_Uz08K7w.jpg" class="card-img-top" alt="..."></img>
                //     <div class="card-body">
                //       <h5 class="card-title">{item.user_name}</h5>
                        
                //         <a href="#" class="btn btn-primary">Go Profile</a>
                //     </div>
                //       </div>
                //  </div>
               )
              })
            }
              </div>
            </div>
            
        </div>
    )}
        </div>
    )
        
    
};

export default Donors;