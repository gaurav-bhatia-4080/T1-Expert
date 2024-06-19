// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/Button";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Loading from "./Loading";
import download from "../img/download.png";

import { useLocation } from "react-router-dom";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
var Listid = [];

var Listin = [];
var uniqueNames = [
  // {
  //   CURRENT_BG: "",
  //   CURRENT_DATE: "",
  //   CURRENT_TIME: "",
  // },
];
const data = {
  labels: Listin,
  datasets: [
    {
      label: "Blood Glucose",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: Listid,
    },
  ],
};
const exporthere = () => {
  console.log("my table");
  const doc = new jsPDF();
  autoTable(doc, { html: "#my-table" });
  doc.save("BG.pdf");
};
export const BgDetails = (props) => {
  const location = useLocation();
  const { state } = location;
  console.log("UIOOOOOOOOOOO" + state);

  // {
  //     CURRENT_BG: "",
  //     CURRENT_DATE:"",
  //     CURRENT_TIME:"",
  //     DATE:"",
  //     FOOD_CATEGORY:"",
  //     FOOD_NAME:"",
  //     QUANTITY:"",
  //     TIME:""
  //   }
  // {
  //     CURRENT_BG: "",
  //     CURRENT_DATE:"",
  //     CURRENT_TIME:""
  //   }
  const [exam, setexam] = useState([]);
  const [bgarr, setbgarr] = useState([]);
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  useEffect(() => {
    console.log("UIOOOOOOOOOOO" + state);
    const x = state.details.email;
    const id=encryptEmailToUrl(x);

    // const newEmail = state.bgProp

    // .replace(".", "")
    //   .replace("$", "")
    //   .replace("[", "")
    //   .replace("]", "")
    //   .replace("#", "")
    //   .replace("/", "");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getPredictionExtraDetails/${id}`,
        {
          email: state.bgProp,
        }
      )
      .then((res) => {
        setexam(res.data);
        console.log(res.data);
        console.log(res.data.length);
        console.log(typeof res.data);
      });

    // const todoRef = firebase.database().ref('exercise_entry').child('Prediction').child(props.match.params.id);
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

  return (
    <div className="outmost-scrolling">
      <SideNavBar details={state.details} email={state.bgprop} />
      <div className="container-main sidebar-margin">
        <h3 className="all-website-font underline">Blood Glucose Trend</h3>
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
      {/* <h1 className="heading">Blood Glucose Trend</h1> */}
      {/* {props.match.params.id}           */}
      {/* <h1 className="heading">Patient: {state.bgProp}</h1> */}
      {/* <Button variant="primary" onClick={exporthere}>
        Download BG Record
      </Button> */}
      {exam!=null? (
        <div className="all-website-font">
          {exam.map((varrr) => {
            let tryth = {
              CURRENT_BG: varrr.current_bg,
              CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
              CURRENT_TIME: varrr.time,
            };
            let obj = uniqueNames.find(
              (o) =>
                o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString() &&
                o.CURRENT_TIME === varrr.time
            );
            // console.log(obj)
            if (obj == null) {
              uniqueNames.push(tryth);
              Listid.push(parseInt(varrr.current_bg, 10) + 1);
              Listin.push(new Date(varrr.date).toLocaleDateString());
            }
          })}
          <div className="main">
            {" "}
            <Line className="BgGraph" data={data} />
          </div>
          <h3 className="all-website-font underline">Blood Glucose Entries</h3>
          {
            <table className="BGtable" id="my-table">
              <thead>
              <tr className="table2">
                <th>Blood Glucose</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              </thead>
              <tbody>              
              {uniqueNames.map((varrr) => (
                <tr>
                  <td>{varrr.CURRENT_BG}</td>
                  <td>{varrr.CURRENT_DATE}</td>
                  <td>{varrr.CURRENT_TIME}</td>
                </tr>
              ))}
              </tbody>              
            </table>
          }
        </div>
      ) : (
        <Loading/>
      )}
    </div>
    </div>

  );
};

export default BgDetails;
