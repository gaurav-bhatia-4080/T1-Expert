// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import insulinimg from "../img/insulin.jpg";
import bgimg from "../img/bg.jpg";
import foodimg from "../img/food.jpg";
import record from "../img/record.jpg";
import Navbar from "./Navbar";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import ToggleButton from "react-toggle-button";
import Loading from "./Loading";
import Toggle from "react-toggle";
import { useLocation } from "react-router-dom";
var isLogin = false;
var Listid = [];

export const PatientDetails = (props) => {
  const [loading, setLoading] = useState(false);
  var { id: email } = useParams();
  const location = useLocation();
  const { details } = location.state;
  const dob=new Date(details.dob).getFullYear();
  const yod=new Date(details.year_of_diabetes_diagnosis).getFullYear();
  const currYear=new Date().getFullYear();

  const [appUsage, setAppUsage] = useState(details.user_app_usage_eligiblity);
  const [prediction, setPrediction] = useState(
    details.user_insulin_prediction_allowed
  );
  const handleChangeAppUsageToggle = () => {
    setLoading(true);
    setAppUsage(!appUsage);
    axios
      .post(`${process.env.REACT_APP_API_URL}/changeAppUsagePermission`, {
        email: details.email,
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
        email: details.email,
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
    console.log(details);
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

  return (
    <div className="outmost-scrolling">
      {loading ? <Loading /> : null}
      {/* <Navbar></Navbar> */}
      <SideNavBar email={email} details={details} />
      <div className="container-main sidebar-margin">
        <h3 className="all-website-font underline">Patient Details</h3>
        <h2 className="head-2 all-website-font underline">
        Patient Id: {decryptUrlToEmail(email)}
        </h2>
        <div className="main all-website-font">
          <table>
            <tr>
              <td>Name</td>
              <td>{details.name}</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{details.sex}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{`${details.height} cm`}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{`${details.height} kg`}</td>
            </tr>
            <tr>
              <td>T1 Life Features Access</td>
              <td>
                {
                  <ToggleButton
                    value={appUsage}
                    onToggle={handleChangeAppUsageToggle}
                  />
                  // Different labels example...

                  // 'inactiveLabel' - a string or component to display when OFF.
                  // 'activeLabel' - a string or component to display when ON.
                }
              </td>
            </tr>
            <tr>
              <td>Insulin Prediction</td>
              <td>
                {
                  <ToggleButton
                    value={prediction}
                    onToggle={handleChangePrediction}
                  />
                }
              </td>
            </tr>
            <tr>
              <td>
                Total Daily Doses (Basal + Bolus) recorded during onboarding
              </td>
              <td>{`${details.total_doses} units`}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{`${currYear-dob} years`}</td>
            </tr>
            <tr>
              <td>Diabetes diagnosis year</td>
              <td>{yod}</td>
            </tr>
          </table>
        </div>
        {/* <div className="patient-details">
          <div className="patient-details">
            <Card className="carddisplay3 news-card" style={{ width: "20rem" }}>
              <Card.Body>
                <div>
                  <Card.Title> Insulin Details </Card.Title>
                  <Button variant="primary">
                    {" "}
                    <NavLink
                      className="button-back"
                      to={
                          "/patient-details/" +
                          email
                            .replace(".", "")
                            .replace("$", "")
                            .replace("[", "")
                            .replace("]", "")
                            .replace("#", "")
                            .replace("/", "") +
                          "/insulin"
                      }
                      state={{
                        insulinProp: email,
                      }}

>
                      {" "}
                      Details
                    </NavLink>
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="carddisplay3 news-card" style={{ width: "20rem" }}>
              <Card.Body>
                <div>
                  <Card.Title> Blood Glucose Details </Card.Title>
                  <Button variant="primary">
                    <Link
                      className="button-back"
                      to={
                        "/patient-details/" +
                        email
                          .replace(".", "")
                          .replace("$", "")
                          .replace("[", "")
                          .replace("]", "")
                          .replace("#", "")
                          .replace("/", "") +
                        "/bg"
                      }
                      state={{
                        bgProp: email,
                      }}
                    >
                      {" "}
                      Details{" "}
                    </Link>
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="carddisplay3 news-card" style={{ width: "20rem" }}>
              <Card.Body>
                <div>
                  <Card.Title> Food Details </Card.Title>
                  <Button>
                    {" "}
                    <Link
                      className="button-back"
                      to={
                          "/patient-details/" +
                          email
                            .replace(".", "")
                            .replace("$", "")
                            .replace("[", "")
                            .replace("]", "")
                            .replace("#", "")
                            .replace("/", "") +
                          "/food"
                      }
                      state={{
                        foodProp: email,
                      }}
                      
                    >
                      {" "}
                      Details{" "}
                    </Link>
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Card className="carddisplay3 news-card" style={{ width: "20rem" }}>
              <Card.Body>
                <div>
                  <Card.Title> Formatted Record </Card.Title>
                  <Button>
                    {" "}
                    <NavLink
                      className="button-back"
                      to={
                          "/patient-details/" +
                          email
                            .replace(".", "")
                            .replace("$", "")
                            .replace("[", "")
                            .replace("]", "")
                            .replace("#", "")
                            .replace("/", "") +
                          "/record"
                      }
                      state={{
                        foodProp: email,
                      }}

                    >
                      {" "}
                      Details{" "}
                    </NavLink>
                  </Button>
                </div>
              </Card.Body>
            </Card>

          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PatientDetails;
