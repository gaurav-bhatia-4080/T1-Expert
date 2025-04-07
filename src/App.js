import "./App.css";
import React, { Fragment, Suspense } from "react";
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
import ICRTrends from "./components/ICRTrends";
import BloodGlucoseTrends from "./components/BloodGlucoseTrends";

import { currentUser } from "./store/atoms/userState";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
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
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import PatientDetailsSection from "./components/PatientDetailsSection";
import PatientDetailsSkeleton from "./components/PatientDetailsSkeleton";

// import PatientLogin from './components/PatientLogin';
// import MonthRecord from './components/MonthRecord';
// import SinglePatientDetail from './components/SinglePatientDetail'
// https://sheets.googleapis.com/v4/spreadsheets/{{googleSheetId}}
function App() {
  const [user, setUser] = useRecoilState(currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? (
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
      ),
    },
    {
      path: "/login",
      element: user ? (
        <Navigate to="/" />
      ) : (
        <Landing user={user} setUser={setUser} />
      ),
    },
    {
      path: "/patient-details/:id",
      element: user ? (
        <PatientDetailsNew user={user} setUser={setUser} />
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        {
          index: true,
          element: <MonthRecord />,
        },
        // {
        //   path: "trends",
        //   element: <BloodGlucoseTrends />,
        // },
        {
          path: "formatted-data",
          element: (
            <Suspense fallback={<PatientDetailsSkeleton />}>
              <MonthRecord />{" "}
            </Suspense>
          ),
        },
        {
          path: "trends-icr",
          element: (
            <Suspense fallback={<PatientDetailsSkeleton />}>
              <ICRTrends />{" "}
            </Suspense>
          ),
        },
        {
          path: "trends-blood-glucose",
          element: (
            <Suspense fallback={<PatientDetailsSkeleton />}>
              <BloodGlucoseTrends />{" "}
            </Suspense>
          ),
        },
      ],
    },
  ]);
  // const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/web/login/success`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      console.log(data);
      console.log("1111111111111111111111111111111111111111111111111111111111");
      console.log(data.user);
      setUser(data.user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
    // <Router>
    //   <Fragment>
    //     <Routes></Routes>
    //     <section>
    //       <switch>
    //         <Routes>
    //           <Route
    //             exact
    //             path="/"
    //             element={
    //               user ? (
    //                 "type" in user ? (
    //                   user.type == 0 ? (
    //                     <Unapproved user={user} />
    //                   ) : user.type == -1 ? (
    //                     <NewDoctorOnboardingForm user={user} />
    //                   ) : (
    //                     <Main user={user} setUser={setUser} />
    //                   )
    //                 ) : (
    //                   <Main user={user} setUser={setUser} />
    //                 )
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/login"
    //             element={
    //               user ? (
    //                 <Navigate to="/" />
    //               ) : (
    //                 <Landing user={user} setUser={setUser} />
    //               )
    //             }
    //           />

    //           <Route
    //             exact
    //             path="/food-database"
    //             element={
    //               user ? (
    //                 <Fooddb user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patients"
    //             element={
    //               user ? (
    //                 <Patients user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patient-details/:id"
    //             element={
    // user ? (
    //   <PatientDetailsNew user={user} setUser={setUser} />
    // ) : (
    //   <Navigate to="/login" />
    // )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patient-details/:id/insulin"
    //             element={
    //               user ? (
    //                 <InsulinPatient user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patient-details/:id/food"
    //             element={
    //               user ? (
    //                 <FoodDetails user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patient-details/:id/bg"
    //             element={
    //               user ? (
    //                 <BgDetails user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/patient-details/:id/formattedRecord"
    //             element={
    //               user ? (
    //                 <MonthRecord user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />

    //           <Route
    //             exact
    //             path="/patient-details/:id/prediction"
    //             element={
    //               user ? (
    //                 <PredictionDetails user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />

    //           <Route
    //             exact
    //             path="/prediction-edit/:id"
    //             element={
    //               user ? (
    //                 <EditPrediction user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //           <Route
    //             exact
    //             path="/add-prediction"
    //             element={
    //               user ? (
    //                 <AddPrediction user={user} setUser={setUser} />
    //               ) : (
    //                 <Navigate to="/login" />
    //               )
    //             }
    //           />
    //         </Routes>
    //       </switch>
    //     </section>
    //   </Fragment>
    // </Router>
  );
}

export default App;
