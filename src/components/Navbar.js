import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../Redux/Action/auth";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetch_friends } from "../Redux/Action/FriendsAction";

const Navbar = ({ logout, isAuthenticated }) => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };
  const friend=useSelector((state) => state.friends.friends);
  console.log(friend.length)

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <li className="nav-item">
      <a className="nav-link" href="#!" onClick={logout_user}>
        Logout
      </a>
    </li>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand navImgDIv" to="/home">
          <img className="navImg" src="/images/1.png"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                <AiFillHome /> Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Profile">
                <AiOutlineUser /> Profile{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Follwers" onClick={()=>dispatch(fetch_friends())}>
                Follwers <span className="sr-only">(current)</span><span className="badge bg-danger cardBadge px-1">{friend.length}</span>
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/Requests">
                Requests <span className="sr-only">(current)</span>
              </Link>
            </li>
            {isAuthenticated ? authLinks() : guestLinks()}
          </ul>
        </div>
      </nav>
      {redirect ? <Redirect to="/" /> : <Fragment></Fragment>}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
