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
import { css } from "glamor";
import NewRequestSent from "./NewRequestSent";
toast.configure();
function Unapproved(props) {
  return (
    <div className="parent">
      <div className="landing-page"></div>
      <div className="WgciCg LCN0VA"> </div>

      <div className="Q7frNQ">
        <div className="_2pukyg">
          <div className="Ft_8Cg a6f7yQ"></div>
          <div className="IMy50w a6f7yQ">
          </div>
        </div>
      </div>
      <NewRequestSent user={props.user}/>
    </div>
  );
}
export default Unapproved;
