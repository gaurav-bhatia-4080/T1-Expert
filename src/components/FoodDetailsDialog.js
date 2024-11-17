import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import { MdClose } from "react-icons/md";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { pendingFood } from "../store/atoms/listsForMain";

const FoodDetailsDialog = (props) => {
  const [name, setName] = useState(props.id);
  const [pendingList, setPendingList] = useRecoilState(pendingFood);
  const [calories, setCalories] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [proteins, setProteins] = useState(null);
  const [fat, setFat] = useState(null);
  const [servingSize, setServingSize] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleCalorieChange = (e) => setCalories(e.target.value);
  const handleCarbsChange = (e) => setCarbs(e.target.value);
  const handleProteinsChange = (e) => setProteins(e.target.value);
  const handleFatChange = (e) => setFat(e.target.value);
  const handleServingSizeChange = (e) => setServingSize(e.target.value);

  const handleSubmit = () => {
    toast.promise(
      axios.post(
        `${process.env.REACT_APP_API_URL}/foodAccepted`,
        {
          name,
          calories,
          proteins,
          carbs,
          fat,
          servingSize,
        },
        { withCredentials: true }
      ),
      {
        loading: "Adding...",
        success: (res) => {
          props.onClose();
          setPendingList((prevList) =>
            prevList.filter((item) => item.food_name !== props.id)
          );
          return "Added successfully.";
        },
        error: (err) => {
          props.onClose();
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

    // toast
    //   .promise(
    //     axios
    //       .post(
    //         `${process.env.REACT_APP_API_URL}/foodAccepted`,
    //         {
    //           name,
    //           calories,
    //           proteins,
    //           carbs,
    //           fat,
    //           servingSize,
    //         },
    //         { withCredentials: true }
    //       )
    //       .then((response) => {
    //         // Check if the response indicates success
    //         if (response.data.code === 1) {
    //           props.stopLoading();
    //           return Promise.resolve(); // Resolve the promise for success
    //         } else {
    //           props.stopLoading();
    //           return Promise.reject(new Error("Error occurred!")); // Reject the promise for failure
    //         }
    //       }),
    //     {
    //       loading: "Saving...",
    //       success: <b>Changes saved!</b>,
    //       error: <b>Something went wrong. Try again!</b>,
    //     },
    //     {
    //       iconTheme: {
    //         primary: "black",
    //         secondary: "white",
    //       },
    //       style: {
    //         fontFamily: "'Balsamiq Sans', cursive",
    //       },
    //     }
    //   )
    //   .catch((e) => {
    //     console.error(e); // Handle error globally
    //   });

    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}/foodAccepted`,
    //     {
    //       name,
    //       calories,
    //       proteins,
    //       carbs,
    //       fat,
    //       servingSize,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     if (response.data.code === 1) {
    //       toast.success("added");
    //       props.stopLoading();
    //     } else {
    //       toast.error("Error occurred!");
    //       props.stopLoading();
    //     }
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  // Create the dialog content
  const dialogContent = (
    <div className="dialog-container open">
      <div className="dialog-box">
        <div className="dialog-header">
          <div style={{ fontSize: "2rem" }}>Food Details</div>
          <div onClick={props.onClose} style={{ cursor: "pointer" }}>
            <MdClose size={23} color="white" />
          </div>
        </div>
        <div className="dialog-content">
          <input
            className="input-div-styling"
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            className="input-div-styling"
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={handleCalorieChange}
          />
          <input
            className="input-div-styling"
            type="number"
            placeholder="Carbs"
            value={carbs}
            onChange={handleCarbsChange}
          />
          <input
            className="input-div-styling"
            type="number"
            value={proteins}
            placeholder="Protein"
            onChange={handleProteinsChange}
          />
          <input
            className="input-div-styling"
            type="number"
            value={fat}
            placeholder="Fat"
            onChange={handleFatChange}
          />
          <input
            className="input-div-styling"
            value={servingSize}
            placeholder="Serving Size"
            onChange={handleServingSizeChange}
          />
          <div className="submit-button" onClick={handleSubmit}>
            Add to Database
          </div>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render the dialog outside of the parent
  return ReactDOM.createPortal(dialogContent, document.body);
};

export default FoodDetailsDialog;
