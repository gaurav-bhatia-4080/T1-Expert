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
import noReq from "../img/no-requests.png";
import { css } from "glamor";
import ToggleButton from "react-toggle-button";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaUserMd, FaAppleAlt, FaDumbbell, FaProcedures } from "react-icons/fa";
// import "react-pro-sidebar/dist/css/styles.css";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SideBarData";
// import './Navbar.css';
import { IconContext } from "react-icons";
import insulinlog from "../img/insulinlog.png";
import bglog from "../img/bglog2.png";
import doctor from "../img/law-enforcement.png";
import fitness from "../img/fitness.png";
import food from "../img/food.png";
import patient from "../img/patient.png";
import foodlog from "../img/foodlog2.png";
import file from "../img/file.png";
import prediction from "../img/prediction4.png";
import leftChevron from "../img/undo.png";
import home from "../img/homexx.png";

import RequestListItemDoctor from "./RequestListItemDoctor";
import SideNavBar from "./SideNavBar";
import SideNavBarMain from "./SideNavBarMain";
toast.configure();

function Main({ user, setUser }) {
  const [patientsList, setPatientsList] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [exerciseList, setExerciseList] = useState(null);
  const [doctorList, setDoctorList] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [docPatients, setDocPatients] = useState(null);
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [showFoodDialog, setShowFoodDialog] = useState(false);
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };
  const [selected, setSelected] = useState(
    user.email == "samwilson14111@gmail.com" ||
      user.email == "docrajivsingla@gmail.com"
      ? "doctor"
      : "patients"
  );

  const handleSelect = (option) => {
    setSelected(option);
  };

  const menuItemStyle = (option) => ({
    fontSize: "15px",
    color: selected === option ? "black" : "rgb(104, 170, 245)",

    width: "95%",
    height: "100%",
    display: "flex",
    // flexDirection: "row"
    // justifyContent: "space-between;
    alignItems: "center",
    // padding: " 0 10px",
    marginLeft: "0",
    marginRight: "0",
    margin: "0px",
    // padding: "0px",
    paddingLeft: "10px",
    borderRadius: "5px",
    borderStyle: selected === option ? "solid" : "none",
    borderColor: selected === option ? "rgb(23, 90, 179)" : "none",
    borderWidth: selected === option ? "1px" : "none",

    borderLeftStyle: selected === option ? "solid" : "none",
    borderLeftColor: selected === option ? "rgb(23, 90, 179)" : "none",
    borderLeftWidth: selected === option ? "5px" : "none",
    // borderleft:"2px solid red",
    // borderleft: selected === option ? "2px solid rgb(104, 170, 245)" : "none",
    backgroundColor: selected === option ? "whitesmoke" : "",
  }); // http://localhost:8080/
  const getPendings = async () => {
    let endpoints = [
      `${process.env.REACT_APP_API_URL}/getPendingPatients/${encryptEmailToUrl(
        user.emails[0].value
      )}`,
      `${process.env.REACT_APP_API_URL}/getPendingFoods/${encryptEmailToUrl(
        user.emails[0].value
      )}`,
      `${process.env.REACT_APP_API_URL}/getPendingExercises/${encryptEmailToUrl(
        user.emails[0].value
      )}`,
      `${process.env.REACT_APP_API_URL}/getDoctors`,
    ];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
          axios.get(endpoint, { withCredentials: true })
        )
      ).then(
        ([
          { data: patientsList },
          { data: foodList },
          { data: exerciseList },
          { data: doctorList },
        ]) => {
          console.log("this is the patient's list");
          console.log(patientsList);
          console.log(patientsList.length);
          console.log(typeof patientsList);
          console.log(doctorList);
          console.log(doctorList.length);
          console.log(typeof doctorList);

          setPatientsList(patientsList);
          setFoodList(foodList);
          setExerciseList(exerciseList);
          setDoctorList(doctorList);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPendings();
  }, []);
  const subMenuTitleStyle = {
    color: "white",
    fontWeight: "bold",
    paddingLeft: "20px",
    margin: "5px 0",
  };
  const sectionTitleStyle = {
    color: "white",
    fontWeight: "bold",
    paddingLeft: "20px",
    margin: "10px 0",
    flex: 1, // Add flex to make titles take available space
    display: "flex",
    alignItems: "center",
  };
  return (
    <div className="outmost">
      <Navbar user={user} setUser={setUser} currentComponent={"Home"} />
      {/* <span className="outer-nav-list"> */}
      <span className="sidebar-span">
        {/* <IconContext.Provider className="margin-padding" value={{ color: "#fff" }}> */}
        <nav className="nav-menu2">
          <ul className="nav-menu-items">
            {(user.email == "samwilson14111@gmail.com" ||
              user.email == "docrajivsingla@gmail.com") && (
              <div>
                <div className="sections-gen-req"> General</div>

                <li className="nav-text">
                  <div
                    onClick={() => handleSelect("doctor")}
                    style={menuItemStyle("doctor")}
                  >
                    <img src={doctor} width={35} height={35} />
                    <span>Experts</span>
                  </div>
                </li>
              </div>
            )}
            <div className="sections-gen-req">Requests</div>

            <li className="nav-text">
              <div
                onClick={() => handleSelect("patients")}
                style={menuItemStyle("patients")}
              >
                <img src={patient} width={35} height={35} />

                <span className="pending-count-span">
                  <span className="pending-count-span-title">Patients</span>

                  <span className="pending-count">
                    {patientsList != null
                      ? patientsList.length != 0
                        ? patientsList.length
                        : null
                      : null}
                  </span>
                </span>
              </div>{" "}
            </li>
            <li className="nav-text">
              <div
                onClick={() => handleSelect("exercise")}
                style={menuItemStyle("exercise")}
              >
                <img src={fitness} width={35} height={35} />
                <span className="pending-count-span">
                  <span className="pending-count-span-title">Exercise</span>

                  <span className="pending-count">
                    {exerciseList != null
                      ? exerciseList.length != 0
                        ? exerciseList.length
                        : null
                      : null}
                  </span>
                </span>
              </div>{" "}
            </li>
            <li className="nav-text">
              <div
                onClick={() => handleSelect("food")}
                style={menuItemStyle("food")}
              >
                <img src={food} width={35} height={35} />
                <span className="pending-count-span">
                  <span className="pending-count-span-title">Food</span>

                  <span className="pending-count">
                    {foodList != null
                      ? foodList.length != 0
                        ? foodList.length
                        : null
                      : null}
                  </span>
                </span>
              </div>{" "}
            </li>
          </ul>
        </nav>
        {/* </IconContext.Provider> */}
        {/* </span> */}
        {/* <span> */}
        <div className="flex-box-div">
          {(user.email == "samwilson14111@gmail.com" ||
            user.email == "docrajivsingla@gmail.com") &&
            selected == "doctor" && (
              <div className="pending-patients-requests-outer">
                <div className="pending-requests-title">
                  <h3 className="diff-requests-title underline2">Experts</h3>
                </div>
                <div className="div-req">
                  {doctorList == null ? (
                    <BeatLoader className="loading-list" color="#709fe6" />
                  ) : doctorList.length == 0 ? (
                    <div className="all-website-font">
                      <img src={noReq} width={35} height={35} />
                    </div>
                  ) : (
                    <div className="pending-patients-requests-list">
                      <ul>
                        {doctorList.map((doctor) => {
                          return (
                            <li>
                              <RequestListItemDoctor
                                list={doctorList}
                                doctor={doctor}
                                setList={setDoctorList}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          {selected == "patients" && (
            <div className="pending-patients-requests-outer">
              <div className="pending-requests-title">
                <h3 className="diff-requests-title underline2">New Patients</h3>
              </div>
              <div className="div-req">
                {patientsList == null ? (
                  <BeatLoader className="loading-list" color="#709fe6" />
                ) : patientsList.length == 0 ? (
                  <div className="all-website-font no-req">
                    <img src={noReq} width={300} height={300} />
                  </div>
                ) : (
                  <div className="pending-patients-requests-list">
                    <ul>
                      {patientsList.map((patient) => {
                        return (
                          <li>
                            <RequestListItem
                              list={patientsList}
                              patient={patient}
                              setList={setPatientsList}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {selected == "food" && (
            <div className="pending-patients-requests-outer">
              <div className="pending-requests-title">
                <h3 className="diff-requests-title underline2">
                  Food Requests
                </h3>
              </div>
              <div className="div-req">
                {foodList == null ? (
                  <BeatLoader className="loading-list" color="#709fe6" />
                ) : //
                foodList.length == 0 ? (
                  <div className="all-website-font no-req">
                    <img src={noReq} width={300} height={300} />
                  </div>
                ) : (
                  <div className="pending-patients-requests-list">
                    <ul>
                      {foodList.map((food) => {
                        return (
                          <li>
                            <RequestListItemFood
                              list={foodList}
                              setList={setFoodList}
                              key={food._id}
                              item={food.food_name}
                              onClick={() => {
                                console.log(
                                  "set show food dialog function called!!"
                                );
                                setShowFoodDialog(true);
                              }}
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
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {selected == "exercise" && (
            <div className="pending-patients-requests-outer">
              <div className="pending-requests-title">
                <h3 className="diff-requests-title underline2">
                  Exercise Requests
                </h3>
              </div>

              <div className="div-req">
                {exerciseList == null ? (
                  <BeatLoader className="loading-list" color="#709fe6" />
                ) : exerciseList.length == 0 ? (
                  <div className="all-website-font no-req">
                    <img src={noReq} width={300} height={300} />
                  </div>
                ) : (
                  <div className="pending-patients-requests-list">
                    <ul>
                      {exerciseList.map((exercise) => {
                        return (
                          <li>
                            <RequestListItemFnE
                              list={exerciseList}
                              setList={setExerciseList}
                              key={exercise._id}
                              item={exercise.exercise_name}
                              onClick={() => {
                                console.log(
                                  "set show exercise dialog function called!!"
                                );
                                setShowExerciseDialog(true);
                              }}
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
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* </span> */}
      </span>
    </div>
  );
}
export default Main;
