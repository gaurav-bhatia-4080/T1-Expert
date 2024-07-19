import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ExerciseDetails from "./ExerciseDetails";
import Loading from "./Loading";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import RequestListItemFnE from "./RequestListItemFnE";
import RequestListItemFood from "./RequestLIstItemFood";
import RequestListItem from "./RequestListItem";
import "react-toastify/dist/ReactToastify.css";
import logout from "../img/logout2.png";
import exit from "../img/exit.png";

import { css } from "glamor";

const Logout = (props) => {
  const getName = () => {
    if (
      props.user.displayName.substr(0, 4).toLowerCase() != "dr. " &&
      props.user.displayName.substr(0, 3) != "dr "
    ) {
      return "Dr. " + props.user.displayName;
    } else if (props.user.displayName.substr(0, 3).toLowerCase() == "dr ") {
      return "Dr. " + props.user.displayName.substr(3);
    } else {
      let s =
        props.user.displayName[0].toUpperCase() +
        props.user.displayName[1].toLowerCase() +
        props.user.displayName.substr(2);
      return s;
    }
  };

  const logoutClick = () => {
    // ,{},{withCredentials:true}
    window.open(`${process.env.REACT_APP_API_URL}/auth/web/logout`, "_self");
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/auth/web/logout`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     // props.setUser(res.data.user)
    //     // res.clearCookie("My Cookie");
    //     // if(res.success){

    //     console.log("THIS IS THE LOGOUT RESPONSE EE");
    //     console.log(res);
    //     window.location.reload();

    //     // }
    //     // props.setUser(null);
    //   });
  };
  return (
    <div className="logout-outmost" onClick={props.hideProfile}>
      <div className="logout-div">
        <div className="profile-pic-name">
          <img src={`${props.user.photos[0].value}`} width={35} height={35} />
          <span>{getName()} </span>
        </div>
        <div className="logout-icon-div">
          <img src={logout} width={25} height={25} />
          <span onClick={logoutClick}>Log out</span>
        </div>
      </div>
    </div>
  );
};
export default Logout;
