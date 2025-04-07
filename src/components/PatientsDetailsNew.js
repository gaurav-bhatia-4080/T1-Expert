// import firebase from '../utils/firebase';
import React, { useState, useEffect, Suspense } from "react";
import { FaAnchor } from "react-icons/fa";
import userPhoto from "../img/user1.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdTrendingUp } from "react-icons/md"; // Importing a prediction icon

import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import insulinimg from "../img/insulin.jpg";
import { FaTint } from "react-icons/fa";
import { FaRegFileAlt } from 'react-icons/fa';
import bgimg from "../img/bg.jpg";
import foodimg from "../img/food.jpg";
import { motion } from "framer-motion";
import record from "../img/record.jpg";
import PatientDetailsSkeleton from "./PatientDetailsSkeleton";
import {
  FaMars,
  FaVenus,
  FaGenderless,
  FaWeight,
  FaRulerVertical,
  FaSyringe,
  FaPhone,
  FaBirthdayCake,
  FaRegCalendarAlt,
  FaNotesMedical,
} from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import {
  GiBodyBalance,
  GiBodyHeight,
  GiSyringe,
  GiMedicalPack,
  GiHealthNormal,
} from "react-icons/gi";
import Navbar from "./Navbar";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import ToggleButton from "react-toggle-button";
import Loading from "./Loading";
import Toggle from "react-toggle";
import { useLocation } from "react-router-dom";
import NavPatientItem from "./NavPatientItem";
import MyBigCalendar from "./Calendar";
import PatientDetailsSection from "./PatientDetailsSection";
import { useRecoilState } from "recoil";
import { mypatients } from "../store/atoms/listsForMain";

var isLogin = false;

var Listid = [];
export const PatientDetailsNew = (props) => {
  const [loading, setLoading] = useState(false);
  var { id } = useParams();
  var email = decodeURIComponent(id);
  const [details, setdetails] = useRecoilState(mypatients);
  const [changePatient, setChangePatient] = useState(false);
  const location = useLocation();
  // const { patient, patientsList, initialSelectedIndex } = location.state;
  const [currPatient, setCurrPatient] = useState(
    details.find((detail) => detail.email === email)
  );
  const dob = new Date(currPatient.dob).getFullYear();
  const yod = new Date(currPatient.year_of_diabetes_diagnosis).getFullYear();
  const currYear = new Date().getFullYear();
  const [selectedIndex, setSelectedIndex] = useState(
    details.findIndex((detail) => detail.email === email)
  );

  const [appUsage, setAppUsage] = useState(
    currPatient.user_app_usage_eligiblity
  );
  const [prediction, setPrediction] = useState(
    currPatient.user_insulin_prediction_allowed
  );

  useEffect(() => {
    setAppUsage(currPatient.user_app_usage_eligiblity);
    setPrediction(currPatient.user_insulin_prediction_allowed);
  }, [currPatient]);
  const handleChangeAppUsageToggle = () => {
    setLoading(true);
    setAppUsage(!appUsage);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changeAppUsagePermission`, {
        email: currPatient.email,
        value: !appUsage,
      })
      .then((res) => {
        setLoading(false);

        // setexam(res.data);
        console.log(res);
        // console.log(res.data.length);
        // console.log(typeof res.data);
      });
  };
  const handleChangePrediction = () => {
    setLoading(true);
    setPrediction(!prediction);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changePredictionPermission`, {
        email: currPatient.email,
        value: !prediction,
      })
      .then((res) => {
        setLoading(false);

        // setexam(res.data);
        console.log(res);
        // console.log(res.data.length);
        // console.log(typeof res.data);
      });
  };

  const formatDate = (createdAt) => {
    if (!createdAt) return "Not Available"; // Handle missing field

    const date = new Date(createdAt);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('en-GB', options);
  };
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  const decryptUrlToEmail = (encryptedUrl) => {
    // URL-decode the URL-friendly code
    const urlDecodedEmail = decodeURIComponent(encryptedUrl);
    // Decode Base64 to get the original email address
    const decodedEmail = atob(urlDecodedEmail);
    console.log("EW");
    console.log(currPatient);
    return decodedEmail;
  };

  // console.log("dffeee "+useParams().Body);
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       isLogin=true;
  //       console.log(user.displayName);

  //     } else {
  //       // No user is signed in.
  //     }
  //   });

  // const [blogs,setBlogs]=useState([])
  // const fetchBlogs=async()=>{
  //   const response=db.collection('contactus');
  //   const data=await response.get();
  //   data.docs.forEach(item=>{
  //    setBlogs([...blogs,item.data()])
  //   })
  // }
  // useEffect(() => {
  //   fetchBlogs();
  // }, [])

  const thumbStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#fff",
  };

  const trackStyle = {
    display: "inline-flex", // Keep the button inline
    padding: "10px 20px", // Padding for spacing
    fontSize: "16px", // Font size for the text
    width: "auto", // Automatically adjust width
    minWidth: "100px", // Optional: Set a minimum width
    justifyContent: "center", // Center text
  };
  return (
    <div className="outmost">
      {loading ? <Loading /> : null}
      {/* <Navbar></Navbar> */}
      <span className="sidebar-span2">
        <nav className="patients-queue-side-bar-outer dark-light-back">
          <div className="patients-queue-div">Patients Queue</div>
          <div className="sort-by dark-back">
            <div className="sort-by-option selected-option dark-light-back">
              All
            </div>
            <div className="sort-by-option">Oldest</div>
            <div className="sort-by-option">Newest</div>
          </div>
          {/* <div> */}
          <ul
            style={{
              listStyleType: "none",
              margin: "0",
              padding: "0",
            }}
            className="list-styling-overflow"
          >
            {details.map((item, index) => {
              return (
                <li>
                  <NavPatientItem
                    key={index}
                    item={item}
                    index={index}
                    currPatient={currPatient}
                    setCurrPatient={setCurrPatient}
                    setSelectedIndex={setSelectedIndex}
                    selectedIndex={selectedIndex}
                    patientsList={details}
                    setChangePatient={setChangePatient}
                  />
                </li>
              );
            })}
          </ul>
          {/* </div> */}
        </nav>
        {/* <Suspense fallback={<PatientDetailsSkeleton />}> */}
        <div className="selected-patients-info-outer dark-light-back">
          {/* container-main flex-box-div  */}
          <div className="selected-patients-info">
            <nav className="nav-bar-top">
              <div className="nav-item-div">
                <NavLink
                  to=""
                  end
                  // style={({ isActive }) => ({
                  //   color: isActive ? "black" : "", // Black color only when active, otherwise inherit the default color
                  //   borderBottom: isActive ? "2px solid black" : "none", // Border only when active
                  // })}
                  className="nav-item-navlink"
                >
                  {" "}
                  Home
                </NavLink>
              </div>
              <div className="nav-item-div">
                <NavLink
                  // to="/records"
                  // style={({ isActive }) => ({
                  //   color: isActive ? "black" : "",
                  //   borderBottom: isActive ? "2px solid black" : "none",
                  // })}
                  className="nav-item-navlink"
                >
                  Records
                </NavLink>

                {/* Dropdown list for Records */}
                <div className="dropdown-list">
                  {/* <NavLink to="/records/insulin">
                    {" "}
                    <FaSyringe size={20} color="white" />
                    <div className="text-list">Insulin Dose</div>
                  </NavLink>
                  <NavLink to="/records/blood-glucose">
                    {" "}
                    <FaTint size={20} color="white" />
                    <div className="text-list">Blood Glucose</div>
                  </NavLink> */}
                  <NavLink to="formatted-data">
                    {" "}
                    <FaRegFileAlt size={20} color="white" />
                    <div className="text-list">Formatted Data</div>
                  </NavLink>

                </div>
              </div>

              <div className="nav-item-div">
                <NavLink
                  // to="/trends"
                  // style={({ isActive }) => ({
                  //   color: isActive ? "black" : "",
                  //   borderBottom: isActive ? "2px solid black" : "none",
                  // })}
                  className="nav-item-navlink"
                >
                  Trends
                </NavLink>

                {/* Dropdown list for Trends */}
                <div className="dropdown-list">
                  <NavLink to="trends-icr">
                    <MdTrendingUp size={20} color="white" />
                    <div className="text-list">ICR</div>
                  </NavLink>
                  <NavLink to="trends-blood-glucose">
                    {" "}
                    <FaTint size={20} color="white" />
                    <div className="text-list">Blood Glucose</div>
                  </NavLink>
                </div>
              </div>

              {/* <div className="nav-item-div">
                <NavLink
                  to=""
                  styles={({ isActive }) => {}}
                  className="nav-item-navlink"
                >
                  Exercise
                </NavLink>
              </div>
              <div className="nav-item-div">
                <NavLink
                  to=""
                  styles={({ isActive }) => {}}
                  className="nav-item-navlink"
                >
                  Insulin
                </NavLink>
              </div> */}
            </nav>
            <div className="patient-details-header">
              <div className="patient-details-header-div-name-img">
                <div>
                  <img src={userPhoto} height={50} width={50} />
                </div>
                <div className="name-registered-detail-div">
                  <div className="name-user-details">{currPatient.name}</div>
                  <div className="registered-div-icon">
                    <div className="padding-margin-zero">
                      <FaAnchor size={14} className="padding-margin-zero" />
                    </div>
                    <div style={{ marginLeft: "5px" }}>
                      Registered on: {formatDate(currPatient.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-patient-details-button">
                <div className="hover-details-container">
                  <button className="details-button">
                    <span className="button-text">View patient details</span>
                    <span className="dropdown-icon">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline
                          points="1,3 5,7 9,3"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="hover-popup">
                    <PatientDetailsSection currPatient={currPatient} setPatient={setCurrPatient} details={details} setDetails={setdetails} />
                  </div>
                </div>
              </div>
            </div>
            <Outlet context={{ currPatient }} />
          </div>
        </div>
      </span>
    </div>
  );
};
export default PatientDetailsNew;
