import React from "react";
import Navbar from "./Navbar";
import { Card, Button } from "react-bootstrap";
import { getUserProfile } from '../Redux/Action/SearchDonorsAction';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const RenderFriend = ({ friends }) => {
  const dispatch = useDispatch()
  let history = useHistory();

  const sendProfileId=(id)=>{
        
    dispatch(getUserProfile(id));
    history.push('/donorProfile')
  }

    
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {friends.map((item) =>{
              console.log(item[0])
              return(
                <div className="col-md-4">
                 <Card className="card frineds_card" style={{ width: "18rem" }}>
                    <Card.Img className="friend_card_img"
                    variant="top"
                    src={`http://localhost:8000${item[0].image}`}
                    />
                   <Card.Body>
                    <Card.Title>{item[0].name}</Card.Title>
                   
                    <Button variant="primary" onClick={()=>sendProfileId(item[0].id)}>Profile</Button>
                  </Card.Body>
                 </Card>
              </div>
              )
          }
              
           
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderFriend;
