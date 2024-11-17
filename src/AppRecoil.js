import "./App.css";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Unapproved from "./components/Unapproved";
import Fooddb from "./components/FoodDatabase";
import Prediction from "./components/PredictionICR";
import PredictionDetails from "./components/PredictionDetails";
import EditPrediction from "./components/EditPrediction";
import AddPrediction from "./components/AddPrediction";
import Toaster from "react-hot-toast";
import {currentUser} from "./store/atoms/userState";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import GoogleAuth from "./components/GoogleAuth";
// import Fooddb from './components/FoodDatabase';
// import InsulinEntries from './components/InsulinEntries';
// import InsulinPatient from './components/InsulinPatient';
// import Patients from './components/Patients';
// import PatientsDetails from './components/PatientDetails';
// import InsulinDetails from './components/InsulinDetails';
// import FoodDetails from './components/FoodDetails';
// import BgDetails from './components/BgDetails';
// import Prediction from './components/PredictionICR';
// import PredictionDetails from './components/PredictionDetails';
// import EditPrediction from './components/EditPrediction';
// import AddPrediction from './components/AddPrediction';
import Main from "./components/Main";
import RotatingDot from "./components/RotatingDot";
import Patients from "./components/Patients";
import PatientDetails from "./components/PatientDetails";
import PatientDetailsNew from "./components/PatientsDetailsNew";

import InsulinPatient from "./components/InsulinDetails";
import MonthRecord from "./components/MonthRecord";
import BgDetails from "./components/BgDetails";
import FoodDetails from "./components/FoodDetails";
import NewDoctorOnboardingForm from "./components/NewDoctorOnboardingForm";
import MyCalendar from "./components/Calendar";
import MyBigCalendar from "./components/Calendar";
import MyAntdCalendar from "./components/Calendar";
import { useRecoilState } from "recoil";

// import PatientLogin from './components/PatientLogin';
// import MonthRecord from './components/MonthRecord';
// import SinglePatientDetail from './components/SinglePatientDetail'
// https://sheets.googleapis.com/v4/spreadsheets/{{googleSheetId}}
function AppRecoil() {
  const [user, setUser] = useRecoilState(currentUser);
  
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/web/login/success`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      setUser(data.user);
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Fragment>
        {/* <Toaster /> */}

        {/* <Navbar></Navbar> */}
        <Routes></Routes>
        <section>
          <switch>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  // user ? (
                  //   <Main user={user} setUser={setUser} />
                  // ) : (
                  //   <Navigate to="/login" />
                  // )
                  user ? (
                    "type" in user ? (
                      user.type == 0 ? (
                        <Unapproved user={user} />
                      ) : user.type == -1 ? (
                        <NewDoctorOnboardingForm user={user} />
                      ) : (
                        <Main user={user} setUser={setUser} />
                      )
                    ) : (
                      <Main user={user} setUser={setUser} />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              {/* <Route
                exact
                path="/login/unApproved"
                element={
                  user ? <Navigate to="/login" /> : <Unapproved user={user} />
                }
              />
 */}
              <Route
                exact
                path="/login"
                element={
                  user ? (
                    <Navigate to="/" />
                  ) : (
                    <Landing user={user} setUser={setUser} />
                  )
                }
              />

              {/* <Route exact path="/admin" element={<Landing />} /> */}
              <Route
                exact
                path="/food-database"
                element={
                  user ? (
                    <Fooddb user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patients"
                element={
                  user ? (
                    <Patients user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id"
                element={
                  user ? (
                    <PatientDetailsNew user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/insulin"
                element={
                  user ? (
                    <InsulinPatient user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/food"
                element={
                  user ? (
                    <FoodDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/bg"
                element={
                  user ? (
                    <BgDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/formattedRecord"
                element={
                  user ? (
                    <MonthRecord user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/patient-details/:id/prediction"
                element={
                  user ? (
                    <PredictionDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/prediction-edit/:id"
                element={
                  user ? (
                    <EditPrediction user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/add-prediction"
                element={
                  user ? (
                    <AddPrediction user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default AppRecoil;
