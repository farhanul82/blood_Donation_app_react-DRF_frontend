import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../Redux/Action/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetch_friends } from "../Redux/Action/FriendsAction";
import { fetchDonationInfo } from "../Redux/Action/DonatiionInfoAction";

const Layout = ({ checkAuthenticated, load_user, children,fetch_friends,fetchDonationInfo }) => {

  useEffect(() => {
    checkAuthenticated();
    load_user();  
  }, []);


  return (
    <div>
      
      {children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user,fetch_friends,fetchDonationInfo })(Layout);
