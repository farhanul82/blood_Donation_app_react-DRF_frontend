import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests } from '../Redux/Action/RequestAction';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import CSRFToken from './CSRFToken';
import { getUserProfile } from '../Redux/Action/SearchDonorsAction';
import axios from 'axios';
import Navbar from './Navbar';
import { fetch_friends_posts } from '../Redux/Action/FriendsPostAction';

const Request = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    // const sendProfileId=(id)=>{
        
    //     dispatch(getUserProfile(id));
    //     history.push('/donorProfile')
    //   }


    const acceptRequest = async(id)=>{
        await axios({
          method:"POST",
          url:`${process.env.REACT_APP_API_URL}/requests_accept/`,
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


      const sendCancel = async(id)=>{
        setCancel(true)
        await axios({
          method:"POST",
          url:`${process.env.REACT_APP_API_URL}/requests_decline/`,
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
      const [cancel,setCancel]=useState(false)

     
      
    const requests=useSelector((state) => state.request.fetchRequests);
    console.log(requests)
    return (
        <div>
          <Navbar/>
            
            <div className="container">
              <div className="row">
            {
              requests.map(item=>{
                console.log(item)
                
               return(
                 
                    <div className="col-md-4">
                      <Card className=" card frineds_card">
                        <CSRFToken/>
                        <Card.Img className="friend_card_img" variant="top" src="http://localhost:8000/media/profilepic/images/face_Uz08K7w.jpg" />
                        <Card.Body>
                          <Card.Title>{item.senderProfile[0].name}</Card.Title>
                          <Card.Text>
                           
                          </Card.Text>
                          {/* <Button onClick={()=>sendProfileId(item.id)}  variant="primary">Profile</Button> */}
                          {!cancel ? (<div>
                            <Button onClick={()=>acceptRequest(item.id)}  className="btn btn-dark" variant="primary">Accept</Button>
                            <Button onClick={()=>sendCancel(item.id)}  className="btn btn-dark" variant="primary">Cancel</Button>
                          </div>
                           
                            ):(<div>
                              <Button   className="btn btn-dark" variant="primary">Add request</Button>
                            </div>)}
                          
                        </Card.Body>
                      </Card>
                    </div>
                
                
               )
              })
            }
              </div>
                </div>
        


        </div>
    );
};

export default Request;