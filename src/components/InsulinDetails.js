// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import autoTable from "jspdf-autotable";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Loading from "./Loading";
import download from "../img/download.png";
var isLogin = false;
var Listid = [];
export const InsulinPatient = (props) => {
  const location = useLocation();
  const { state } = location;
  // {
  //   AMOUNT: "",
  //   CATEGORY: "",
  //   CORRECTION_DOSE: "",
  //   CURRENT_DATE: "",
  //   CURRENT_TIME: "",
  //   DATE: "",
  //   TIME: "",
  //   TYPE: "",
  // },

  const [exam, setexam] = useState([]);
  const decryptUrlToEmail = (encryptedUrl) => {
    // URL-decode the URL-friendly code
    const urlDecodedEmail = decodeURIComponent(encryptedUrl);
    // Decode Base64 to get the original email address
    const decodedEmail = atob(urlDecodedEmail);
    return decodedEmail;
  };

  const exporthere = () => {
    console.log("my table");
    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });
    doc.save("Insulin.pdf");
  };
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  useEffect(() => {
    // const id = state.insulinProp;
    // const newEmail = state.insulinProp
    //   .replace(".", "")
    //   .replace("$", "")
    //   .replace("[", "")
    //   .replace("]", "")
    //   .replace("#", "")
    //   .replace("/", "");
    const x = state.details.email;
    const id = encryptEmailToUrl(x);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getInsulinDetails/${id}`,
        { withCredentials: true },
        {
          email: state.insulinProp,
        }
      )
      .then((res) => {
        setexam(res.data);
        console.log("GGGPPMM" + res.data);
        console.log(res.data.length);
        console.log(typeof res.data);
      });

    // const todoRef = firebase.database().ref('insulin').child(props.match.params.id);
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
  //       isLogin=true;
  //       console.log(user.displayName);

  //     } else {
  //       // No user is signed in.
  //     }
  //   });

  return (
    <div className="outmost-scrolling">
      <SideNavBar details={state.details} email={state.insulinProp} />
      {/* App  sidebar-margin  */}
      <div className="container-main sidebar-margin">
        <h3 className="all-website-font underline">Insulin Entries</h3>
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
                  <th>Insulin Amount</th>
                  <th>Category</th>
                  <th>Correction dose</th>
                  <th>Insulin type</th>
                  {/* <th>Recorded on</th>
                  <th>Recorded at</th> */}
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {exam.map((varrr) => (
                  <tr>
                    <td>{varrr.amount}</td>
                    <td>{varrr.category}</td>
                    <td>{varrr.correction_dose}</td>
                    <td>{varrr.type}</td>
                    {/* <td>{new Date(varrr.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(varrr.createdAt).getTime()}</td> */}
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
  );
};

export default InsulinPatient;
