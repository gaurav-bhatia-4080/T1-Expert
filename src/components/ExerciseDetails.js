import React, { Component } from "react";
import { useState, useEffect } from "react";
import cross from "../img/crossbutton.png";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ExerciseDetails = (props) => {
  const [name, setName] = useState("");
  const [b, setB] = useState(null);

  const [showLoading, setShowLoading] = useState(true);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBChange = (e) => {
    setB(e.target.value);
  };

  const handleSubmit = () => {
    // You can perform any necessary actions with the input data here
    console.log(`Name: ${name}, Email: ${b}`);
    props.onClose();
    props.startLoading();

    axios
      .post(`${process.env.REACT_APP_API_URL}/exerciseAccepted`, {
        name: name,
        b: b,
      })
      .then((response) => {
        if (response.data.code == 1) {
          console.log("TTEERERE" + props.id);
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/deleteExerciseRequest/${props.id}`,
              {
                exercise_name: props.id,
              }
            )
            .then((response) => {
              if (response.data.code == 1) {
                let newList = [...props.list];
                let index = newList.findIndex(
                  (i) => i.exercise_name === props.id
                );
                newList.splice(index, 1);
                props.setList(newList);
                toast.success("Successfully added!");
                props.stopLoading();
              } else {
                toast.error(
                  "Exercise added! Delete it from the list using cross button."
                );
                props.stopLoading();
              }
            });
        } else {
          toast.error("Error occurred!");
          props.stopLoading();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="dialog-container open">
      <div className="dialog-box">
        <div className="dialog-header all-website-font">
          <h3>Exercise Details</h3>
          {/* <div className="reject-button">
            <input
              type="image"
              src={cross}
              name="submit"
              width="15"
              height="15"
              alt="submit"
            />
          </div>
 */}
          {/* <button className="close-btn" onClick={props.onClose}>
            X
          </button> */}
        </div>
        <div className="dialog-content">
          <label className="all-website-font">
            <span className="entries">Exercise name</span>
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className="all-website-font">
            <span className="entries">MET Level</span>
            <input name="b" type="number" value={b} onChange={handleBChange} />
          </label>
          <button
            className="submit-button all-website-font"
            onClick={handleSubmit}
          >
            Add to Database
          </button>
          <button
            className="cancel-button all-website-font"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
        {/* <div className="dialog-footer   all-website-font">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="cancel-button" onClick={props.onClose}>Cancel</button>
        </div> */}
      </div>
      {/* {showLoading && <Loading />} */}
    </div>
  );
};

export default ExerciseDetails;
