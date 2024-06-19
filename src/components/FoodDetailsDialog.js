import React, { Component } from "react";
import { useState, useEffect } from "react";
import cross from "../img/crossbutton.png";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const FoodDetailsDialog = (props) => {
  const [id, setId]=useState("");
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [proteins, setProteins] = useState(null);
  const [fat, setFat] = useState(null);
  const [servingSize, setServingSize] = useState(null);

  const [showLoading, setShowLoading] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }; 

  const handleCalorieChange = (e) => {
    setCalories(e.target.value);
  };
  const handleCarbsChange = (e) => {
    setCarbs(e.target.value);
  };
  const handleProteinsChange = (e) => {
    setProteins(e.target.value);
  };
  const handleFatChange = (e) => {
    setFat(e.target.value);
  };
  const handleServingSizeChange = (e) => {
    setServingSize(e.target.value);
  };

  const handleSubmit = () => {
    // You can perform any necessary actions with the input data here
    // console.log(`Name: ${name}, Email: ${b}`);
    props.onClose();
    props.startLoading();

    axios
      .post(`${process.env.REACT_APP_API_URL}/foodAccepted`, {
        name: name,
        calories,
        proteins,
        carbs,
        fat,
        servingSize
      })
      .then((response) => {
        if (response.data.code == 1) {
          console.log("TTEERERE" + props.id);
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/deleteFoodRequest/${props.id}`,
              {
                food_name: props.id,
              }
            )
            .then((response) => {
              if (response.data.code == 1) {
                let newList = [...props.list];
                let index = newList.findIndex(
                  (i) => i.food_name === props.id
                );
                newList.splice(index, 1);
                props.setList(newList);
                toast.success("Successfully added!");
                props.stopLoading();
              } else {
                toast.error(
                  "Food added! Delete it from the list by clicking on cross button."
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
          <h3>Food Details</h3>
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
            <span className="entries">Food name</span>
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label className="all-website-font">
            <span className="entries">Calories</span>
            <input
              type="number"
              value={calories}
              onChange={handleCalorieChange}
            />
          </label>
          <label className="all-website-font">
            <span className="entries">Carbs</span>
            <input type="number" value={carbs} onChange={handleCarbsChange} />
          </label>
          <label className="all-website-font">
            <span className="entries">Proteins</span>
            <input
              name="name"
              type="number"
              value={proteins}
              onChange={handleProteinsChange}
            />
          </label>
          <label className="all-website-font">
            <span className="entries">Fat</span>
            <input type="number" value={fat} onChange={handleFatChange} />
          </label>
          <label className="all-website-font">
            <span className="entries">Serving Size</span>
            <input
              type="text"
              value={servingSize}
              onChange={handleServingSizeChange}
            />
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

export default FoodDetailsDialog;
