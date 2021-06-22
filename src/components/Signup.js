import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../Redux/Action/auth";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  //   const continueWithGoogle = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
  //       );

  //       window.location.replace(res.data.authorization_url);
  //     } catch (err) {}
  //   };

  //   const continueWithFacebook = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
  //       );

  //       window.location.replace(res.data.authorization_url);
  //     } catch (err) {}
  //   };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;
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
          <h1>Sign Up</h1>
          <p>Create your Account</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="First Name*"
                name="first_name"
                value={first_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="text"
                placeholder="Last Name*"
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="email"
                placeholder="Email*"
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
                placeholder="Password*"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control loginInput"
                type="password"
                placeholder="Confirm Password*"
                name="re_password"
                value={re_password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </div>
            <button className="btn signupBtn" type="submit">
              Register
            </button>
          </form>
          {/* <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
        Continue With Google
      </button>
      <br />
      <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
        Continue With Facebook
      </button> */}
          <p className="mt-3">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
