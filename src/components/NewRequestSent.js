"use client";
import React, { useRef } from "react";
import { useState, useMemo, useEffect } from "react";

const NewRequestSent = (props) => {
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

  useEffect(() => {}, []);
  const logoutClick = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/web/logout`, "_self");
  };

  return (
    <>
      <div className="real all-website-font">
        <div className={`${"div-title-motto-dark"}`}>
          <div className="div-title">
            <div className="title-motto">
              <div>
                <p
                  style={{
                    display: "inline",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  T1 Expert
                </p>
              </div>
            </div>
          </div>
          <div className="profile-info-div">
            <div className="img-div pointer-class">
              <img
                src={`${props.user.photos[0].value}`}
                width={100}
                height={100}
              />
            </div>
            <div className="div-name">{getName()} </div>
          </div>
          <div className="div-motto">
            <div className="motto-inside-divs-quote">
              Please wait until we process your request.
            </div>
            <div className="motto-inside-divs-quote">
              This can take 1 or 2 days.{" "}
            </div>

            <div className="div-motto2">
              <div className="motto-inside-divs">
                For any queries, you can reach out to us on
              </div>
              <div className="motto-inside-divs motto-inside-divs-email">
                docrajivsingla@gmail.com
              </div>
            </div>
          </div>

          <div className="div-got-it">
            <button className="button-got-it" onClick={logoutClick}>
              got it
            </button>
          </div>
        </div>
      </div>

      <div className="outmost-div-motto"></div>
    </>
  );
};
export default NewRequestSent;
