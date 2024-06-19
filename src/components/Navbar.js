import React from "react";
// import firebase from 'firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Component } from "react";
import { useState } from "react";
import Logout from "./Logout";
function Navbar(props) {
  const [open, setOpen] = useState(false);
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  // constructor(props){
  //   super(props);
  //   this.state = {
  //       isLogin: localStorage.getItem('login'),
  //       name:localStorage.getItem('name'),
  //       photo:localStorage.getItem('photo'),
  //       email:localStorage.getItem('email'),
  //       isAdmin: localStorage.getItem('isAdmin')
  //   }
  // }
  const onLogout = () => {
    // firebase.auth().signOut().then(() => {
    //   // Sign-out successful.
    //   localStorage.setItem("login", false);
    //   window.location.reload(false);
    //   localStorage.removeItem("login");
    //   localStorage.removeItem("name");
    //   localStorage.removeItem("photo");
    //   localStorage.removeItem("email");
    //   localStorage.removeItem("isAdmin");
    //   alert('You have Logged out');
    // }).catch((error) => {
    //   // An error happened.
    // });
  };
  const handleProfileClick = () => {
    setShowLogoutOptions(true);
    // console.log(props.user);
    // setOpen(!open);
  };
  const handleHideProfile = () => {
    setShowLogoutOptions(false);
  };
  // render(){
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container" className="outmost-div-navbar">
          {/* <a className="navbar-brand" href="#"></a> */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars" color="#ffffff"></i>
          </button> */}
          <div className="div-nav-options" id="navbarSupportedContent">
            <ul className="navbar-nav list-unstyled div-nav-ul">
              <li>
                <NavLink className="all-website-font disabled" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="all-website-font disabled"
                  to="/food-database"
                >
                  Food Database
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="all-website-font disabled" to="/patients">
                  Patients
                </NavLink>
                {/* <Link to="/latest-news">Latest news</Link> */}
              </li>
              {/* <li className="nav-item">
                <NavLink className="all-website-font disabled" to="/prediction">
                  Prediction
                </NavLink>
              </li> */}
            </ul>
          </div>

          <div className="logout-profile-nav-div div-nav-logout-options">
            {/* <ul> */}
            {/* <li className="nav-item"> */}

            <div className="img-div pointer-class" onClick={handleProfileClick}>
              <img
                src={`${props.user.photos[0].value}`}
                width={30}
                height={30}
              />
              {/* <button className="logout-button all-website-font">Logout</button> */}

              {/* <img src="../img/food.jpg" onClick={handleProfileClick} />
              {open &&(
              <div class="dropdown" onClick={handleProfileClick}>
                <ul>
                  <li>Option 1</li>
                  <li>Option 2</li>
                </ul>
              </div>)} */}
            </div>
            {/* <Link
                  className="all-website-font bold-font"        
                  to="/"
                  onClick={onLogout}
                >
                  Logout
                </Link> */}
            {/* <Link to="/latest-news">Latest news</Link> */}
            {/* </li>
            </ul> */}
          </div>
        </div>
      </nav>
      {showLogoutOptions ? (
        <Logout user={props.user} setUser={props.setUser} hideProfile={handleHideProfile} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Navbar;
