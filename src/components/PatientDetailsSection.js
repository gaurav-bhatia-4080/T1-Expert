import React, { useState, useEffect } from "react";
import { FaAnchor } from "react-icons/fa";
import userPhoto from "../img/user1.png";
import { NavLink, useOutletContext } from "react-router-dom";
import { FaVenus, FaSyringe, FaNotesMedical } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { GiBodyBalance, GiBodyHeight } from "react-icons/gi";
import ToggleButton from "react-toggle-button";
import MyBigCalendar from "./Calendar";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa"; // Importing an app icon (heart)
import { MdTrendingUp } from "react-icons/md"; // Importing a prediction icon

export default function PatientDetailsSection() {
  const [s, setS] = useState("");
  const { currPatient } = useOutletContext();
  const dob = new Date(currPatient.dob).getFullYear();
  const yod = new Date(currPatient.year_of_diabetes_diagnosis).getFullYear();
  const currYear = new Date().getFullYear();
  const [appUsage, setAppUsage] = useState(
    currPatient.user_app_usage_eligiblity
  );
  const [prediction, setPrediction] = useState(
    currPatient.user_insulin_prediction_allowed
  );

  const handleChangeAppUsageToggle = () => {
    setAppUsage(!appUsage);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changeAppUsagePermission`, {
        email: currPatient.email,
        value: !appUsage,
      })
      .then((res) => {
        // setexam(res.data);
        console.log(res);
        // console.log(res.data.length);
        // console.log(typeof res.data);
      });
  };
  const handleChangePrediction = () => {
    setPrediction(!prediction);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changePredictionPermission`, {
        email: currPatient.email,
        value: !prediction,
      })
      .then((res) => {
        // setexam(res.data);
        console.log(res);
        // console.log(res.data.length);
        // console.log(typeof res.data);
      });
  };

  return (
    <div className="basic-details-calendar-div-outer">
      {/* <div className="access-div-details-outer">
        <div className="access-div-details">
          <div className="access-div-h">App Access </div>
          <ToggleButton
            value={appUsage}
            onToggle={handleChangeAppUsageToggle}
            className="toggle-button"
          />
        </div>
        <div className="access-div-details">
          <div className="access-div-h">Predictions </div>
          <ToggleButton value={prediction} onToggle={handleChangePrediction} />
        </div>
      </div> */}

      <div className="basic-details-div">
        <div className="basic-info">Basic Information</div>
        <div className="basic-info-side-by-side">
          <div className="basic-info-side-by-side2">
            <div className="column-details-div">
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <FaVenus size={20} color="black" />
                  <div>
                    <div className="basic-info-title">Gender</div>
                    <div className="basic-info-value">{currPatient.sex}</div>
                  </div>
                </div>
              </div>
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <GiBodyBalance size={20} color="black" />
                  <div>
                    <div className="basic-info-title">Weight</div>
                    <div className="basic-info-value">{currPatient.weight}</div>
                  </div>
                </div>
              </div>
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <GiBodyHeight size={20} color="black" />
                  <div>
                    <div className="basic-info-title">Height</div>
                    <div className="basic-info-value">{currPatient.height}</div>
                  </div>
                </div>
              </div>
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <AiOutlineCalendar size={20} color="black" />
                  <div>
                    <div className="basic-info-title">Age</div>
                    <div className="basic-info-value">{`${
                      currYear - dob
                    } years`}</div>
                  </div>
                </div>
              </div>

              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <FaSyringe size={20} color="black" />
                  <div>
                    <div className="basic-info-title">
                      Total Daily Doses (Basal + Bolus)
                      <br />
                      Recorded during onboarding
                    </div>
                    <div className="basic-info-value">{`${currPatient.total_doses} units`}</div>
                  </div>
                </div>
              </div>
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <FaNotesMedical size={20} color="black" />
                  <div>
                    <div className="basic-info-title">
                      Year of Diabetes diagnosis
                    </div>
                    <div className="basic-info-value">{yod}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column-details-div">
              {/* <div className="basic-details-title-info-div">
              <div className="basic-info-title-div">
                <FaNotesMedical size={20} color="black" />
                <div>
                  <div className="basic-info-title">
                    Year of Diabetes diagnosis
                  </div>
                  <div className="basic-info-value">{yod}</div>
                </div>
              </div>
            </div> */}
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <MdTrendingUp size={20} color="black" />
                  <div>
                    <div className="basic-info-title">Insulin Prediction</div>
                    <div className="basic-info-value">
                      {" "}
                      <ToggleButton
                        value={prediction}
                        onToggle={handleChangePrediction}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic-details-title-info-div">
                <div className="basic-info-title-div">
                  <FaRegHeart size={20} color="black" />
                  <div>
                    <div className="basic-info-title">T1 Life Access</div>
                    <div className="basic-info-value">
                      {" "}
                      <ToggleButton
                        value={appUsage}
                        onToggle={handleChangeAppUsageToggle}
                        className="toggle-button"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            {/* //ddf */}
          </div>
        </div>
      </div>
    </div>
  );
}