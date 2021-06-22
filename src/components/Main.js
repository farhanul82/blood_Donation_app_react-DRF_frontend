import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../hocs/Layout";
import Signup from "./Signup";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import ResetPassword from "./ResetPassword";
import Activate from "./Activate";
import Starter from "./Starter";
import Profile from "./Profile";
import Donors from "./Donors";
import RenderDonor from "./RenderDonor";
import { checkAuthenticated, load_user } from "../Redux/Action/auth";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchDonors } from "../Redux/Action/SearchDonorsAction";
import SearchDonorProfile from "./SearchDonorProfile";
import Request from "./Request";
import EditProfile from "./EditProfile";
import Post from "./Post";
import Friends from "./Friends";
import { fetch_friends } from "../Redux/Action/FriendsAction";
import DonationInfo from "./DonationInfo";
import { fetchDonationInfo } from "../Redux/Action/DonatiionInfoAction";
import { fetch_friends_posts } from "../Redux/Action/FriendsPostAction";
import { fetch_user_posts } from "../Redux/Action/UserPostAction";
import { fetchRequests } from '../Redux/Action/RequestAction';
import MyList from "./MyList";




const Main = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
   dispatch(fetch_friends())
   dispatch(fetch_friends_posts())
   dispatch(fetch_user_posts())
   dispatch(fetchRequests())
  }, []);


 
 

  return (
    <div>
      <Router>
        <Layout>
        <Switch>
          <Route  exact path="/posts">
            <Post/>
          </Route>


          <Route exact path="/">
            <Starter />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>

          <Route exact path="/edit_Profile/:id">
            <EditProfile/>
          </Route>

          <Route exact path="/donation_info/:id">
            <DonationInfo/>
          </Route>

        <Route exact path = "/donorProfile">
          <SearchDonorProfile/>
        </Route>

          <Route exact path="/donors">
            <Donors/>
          </Route>
          <Route exact path="/renderDoner">
            <RenderDonor/>
          </Route>

          <Route exact path='/requests'>
            <Request/>
          </Route >
           
          <Route exact path='/list'>
            <MyList/>
          </Route >

          <Route exact path="/Follwers">
          <Friends/>
          </Route>

          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path="/facebook" component={Facebook} />
            <Route exact path="/google" component={Google} /> */}
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />
        </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default Main;
