import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetch_friends } from "../Redux/Action/FriendsAction";
import { fetch_friends_posts } from "../Redux/Action/FriendsPostAction";
import { Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import CSRFToken from "./CSRFToken";
import axios from "axios";
import { fetch_comments } from "../Redux/Action/CommentsAction";
import { fetchDonationInfo } from "../Redux/Action/DonatiionInfoAction";

const Home = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [comment, setComment] = useState("");

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
    dispatch(fetch_comments());
  };

  const requests = useSelector((state) => state.request.fetchRequests);
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);

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

  //   const sendComment = async=(id)=> {

  //     axios({
  //       method: "post",
  //       url: `${process.env.REACT_APP_API_URL}/blood/comments/`,
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         'X-CSRFToken': Cookies.get('csrftoken'),
  //         Authorization: `JWT ${localStorage.getItem("access")}`,
  //       },

  //   })
  // }

  //   axios.post( `${process.env.REACT_APP_API_URL}/blood/comments/`,data,{
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //       Authorization: `JWT ${localStorage.getItem("access")}`,
  //     }
  //   }).then(res=>console.log(res.data))

  return (
    <div className="home">
      <Navbar />
      
      <div className="Campaign">
        <h1>Campaign</h1>
      </div>
      <div className="carousaldiv">
        <Carousel>
          <Carousel.Item interval={1000}>
            <div className="carousalItem">
              <ul>
                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/1.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/2.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/3.jpg"
                    alt="First slide"
                  />
                </li>
              </ul>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <div className="carousalItem">
              <ul>
                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/1.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/2.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/3.jpg"
                    alt="First slide"
                  />
                </li>
              </ul>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousalItem">
              <ul>
                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/1.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/2.jpg"
                    alt="First slide"
                  />
                </li>

                <li className="list">
                  <img
                    className="d-block w-80"
                    src="/images/carousal/3.jpg"
                    alt="First slide"
                  />
                </li>
              </ul>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="Menu">
        <h1>Menu</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col=md-4">
            <div class="card">
              <img
                src="/images/6.jpg"
                className="card-img-top cardImg"
                alt="..."
              ></img>
              <div class="card-body">
                <Link to="/requests" className="cardText">
                  Requests
                  <span className="badge bg-danger cardBadge">
                    {requests.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col=md-4">
            <div class="card">
              <img
                src="/images/3.jpg"
                className="card-img-top cardImg"
                alt="..."
              ></img>
              <div class="card-body">
                <Link to="/donors" className="cardText">
                  Donors
                </Link>
              </div>
            </div>
          </div>

          <div className="col=md-4">
            <div class="card">
              <img
                src="/images/4.png"
                className="card-img-top cardImg"
                alt="..."
              ></img>
              <div class="card-body">
              <Link to="/list" onClick={()=>dispatch(fetchDonationInfo())} className="cardText">
              My List
                </Link>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            <h4>View Post</h4>
          </div>
          <div className="col-md-12 d-flex flex-wrap justify-content-center ">
            <div className="postDiv ">
              {posts.map((item) => {
                return (
                  <div className="postSection my-3 ">
                    {item.image !== "http://localhost:8000/media/undefined" ? (
                      <div className="post_img">
                        <img
                          src={`http://localhost:8000${item.image}`}
                          alt=""
                        ></img>
                      </div>
                    ) : (
                      <br></br>
                    )}
                    <div className="post_Info">
                      <div className="post_date d-flex flex-wrap justify-content-between">
                        <span>2221.2.21</span>{" "}
                        <button
                          className="viewResponsBtn"
                          onClick={handleShow2}
                        >
                          {" "}
                          view response
                        </button>
                        <Modal show={show2} onHide={handleClose2}>
                          <Modal.Header closeButton>
                            <Modal.Title>Comment . . .</Modal.Title>
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
                                        src={`http://localhost:8000${comment.profile.image}` }
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
                            <Button variant="secondary" onClick={handleClose2}>
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

                      <Button className="" onClick={handleShow}>
                        Response
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Write your post. . . .</Modal.Title>
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
                          <Button variant="secondary" onClick={handleClose}>
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
    </div>
  );
};

export default Home;
