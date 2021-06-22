import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetch_User_Profile } from "../Redux/Action/ProfileAction";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import CreateProfiel from "./CreateProfiel";
import { Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import CSRFToken from "./CSRFToken";
import axios from "axios";
import { fetch_comments } from "../Redux/Action/CommentsAction";
import { fetch_user_posts } from "../Redux/Action/UserPostAction";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_User_Profile());
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState('');

  const onSubmit = (e) => {
    dispatch(fetch_user_posts())
    e.preventDefault();
    console.log(image.name)
    const data = new FormData();
    data.append("text", text);

    data.append("image", image);
    

    // history.push("/Profile")

    axios.post( `${process.env.REACT_APP_API_URL}/blood/userPost/`,data,{
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: `JWT ${localStorage.getItem("access")}`,
      }
    }).then(res=>console.log(res.data))
  };


  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [comment, setComment] = useState("");


  const sendComment = async (id) => {
    const data = {
      id: id,
      comment: comment,
    };
    console.log(data);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/blood/comments/`,
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      data: data,
    }).then((response) => {
      console.log(response.data);
      console.log("ERROR");
    });
  };



  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => {
    setShow3(true);
    dispatch(fetch_comments());
  };

  const profile = useSelector((state) => state.profile.userProfile);
  const posts = useSelector((state) => state.UserPost.posts);
  console.log(posts)
  
  console.log(posts);
  return (
    <div>
      {profile.city ? (
        <div>
          <Navbar />

          <div className="container profileDIv">
            <div className="row">
              <div className="col-md-6">
                <div className="profileimgDiv">
                  <img
                    className="profileimgDivimg"
                    src={`http://localhost:8000${profile.image}`}
                    alt=""
                  ></img>
                </div>

                <div className="profileNameDiv">
                  <h4>{profile.name}</h4>
                </div>

                <div>
                  <div className="gifDiv">
                    <img src="/images/blood.gif" alt=""></img>
                  </div>

                  <div className="bloodGroupDiv">
                    <h1>{profile.blood_group}</h1>
                  </div>

                  <div>
                    <Link
                      to={`/donation_info/${profile.id}`}
                      className="editDonation"
                    >
                      +Donation information
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <Link
                  to={`/edit_Profile/${profile.id}`}
                  className="editProfile"
                >
                  + edit profile
                </Link>
                <h5 className="infoTag">Info</h5>

                <div className="profileInfoDiv">
                  <ul className="profileList">
                    <li>Country : {profile.country}</li>
                    <li>City: {profile.city}</li>
                    <li>Area: {profile.area}</li>
                    <li>Profession: {profile.profession}</li>
                    <li>Phone: {profile.phone}</li>
                  </ul>
                </div>

                <div>
                  <h6 className="limitText">
                    <span className="badge limitBadge  ">9</span> days left
                    untill you can donate again
                  </h6>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                
                <Button className="addPostBtn" onClick={handleShow}>
                  Write your post . . . . .
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Write your post. . . .</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <CSRFToken />

                      <div className="form-group">
                        <input
                          className="form-control loginInput"
                          type="text"
                          placeholder="text*"
                          name="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="file"
                          id="image"
                          accept="image/png, image/jpeg"
                          
                          onChange={(e) => setImage(e.target.files[0])}
                          
                        />
                      </div>

                     

                      <button className="btn btn-danger " type="submit">
                        Submit
                      </button>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>

            <div className="row">
            <div className="col-md-12">
            {posts.map((item) => {
              console.log(item.image)
                return (
                  <div className="postSection my-3 ">
                    { item.image? (
                      <div className="post_img">
                        <img
                          src={`http://localhost:8000${item.image}`}
                          alt=""
                        ></img>
                      </div>
                    ) : (
                      <div className="notImageDiv"> </div>
                    )}
                    <div className="post_Info">
                    <div className="post_date d-flex flex-wrap justify-content-between">
                        <span>{item.date}</span>{" "}
                        <button
                          className="viewResponsBtn"
                          onClick={handleShow3}
                        >
                          {" "}
                          view response
                        </button>
                        <Modal show={show3} onHide={handleClose3}>
                          <Modal.Header closeButton>
                            <Modal.Title>Write your post. . . .</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CSRFToken />
                            {item.comments.map((comment) => {
                              console.log(comment);
                              return (
                                <div>
                                  <div className="d-flex justify-content-start">
                                    <div className="commentImgDiv">
                                      <img
                                        src={`http://localhost:8000${comment.profile.image}`}
                                      ></img>
                                    </div>
                                    <div className="commentUserNameDiv">
                                      <p>{comment.profile.name}</p>
                                      <p className="commentDate">
                                        {comment.date}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="commentDiv">
                                    <p>{comment.comments}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose3}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      <div className="posUserName">
                        <h3>{item.profile.name}</h3>
                      </div>                      

                      <div className="postCaption">
                        <p>{item.text}</p>
                      </div>

                      <Button className="" onClick={handleShow2}>
                        Response
                      </Button>

                      <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                          <Modal.Title>Comment. . . .</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CSRFToken />

                          <div className="form-group">
                            <input
                              className="form-control loginInput"
                              type="text"
                              placeholder="comment"
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            />
                          </div>

                          <button
                            className="btn btn-danger "
                            onClick={() => sendComment(item.id)}
                          >
                            Submit
                          </button>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose2}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>

                    
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      ) : (
        <CreateProfiel />
      )}
    </div>
  );
};


export default Profile;
