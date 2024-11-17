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
import { AiOutlineUser } from "react-icons/ai";

import { FaSignOutAlt } from "react-icons/fa";
import { css } from "glamor";
import { useRecoilState } from "recoil";
import { currentUser } from "../store/atoms/userState";

const Logout = (props) => {
  const [user, setUser]=useRecoilState(currentUser);
  const getName = () => {
    console.log(user.photos[0].picture);
    console.log("this is the output jo maine beja hai");
    console.log(user);
    if (
      user.displayName.substr(0, 4).toLowerCase() != "dr. " &&
      user.displayName.substr(0, 3) != "dr "
    ) {
      return "Dr. " + user.displayName;
    } else if (user.displayName.substr(0, 3).toLowerCase() == "dr ") {
      return "Dr. " + user.displayName.substr(3);
    } else {
      let s =
        user.displayName[0].toUpperCase() +
        user.displayName[1].toLowerCase() +
        user.displayName.substr(2);
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
    //     // setUser(res.data.user)
    //     // res.clearCookie("My Cookie");
    //     // if(res.success){

    //     console.log("THIS IS THE LOGOUT RESPONSE EE");
    //     console.log(res);
    //     window.location.reload();

    //     // }
    //     // setUser(null);
    //   });
  };
  return (
    <div className="logout-outmost" onClick={props.hideProfile}>
      <div className="logout-div all-scrollbar-style-none">
        <div className="profile-pic-name">
          <div>
            {/* <AiOutlineUser size={50} color="white" /> */}
            <img
              src={user.picture.replace("http://", "https://")}
              width={37}
              height={37}
              style={{ marginBottom: "10px" }}
            />
          </div>
          {/* <div style={{ paddingLeft: "10px" }}> */}
          <div
            className="all-website-font"
            style={{ color: "white", fontSize: "17px" }}
          >
            {getName()}{" "}
          </div>
          <div
            className="all-website-font"
            style={{ color: "lightgray", fontSize: "15px" }}
          >
            {user.email}
          </div>
          <div style={{ marginTop: "5px" }}>
            {user.email === "samwilson14111@gmail.com" ||
            user.email === "docrajivsingla@gmail.com" ? (
              <div className="admin-text">Admin</div>
            ) : (
              <div className="user-text">User</div>
            )}{" "}
          </div>

          {/* </div> */}
        </div>
        <div className="logout-icon-div">
          <FaSignOutAlt size={24} color="#D3D3D3" />{" "}
          <span onClick={logoutClick}>Log out</span>
        </div>
      </div>
    </div>
  );
};
export default Logout;
