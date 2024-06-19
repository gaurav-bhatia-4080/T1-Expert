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
toast.configure();
function Unapproved() {
  return (
    <div>
        <h1>Please wait for the approval</h1>
    </div>
  );
}
export default Unapproved;
