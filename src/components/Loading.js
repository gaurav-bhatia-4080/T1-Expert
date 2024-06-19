import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const Loading = (props) => {
  return (
    // 709fe6
    <div className="loading-contents">
      <BeatLoader color="#1d9bf0" />
    </div>
  );
};
export default Loading;
