import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import cross from "../img/crossbutton.png";
import ExerciseDetails from "./ExerciseDetails";
import Loading from "./Loading";
import { FaTimes, FaCheck, FaCircle, FaPlus } from "react-icons/fa";

import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { pendingExercise } from "../store/atoms/listsForMain";

function RequestListItemFnE(props) {
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [pendingList, setPendingList] = useRecoilState(pendingExercise);

  const onDelete = () => {
    toast.promise(
      axios.delete(
        `${
          process.env.REACT_APP_API_URL
        }/deleteExerciseRequest/${encodeURIComponent(props.item)}`,
        {
          exercise_name: props.item,
        },

        {
          withCredentials: true,
        }
      ),
      {
        loading: "Deleting...",
        success: (res) => {
          setPendingList((prevList) =>
            prevList.filter((item) => item.exercise_name !== props.item)
          );
          return "Deleted successfully.";
        },
        error: (err) => {
          return "Something went wrong. Try again!";
        },
      },
      {
        iconTheme: {
          primary: "black",
          secondary: "white",
        },

        style: {
          fontFamily: "'Balsamiq Sans', cursive",
          border:"1px solid rgb(207, 207, 207)"

        },
      }
    );

    // axios
    //   .delete(
    //     `${process.env.REACT_APP_API_URL}/deleteExerciseRequest/${props.item}`,
    //     {
    //       exercise_name: props.item,
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data.code == 1) {
    //       let newList = [...props.list];
    //       let index = newList.findIndex((i) => i.exercise_name === props.item);
    //       newList.splice(index, 1);
    //       props.setList(newList);
    //       toast.success("Deleted successfully!");
    //       props.stopLoading();
    //     } else {
    //       toast.error("Error occurred!");
    //       props.stopLoading();
    //     }
    //   });
  };

  const acceptClick = () => {
    console.log("set show exercise dialog function called!!");
    setShowExerciseDialog(true);
  };
  return (
    <div>
      <div className="request-card-item" title={`${props.item}`}>
        <div className="name-email-div">
          {console.log(props.item)}

          {/* <div className="name-div"> */}
          <div className="name-div one-line-text2">{props.item}</div>
        </div>
        <div className="status-div">
          <div className="black-div-styling">
            <FaCircle size={10} color="black" style={{ paddingRight: "5px" }} />
            Pending
          </div>
        </div>

        <div className="accept-button-div">
          <div onClick={acceptClick} className="green-button-styling">
            <FaPlus size={10} color="green" style={{ paddingRight: "2px" }} />
            Add Details
          </div>
        </div>

        {/* <button
            className="accept-button all-website-font"
            onClick={acceptClick}
          >
            Accept
          </button> */}
        {/* <button className="reject-button all-website-font">Reject</button> */}
        <div className="reject-button-div">
          <div className="red-button-styling" onClick={onDelete}>
            <FaTimes size={10} color="red" style={{ paddingRight: "2px" }} />
            Reject
          </div>

          {/* X */}
          {/* <input
            type="image"
            src={cross}
            name="submit"
            width="15"
            height="15"
            alt="submit"
          /> */}
        </div>
      </div>
      {showExerciseDialog && (
        <ExerciseDetails
          id={props.item}
          list={props.list}
          setList={props.setList}
          onClose={() => {
            setShowExerciseDialog(false);
          }}
          startLoading={() => {
            setShowLoading(true);
          }}
          stopLoading={() => {
            setShowLoading(false);
          }}
        />
      )}
      {showLoading && <Loading />}
    </div>
  );
}
export default RequestListItemFnE;
