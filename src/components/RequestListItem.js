import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import cross from "../img/crossbutton.png";
import axios from "axios";
import { FaTimes, FaCheck, FaCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { pendingPatients } from "../store/atoms/listsForMain";
import { useState } from "react";
import Loading from "./Loading";
function RequestListItem(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [pendingList, setPendingList] = useRecoilState(pendingPatients);

  const onAccept = () => {
    // setShowLoading(true);

    toast.promise(
      axios.post(
        `${process.env.REACT_APP_API_URL}/acceptNewPatientRequest`,
        {
          email: props.patient.email,
        },
        { withCredentials: true }
      ),
      {
        loading: "Accepting...",
        success: (res) => {
          // props.onClose();
          setPendingList((prevList) =>
            prevList.filter((item) => item.email !== props.patient.email)
          );
          return "Accepted successfully.";
        },
        error: (err) => {
          // props.onClose();
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
    //   .post(`${process.env.REACT_APP_API_URL}/acceptNewPatientRequest`, {
    //     email: props.patient.email,
    //   })
    //   .then((response) => {
    //     axios
    //       .delete(
    //         `${process.env.REACT_APP_API_URL}/deleteNewPatientRequest/${props.patient.email}`,
    //         {
    //           email: props.patient.email,
    //         }
    //       )
    //       .then((response) => {
    //         if (response.data.code == 1) {
    //           let newList = [...props.list];
    //           let index = newList.findIndex(
    //             (i) => i.email === props.patient.email
    //           );
    //           newList.splice(index, 1);
    //           props.setList(newList);
    //           toast.success("Accepted successfully!");
    //           setShowLoading(false);
    //         } else {
    //           toast.error("Error occurred!");
    //           setShowLoading(false);
    //         }
    //       });
    //   });
  };

  const onDelete = () => {
    toast.promise(
      axios.delete(
        `${process.env.REACT_APP_API_URL}/deleteNewPatientRequest/${encodeURIComponent(props.patient.email)}`,
        {
          patient_name: props.patient.email,
        },
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
            prevList.filter((item) => item.email !== props.patient.email)
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
    //     `${process.env.REACT_APP_API_URL}/deleteNewPatientRequest/${props.patient.email}`,
    //     {
    //       patient_name: props.patient.email,
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data.code == 1) {
    //       let newList = [...props.list];
    //       let index = newList.findIndex((i) => i.email === props.patient.email);
    //       newList.splice(index, 1);
    //       props.setList(newList);
    //       toast.success("Request rejected successfully!");
    //     } else {
    //       toast.error("Error occurred!");
    //     }
    //   });
  };

  return (
    <div>
      <div
        className="request-card-item"
        title={`${props.patient.name} (${props.patient.email})`}
      >
        <div className="name-email-div">
          <div className="name-div one-line-text2">{props.patient.name}</div>
          <div className="email-div one-line-text2">{props.patient.email}</div>
        </div>
        <div className="status-div">
          <div className="black-div-styling">
            <FaCircle size={10} color="black" style={{ paddingRight: "5px" }} />
            Pending
          </div>
        </div>
        <div className="accept-button-div">
          <div onClick={onAccept} className="green-button-styling">
            <FaCheck size={10} color="green" style={{ paddingRight: "2px" }} />
            Accept
          </div>
        </div>
        <div className="reject-button-div">
          <div className="red-button-styling" onClick={onDelete}>
            <FaTimes size={10} color="red" style={{ paddingRight: "2px" }} />
            Reject
          </div>
        </div>
      </div>
      {showLoading && <Loading />}
    </div>
  );
}
export default RequestListItem;
