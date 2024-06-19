// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Loading from "./Loading";
import download from "../img/download.png";

export const FoodDetails = (props) => {
  const location = useLocation();
  const { state } = location;

  const [exam, setexam] = useState([
    {
      CURRENT_DATE: "",
      CURRENT_TIME: "",
      DATE: "",
      FOOD_CATEGORY: "",
      FOOD_NAME: "",
      QUANTITY: "",
      TIME: "",
    },
  ]);
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  useEffect(() => {
    const x = state.details.email;
    const id=encryptEmailToUrl(x);
    // const id = state.foodProp
    //   .replace(".", "")
    //   .replace("$", "")
    //   .replace("[", "")
    //   .replace("]", "")
    //   .replace("#", "")
    //   .replace("/", "");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getFoodDetails/${id}`,
        { withCredentials: true },
        {
          email: state.foodProp,
        }
      )
      .then((res) => {
        setexam(res.data);
        console.log(res.data);
        console.log(res.data.length);
        console.log(typeof res.data);
      });

    // const todoRef = firebase.database().ref('food').child(props.match.params.id);
    // todoRef.on('value', (snapshot) => {
    //   const todos = snapshot.val();
    //   const todoList = [];
    //   for (let id in todos) {
    //     todoList.push({ id, ...todos[id] });
    //   }
    //   todoList.reverse();
    //   setexam(todoList);
    // });
  }, []);
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.

  //       console.log(user.displayName);

  //     } else {
  //       // No user is signed in.
  //     }
  //   });

  const exporthere = () => {
    console.log("my table");
    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });
    doc.save("FoodDetails.pdf");
  };

  return (
    <>
      <div className="outmost-scrolling">
        <SideNavBar details={state.details} email={state.foodProp} />
        {/* App  sidebar-margin  */}
        <div className="container-main sidebar-margin">
          <h3 className="all-website-font underline">Food Entries</h3>
          <h4 className="all-website-font underline">
            Patient Id : {state.details.email}
          </h4>
          <button
            className="all-website-font download-button"
            onClick={exporthere}
          >
            Download Report
            <img src={download} width={25} height={25} />
          </button>
          {exam != null ? (
            // insulintable
            <div className="main all-website-font">
              <table id="my-table">
                <thead>
                  <tr className="table2">
                    <th> Food Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.map((varrr) => (
                    <tr>
                      <td>{varrr.food_name}</td>
                      <td>{varrr.food_category}</td>
                      <td>{varrr.food_quantity}</td>
                      <td>{new Date(varrr.date).toLocaleDateString()}</td>
                      <td>{varrr.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Loading />
            // <h1>Not Authorised</h1>
          )}
        </div>
      </div>
      /////////////////////////////////
      {/* <div className="App">
        <h1 className="heading">Food Entries</h1>
        <h1 className="heading">Patient: {state.foodProp}</h1>
        <Button variant="primary" onClick={exporthere}>
          Download Report
        </Button>
        {localStorage.getItem("login") == "true" ? (
          <div>
            <table id="my-table" className="foodtable">
              <tr className="table-bottom">
                <th> Food Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Current Date</th>
                <th>Current Time</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              {exam.map((varrr) => (
                <tr className="table-bottom">
                  <td>{varrr.FOOD_NAME}</td>
                  <td>{varrr.FOOD_CATEGORY}</td>
                  <td>{varrr.QUANTITY}</td>
                  <td>{varrr.CURRENT_DATE}</td>
                  <td>{varrr.CURRENT_TIME}</td>
                  <td>{varrr.DATE}</td>
                  <td>{varrr.TIME}</td>
                </tr>
              ))}
            </table>
          </div>
        ) : (
          <div>Fetching...</div>
        )}
      </div> */}
    </>
  );
};

export default FoodDetails;
