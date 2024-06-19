import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Button from "react-bootstrap/Button";
import download from "../img/download.png";

var isLogin = false;
var Listid = [];

export const PredictionDetails = (props) => {
  const location = useLocation();
  const { state } = location;

  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  const [exam, setexam] = useState({
    AVERAGE_BREAKFAST: "",
    AVERAGE_DINNER: "",
    AVERAGE_LUNCH: "",
    AVERAGE_SNACK: "",
    BREAKFAST_ICR: "",
    BREAKFAST_ISF: "",
    DINNER_ICR: "",
    DINNER_ISF: "",
    DIVISION_BY: "",
    ICR: "",
    INSULIN_DOSE: "",
    ISF: "",
    LUNCH_ICR: "",
    LUNCH_ISF: "",
    PREV_INSULIN_TIME: "",
  });

  useEffect(() => {
    // const id = state.predProp;
    const x = state.details.email;
    const id = encryptEmailToUrl(x);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getPredictionTrainedParams/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("this is prediction list");
        console.log(res);
        setexam(res.data);
      });

    //   const todoRef = firebase.database().ref('exercise_entry').child('Prediction_values').child(props.match.params.id);
    //   // todoRef.on('value', (snapshot) => {
    //   //   const todos = snapshot.val();

    //   //   console.log((todos));
    //   // });
    //   // console.log(todoRef);
    //   todoRef.on('value', (snapshot) => {
    //     const todos = snapshot.val();

    //     setexam(todos);
    //   });
  }, []);
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     isLogin=true;
  //     console.log(user.displayName);

  //   } else {
  //     // No user is signed in.
  //   }
  // });

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
      <SideNavBar details={state.details} email={state.predProp} />
      <div className="container-main sidebar-margin">
        <h3 className="all-website-font underline">Food Entries</h3>
        <h4 className="all-website-font underline">
          Patient Id : {state.details.email}
        </h4>

        {/* <h1 className="heading">Insulin Entries</h1>
          <h1 className="heading">Patient: {props.match.params.id}</h1> */}

        {exam != null ? (
          <div>
            <div class="prediction-details">
              {/* <Button variant="primary prediction-button">
                <Link
                  className="button-back"
                  // to={"/prediction-edit/" + props.match.params.id}
                >
                  {" "}
                  Edit Values{" "}
                </Link>
              </Button> */}
              <div className="main all-website-font">
                <table>
                  <tr>
                    <th>
                      Average Breakfast
                      {/* <hr></hr> */}
                    </th>
                    <th>{exam.average_breakfast}</th>
                  </tr>
                  <tr>
                    <th>
                      Average Dinner
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.average_dinner}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Average Lunch
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.average_lunch}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Average Snack
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.average_snack}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Breakfast ICR
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.breakfast_icr}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Breakfast ISF
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.breakfast_isf}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Lunch ICR
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.lunch_icr}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Lunch ISF
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.lunch_isf}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Snack ICR
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.snack_icr}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Snack ISF
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.snack_isf}
                      {/* <hr></hr> */}
                    </th>
                  </tr>

                  <tr>
                    <th>
                      Dinner ICR
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.dinner_icr}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Dinner ISF
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.dinner_isf}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Division by
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.division_by}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      ICR
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.icr}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Insulin Dose
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.insulin_dose}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      ISF
                      {/* <hr></hr> */}
                    </th>
                    <th>
                      {exam.isf}
                      {/* <hr></hr> */}
                    </th>
                  </tr>
                  <tr>
                    <th>Previous Insulin Dose Time</th>
                    <th>{exam.prev_insulin_time}</th>
                  </tr>
                </table>
              </div>
              {/* <Button variant="primary prediction-button">
                <Link className="button-back" to={"/add-prediction/"}>
                  {" "}
                  Add Patient{" "}
                </Link>
              </Button> */}
              <hr></hr>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default PredictionDetails;
