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
import "../css/DoubleLoader.css";
import DoubleLoader from "./DoubleLoader";

const Loading = () => {
  return (
    <div className="loading-contents">
      <DoubleLoader/>
    </div>
  );
};

export default Loading;
