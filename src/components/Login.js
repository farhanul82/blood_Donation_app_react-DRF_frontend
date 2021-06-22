import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../Redux/Action/auth";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { fetch_friends } from "../Redux/Action/FriendsAction";
import { fetch_friends_posts } from "../Redux/Action/FriendsPostAction";
import { fetch_user_posts } from "../Redux/Action/UserPostAction";
import { fetchRequests } from '../Redux/Action/RequestAction';





const Login = ({ login, isAuthenticated }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
    dispatch(fetch_friends())
    dispatch(fetch_friends_posts())
    dispatch(fetch_user_posts())
    dispatch(fetchRequests())
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    dispatch(fetch_friends())
    dispatch(fetch_friends_posts())
    dispatch(fetch_user_posts())
    dispatch(fetchRequests())
    return <Redirect to="/home" />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="loginGifDiv">
            <img src="/images/blood.gif"></img>
          </div>
          <div className="login-text">
            <h3>
              <span className="span1">Blood</span>{" "}
              <span className="span2">Donation</span>
            </h3>
          </div>
        </div>

        <div className="col-md-6">
          <h1>Sign In</h1>
          <p>Sign into your Account</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </div>
            <button className="btn  loginBtn" type="submit">
              Login
            </button>
          </form>
          <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
            Continue With Google
          </button>
          <br />
          <button
            className="btn btn-primary mt-3"
            onClick={continueWithFacebook}
          >
            Continue With Facebook
          </button>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="mt-3">
            Forgot your Password?{" "}
            <Link to="/reset-password">Reset Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
