import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {
  BeatLoader,
  CircleLoader,
  ClipLoader,
  ClockLoader,
  RotateLoader,
  RingLoader,
  MoonLoader,
  PropagateLoader,
  SyncLoader,
  FadeLoader,
} from "react-spinners";
import { Circles } from "react-loader-spinner";

const DoubleLoader = () => {
  return (
      <div className="loader-container">
        <div className="circle outer-circle">
          <div className="inner-circle-wrapper">
            <div className="circle inner-circle">
              <div className="logo-circle"></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DoubleLoader;
