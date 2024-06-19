import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import cross from "../img/crossbutton.png";
import ExerciseDetails from "./ExerciseDetails";
import Loading from "./Loading";
import FoodDetailsDialog from "./FoodDetailsDialog";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RequestListItemFood(props) {
    const [showFoodDialog, setShowFoodDialog] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const onDelete=()=>{
      axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteFoodRequest/${props.item}`,
        {
          food_name: props.item,
        }
      )
      .then((response) => {
        if (response.data.code == 1) {
          let newList = [...props.list];
          let index = newList.findIndex(
            (i) => i.food_name === props.item
          );
          newList.splice(index, 1);
          props.setList(newList);
          toast.success("Deleted successfully!");
          props.stopLoading();
        } else {
          toast.error(
            "Error occurred!"
          );
          props.stopLoading();
        }
      });

    }
  const acceptClick = () => {
    console.log("set show food dialog function called!!");
    setShowFoodDialog(true);
  };
  return (
    <div>
      <div className="request-card-item">
        <div className="name-email-div">
          {console.log(props.item)}

          {/* <div className="name-div"> */}
          <div className="name-div">{props.item}</div>
        </div>
        <div className="allow-button-div">
          <button
            className="accept-button all-website-font"
            onClick={acceptClick}
          >
            Accept
          </button>
          {/* <button className="reject-button all-website-font">Reject</button> */}
          <div className="reject-button" onClick={onDelete}>
            {/* X */}
            <input
              type="image"
              src={cross}
              name="submit"
              width="15"
              height="15"
              alt="submit"
            />
          </div>
        </div>
      </div>
      {showFoodDialog && (
        <FoodDetailsDialog
          id={props.item}
          list={props.list}
          setList={props.setList}
          
          onClose={() => {
            setShowFoodDialog(false);
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
export default RequestListItemFood;
