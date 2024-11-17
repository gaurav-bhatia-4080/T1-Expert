import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { pendingExercise } from "../store/atoms/listsForMain";

const ExerciseDetails = (props) => {
  const [name, setName] = useState(props.id);
  const [b, setB] = useState(null);
  const [pendingList, setPendingList] = useRecoilState(pendingExercise);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBChange = (e) => {
    setB(e.target.value);
  };

  const handleSubmit = () => {
    // props.startLoading();
    toast.promise(
      axios.post(
        `${process.env.REACT_APP_API_URL}/exerciseAccepted`,
        {
          name: name,
          b: b,
        },
        { withCredentials: true }
      ),
      {
        loading: "Adding...",
        success: (res) => {
          props.onClose();
          setPendingList((prevList) =>
            prevList.filter((item) => item.exercise_name !== props.id)
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

    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/exerciseAccepted`, {
    //     name: name,
    //     b: b,
    //   })
    //   .then((response) => {
    //     if (response.data.code === 1) {
    //       axios
    //         .delete(
    //           `${process.env.REACT_APP_API_URL}/deleteExerciseRequest/${props.id}`,
    //           {
    //             exercise_name: props.id,
    //           }
    //         )
    //         .then((response) => {
    //           if (response.data.code === 1) {
    //             let newList = [...props.list];
    //             let index = newList.findIndex(
    //               (i) => i.exercise_name === props.id
    //             );
    //             newList.splice(index, 1);
    //             props.setList(newList);
    //             toast.success("Successfully added!");
    //             props.stopLoading();
    //           } else {
    //             toast.error(
    //               "Exercise added! Delete it from the list using the cross button."
    //             );
    //             props.stopLoading();
    //           }
    //         });
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
          <div style={{ fontSize: "2rem" }}>Exercise Details</div>
          <div onClick={props.onClose} style={{ cursor: "pointer" }}>
            <MdClose size={23} color="white" />
          </div>
        </div>
        <div className="dialog-content">
          <input
            name="name"
            type="text"
            className="input-div-styling"
            placeholder="Exercise Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            name="b"
            type="number"
            value={b}
            placeholder="MET Level"
            className="input-div-styling"
            onChange={handleBChange}
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

export default ExerciseDetails;
