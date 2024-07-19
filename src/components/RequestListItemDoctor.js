import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import cross from "../img/crossbutton.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ToggleButton from "react-toggle-button";
import Loading from "./Loading";
function RequestListItemDoctor(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [appUsage, setAppUsage] = useState(props.doctor.web_usage_access);

//   const onAccept = () => {
//     setShowLoading(true);
//     axios
//       .post(`${process.env.REACT_APP_API_URL}/acceptNewPatientRequest`, {
//         email: props.patient.email,
//       })
//       .then((response) => {
//         axios
//           .delete(
//             `${process.env.REACT_APP_API_URL}/deleteNewPatientRequest/${props.patient.email}`,
//             {
//               email: props.patient.email,
//             }
//           )
//           .then((response) => {
//             if (response.data.code == 1) {
//               let newList = [...props.list];
//               let index = newList.findIndex(
//                 (i) => i.email === props.patient.email
//               );
//               newList.splice(index, 1);
//               props.setList(newList);
//               toast.success("Accepted successfully!");
//               setShowLoading(false);
//             } else {
//               toast.error("Error occurred!");
//               setShowLoading(false);
//             }
//           });
//       });
//   };

  const handleChangeAppUsageToggle = () => {
    setShowLoading(true);
    setAppUsage(!appUsage);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changeDoctorAppUsagePermission`, {
        email: props.doctor.email,
        value: !appUsage,
      })
      .then((res) => {
        setShowLoading(false);
        console.log(res);
      });
  };

//   const onDelete = () => {
//     axios
//       .delete(
//         `${process.env.REACT_APP_API_URL}/deleteNewPatientRequest/${props.patient.email}`,
//         {
//           patient_name: props.patient.email,
//         }
//       )
//       .then((response) => {
//         if (response.data.code == 1) {
//           let newList = [...props.list];
//           let index = newList.findIndex((i) => i.email === props.patient.email);
//           newList.splice(index, 1);
//           props.setList(newList);
//           toast.success("Request rejected successfully!");
//         } else {
//           toast.error("Error occurred!");
//         }
//       });
//   };

  return (
    <div>
      <div className="request-card-item">
        <div className="name-email-div">
          {/* <div className="name-div"> */}
          <div className="name-div">{props.doctor.name}</div>
          {/* </div> */}
          {/* <div className="email-div"> */}
          <div className="email-div">{props.doctor.email}</div>
          {/* </div> */}
        </div>
        <div className="allow-button-div">
          <ToggleButton
            value={appUsage}
            onToggle={handleChangeAppUsageToggle}
          />

          {/* <button className="accept-button all-website-font" onClick={onAccept}>
            Accept
          </button> */}
          {/* <button className="reject-button all-website-font">Reject</button> */}
          {/* <div className="reject-button" onC}>
            <input
              type="image"
              src={cross}
              name="submit"
              width="15"
              height="15"
              alt="submit"
            />
          </div> */}
        </div>
      </div>
      {showLoading && <Loading />}
    </div>
  );
}
export default RequestListItemDoctor;
