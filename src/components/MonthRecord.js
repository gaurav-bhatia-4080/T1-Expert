import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Loading from "./Loading";
import download from "../img/download.png";
import {
  getPatientInsulin,
  getPatientBG,
  getPredictionExtraDetails,
  getPredictionEntriesWithStatus,
  getFoodEntries,
} from "../store/atoms/patientDetails.js";

import { getfooddb } from "../store/atoms/listsForMain.js";
import { useRecoilState, useRecoilValue } from "recoil";

export const MonthRecord = (props) => {
  const location = useLocation();
  const { state } = location;
  const url = useParams();
  const { id } = url;
  var isLogin = false;
  var Listid = [];
  var Listin = [];
  var uniqueNames = [];

  const [exam, setexam] = useRecoilState(
    getPredictionExtraDetails(decodeURIComponent(id))
  );
  const [exambg, setexambg] = useRecoilState(
    getPatientBG(decodeURIComponent(id))
  );
  const [examinsulin, setexaminsulin] = useRecoilState(
    getPatientInsulin(decodeURIComponent(id))
  );
  const [examprediction, setexamprediction] = useRecoilState(
    getPredictionEntriesWithStatus(decodeURIComponent(id))
  );

  // const [examfood, setexamfood] = useRecoilState(
  //   getFoodEntries(decodeURIComponent(id))
  // );

  const examfood = useRecoilValue(getfooddb);

  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(examprediction);
  console.log(examprediction.length);
  const examDic = {};

  exam.forEach((entry) => {
    const { date, time, food_category } = entry;

    if (!examDic[date]) {
      examDic[date] = {};
    }

    examDic[date][time] = food_category;
  });

  const examinsulinDic = {};

  examinsulin.forEach((entry) => {
    const { date, amount, category } = entry;

    // If the date key does not exist in the dictionary, initialize it with an empty object
    if (!examinsulinDic[date]) {
      examinsulinDic[date] = {};
    }

    // Set the time as key and food_category as value under the respective date
    examinsulinDic[date][category] = amount;
  });
  console.log("HELLLLLDOFODFDFDLLLLLLLLLLLLOOOOOOOOOOOOOOOOO");
  console.log(exam);
  console.log(id);
  console.log(exam.length);

  // const [examinsulin, setexaminsulin] = useState([
  //   {
  //     AMOUNT: "",
  //     CATEGORY: "",
  //     CORRECTION_DOSE: "",
  //     CURRENT_DATE: "",
  //     CURRENT_TIME: "",
  //     DATE: "",
  //     TIME: "",
  //     TYPE: "",
  //   },
  // ]);
  // const [exambg, setexambg] = useState([
  //   {
  //     BLOOD_GLUCOSE_TYPE: "",
  //     CURRENT_DATE: "",
  //     CURRENT_TIME: "",
  //     DATE: "",
  //     TIME: "",
  //     VALUE: "",
  //   },
  // ]);
  const exporthere = () => {
    console.log("my table");
    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });
    doc.save("CombinedRecord.pdf");
  };
  // const [exam, setexam] = useState([
  //   {
  //     CURRENT_BG: "",
  //     CURRENT_DATE: "",
  //     CURRENT_TIME: "",
  //     DATE: "",
  //     FOOD_CATEGORY: "",
  //     FOOD_NAME: "",
  //     QUANTITY: "",
  //     TIME: "",
  //   },
  // ]);

  const [bgarr, setbgarr] = useState([
    {
      CURRENT_BG: "",
      CURRENT_DATE: "",
      CURRENT_TIME: "",
    },
  ]);

  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  // useEffect(() => {
  //   // const id = state.insulinProp;
  //   const x = state.details.email;
  //   const id = encryptEmailToUrl(x);

  //   let endpoints = [
  //     `${process.env.REACT_APP_API_URL}/getPatientPredExtraDetails/${id}`,
  //     `${process.env.REACT_APP_API_URL}/getPatientBG/${id}`,
  //     `${process.env.REACT_APP_API_URL}/getPatientInsulin/${id}`,
  //   ];
  //   try {
  //     Promise.all(
  //       endpoints.map((endpoint) =>
  //         axios.get(endpoint, { withCredentials: true })
  //       )
  //     ).then(([{ data: exam }, { data: exambg }, { data: examinsulin }]) => {
  //       console.log("these are the record lists");
  //       console.log(exam);
  //       console.log(exambg);
  //       console.log(examinsulin);
  //       setexam(exam);
  //       setexambg(exambg);
  //       setexaminsulin(examinsulin);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);
  return (
    <div className="basic-details-calendar-div-outer">
      {/* <SideNavBar details={state.details} email={state.recordProp} /> */}

      <div className="basic-details-div">
        {/* <div className="pending-patients-requests-outer"> */}
        {/* <div className="pending-requests-title">

          <h3 className="diff-requests-title underline2">Formatted Data</h3>
          <h4 className="diff-requests-title underline2">
          </h4>
          <button
            className="all-website-font download-button"
            onClick={exporthere}
          >
            Download Report
            <img src={download} width={25} height={25} />
          </button>
          </div> */}
        {exam != null && exambg != null && examinsulin != null ? (
          // className="div-req"
          <div>
            {/* className="pending-patients-requests-list2" */}
            <div>
              {exam.map((varrr) => {
                console.log("TIS IS THE DATE TO CHECK");
                console.log(varrr.date);
                console.log(new Date(varrr.date).toLocaleDateString());
                const food_name = varrr.food_name
                  .split("[")
                  .map((x) => x.trim())[0];
                const name = examfood.find((x) => x.name == food_name);
                const quantity = varrr.food_quantity;
                const carbs = name.carbs * quantity;
                let obj = uniqueNames.find(
                  (o) =>
                    o.CURRENT_DATE == new Date(varrr.date).toLocaleDateString()
                );
                console.log("date");
                console.log(new Date(varrr.date).toLocaleDateString());
                if (obj == null) {
                  if (varrr.food_category == "Breakfast") {
                    console.log("GOT NULL DATE");
                    console.log(new Date(varrr.date).toLocaleDateString());

                    let tryth = {
                      Fasting: varrr.current_bg,
                      abf: "--",
                      bcarbs: carbs.toFixed(2),
                      lcarbs: "--",
                      dcarbs: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: varrr.current_bg,
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                    };
                    uniqueNames.push(tryth);
                    console.log(tryth);
                  } else if (varrr.food_category == "Lunch") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: varrr.current_bg,
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: varrr.current_bg,
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      lcarbs: carbs.toFixed(2),
                      dcarbs: "--",
                    };
                    uniqueNames.push(tryth);
                  } else if (varrr.food_category == "Dinner") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: varrr.current_bg,
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: varrr.current_bg,
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      lcarbs: "--",
                      dcarbs: carbs.toFixed(2),
                    };
                    uniqueNames.push(tryth);
                  }
                  // uniqueNames.push(tryth);
                  // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
                  // Listin.push(varrr.CURRENT_DATE)
                } else {
                  let tryth = obj;
                  if (varrr.food_category == "Lunch") {
                    // uniqueNames.pop(tryth);
                    if (obj.lcarbs != "--") {
                      let prevcarbs = parseFloat(obj.lcarbs);
                      obj.lcarbs = (prevcarbs + carbs).toFixed(2);
                    } else {
                      obj.lcarbs = carbs.toFixed(2);
                    }
                    obj.bl = varrr.current_bg;
                    // uniqueNames.push(tryth);
                  } else if (varrr.food_category == "Breakfast") {
                    // uniqueNames.pop(tryth);
                    if (obj.bcarbs != "--") {
                      let prevcarbs = parseFloat(obj.bcarbs);
                      obj.bcarbs = (prevcarbs + carbs).toFixed(2);
                    } else {
                      obj.bcarbs = carbs.toFixed(2);
                    }

                    obj.Fasting = varrr.current_bg;
                    // uniqueNames.push(tryth);
                  } else if (varrr.food_category == "Dinner") {
                    // uniqueNames.pop(tryth);
                    if (obj.dcarbs != "--") {
                      let prevcarbs = parseFloat(obj.dcarbs);
                      obj.dcarbs = (prevcarbs + carbs).toFixed(2);
                    } else {
                      obj.dcarbs = carbs.toFixed(2);
                    }

                    obj.bd = varrr.current_bg;
                    // uniqueNames.push(tryth);
                  }
                }
              })}
              {examprediction.map((varrr) => {
                console.log("examprediction executed");

                let obj = uniqueNames.find((o) => {
                  console.log("insideee");
                  return (
                    o.CURRENT_DATE == new Date(varrr.date).toLocaleDateString()
                  );
                });
                if (obj) console.log(obj.CURRENT_DATE);
                console.log(new Date(varrr.date).toLocaleDateString());

                let acceptedAmount = -1;
                let categoryToCheck = examDic[varrr.date][varrr.time];
                let categoryToCheckForAccepted =
                  "Pre-" + categoryToCheck.toLowerCase();

                if (
                  varrr.status == "Rejected" &&
                  varrr.time != "Time" &&
                  varrr.date in examinsulinDic
                ) {
                  acceptedAmount =
                    examinsulinDic[varrr.date][categoryToCheckForAccepted];
                }

                if (obj == null) {
                  if (categoryToCheckForAccepted == "Pre-breakfast") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin:
                        acceptedAmount == -1
                          ? varrr.amount
                          : varrr.amount +
                            " Rejected " +
                            acceptedAmount +
                            " Accepted ",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );
                    console.log(tryth);

                    uniqueNames.push(tryth);
                  } else if (categoryToCheckForAccepted == "Pre-lunch") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",

                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin:
                        acceptedAmount == -1
                          ? varrr.amount
                          : varrr.amount +
                            " Rejected " +
                            acceptedAmount +
                            " Accepted ",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                    };
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    console.log(tryth);

                    uniqueNames.push(tryth);
                  } else if (categoryToCheckForAccepted == "Pre-dinner") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin:
                        acceptedAmount == -1
                          ? varrr.amount
                          : varrr.amount +
                            " Rejected " +
                            acceptedAmount +
                            " Accepted ",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    console.log(tryth);

                    uniqueNames.push(tryth);
                  } else if (categoryToCheckForAccepted == "Bed-time") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: varrr.amount,
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    console.log(tryth);

                    uniqueNames.push(tryth);
                  }
                  // uniqueNames.push(tryth);
                  // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
                  // Listin.push(varrr.CURRENT_DATE)
                } else {
                  let tryth = obj;
                  // {console.log(obj)}
                  if (categoryToCheckForAccepted == "Pre-lunch") {
                    console.log(tryth);
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    // uniqueNames.pop(tryth);
                    obj.blin =
                      acceptedAmount == -1
                        ? varrr.amount
                        : varrr.amount +
                          " Rejected " +
                          acceptedAmount +
                          " Accepted ";

                    // uniqueNames.push(tryth);
                  } else if (categoryToCheckForAccepted == "Pre-breakfast") {
                    console.log(tryth);
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    // uniqueNames.pop(tryth);
                    obj.Fastingin =
                      acceptedAmount == -1
                        ? varrr.amount
                        : varrr.amount +
                          " Rejected " +
                          acceptedAmount +
                          " Accepted ";

                    // uniqueNames.push(tryth);
                  } else if (categoryToCheckForAccepted == "Pre-dinner") {
                    console.log(tryth);
                    console.log(tryth);
                    console.log(
                      "this is the insuldfdf dfldf dfkd fkdjf predicitton"
                    );

                    // uniqueNames.pop(tryth);
                    obj.bdin =
                      acceptedAmount == -1
                        ? varrr.amount
                        : varrr.amount +
                          " Rejected " +
                          acceptedAmount +
                          " Accepted ";

                    // uniqueNames.push(tryth);
                  } else if (varrr.category == "Bed-time") {
                    // uniqueNames.pop(tryth);
                    obj.adin = varrr.amount;
                    // uniqueNames.push(tryth);
                  }
                }
              })}
              {exambg.map((varrr) => {
                console.log("exambg executed");

                let obj = uniqueNames.find(
                  (o) =>
                    o.CURRENT_DATE == new Date(varrr.date).toLocaleDateString()
                );
                // console.log(obj)

                if (obj == null) {
                  if (varrr.type == "Fasting") {
                    let tryth = {
                      Fasting: varrr.value,
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "2 hrs after breakfast") {
                    let tryth = {
                      Fasting: "--",
                      abf: varrr.value,
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "Before lunch") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: varrr.value,
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "2 hrs after lunch") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: varrr.value,
                      bd: "--",
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "Before dinner") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: varrr.value,
                      ad: "--",
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "2 hrs after dinner") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: varrr.value,
                      threeam: "--",
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  } else if (varrr.type == "3:00 am") {
                    let tryth = {
                      Fasting: "--",
                      abf: "--",
                      bl: "--",
                      al: "--",
                      bd: "--",
                      ad: "--",
                      threeam: varrr.value,
                      CURRENT_DATE: new Date(varrr.date).toLocaleDateString(),
                      CURRENT_TIME: varrr.time,
                      CURRENT_BG: "--",
                      Fastingin: "--",
                      abfin: "--",
                      blin: "--",
                      alin: "--",
                      bdin: "--",
                      adin: "--",
                      threeamin: "--",
                      bcarbs: "--",
                      dcarbs: "--",
                      lcarbs: "--",
                    };

                    uniqueNames.push(tryth);
                  }
                  // uniqueNames.push(tryth);
                  // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
                  // Listin.push(varrr.CURRENT_DATE)
                } else {
                  let tryth = obj;
                  // {console.log(obj)}
                  if (varrr.category == "Pre-lunch") {
                    // uniqueNames.pop(tryth);
                    obj.blin = varrr.amount;
                    // uniqueNames.push(tryth);
                  } else if (varrr.category == "Pre-breakfast") {
                    // uniqueNames.pop(tryth);
                    obj.Fastingin = varrr.amount;
                    // uniqueNames.push(tryth);
                  } else if (varrr.category == "Pre-dinner") {
                    // uniqueNames.pop(tryth);
                    obj.bdin = varrr.amount;
                    // uniqueNames.push(tryth);
                  } else if (varrr.category == "Bed-time") {
                    // uniqueNames.pop(tryth);
                    obj.adin = varrr.amount;
                    // uniqueNames.push(tryth);
                  }
                }
              })}
              {
                // className="basic-details-calendar-div-outer"
                <div>
                  <div className="basic-details-div">
                    <ul
                      style={{
                        listStyleType: "none",
                        margin: "0",
                        width: "100%",
                        height: "100%",
                        padding: "0",
                      }}
                    >
                      <li>
                        <div>
                          <div className="request-card-item-header">
                            <div className="name-email-div">Date</div>
                            <div className="status-div">Description</div>
                            <div className="accept-button-div">Fasting</div>
                            <div className="sex-div">ABF</div>
                            <div className="sex-div">BL</div>
                            <div className="sex-div">AL</div>
                            <div className="sex-div">BD</div>
                            <div className="sex-div">AD</div>
                            <div className="sex-div">3AM</div>
                          </div>
                        </div>
                      </li>
                      {uniqueNames.map((item) => (
                        <>
                          <div
                            className="request-card-item all-scrollbar-style-none"
                            title={`${item.Fasting}`}
                          >
                            {/* Main content */}
                            <div className="name-email-div">
                              {item.CURRENT_DATE}
                            </div>
                            <div className="status-div">BG</div>

                            {/* <div className="name-email-div"> */}
                            <div className="status-div one-line-text2">
                              {item.Fasting}
                            </div>

                            <div className="status-div one-line-text2">
                              {item.abf}
                            </div>
                            <div className="status-div one-line-text2">
                              {item.bl}
                            </div>
                            {/* </div> */}
                            <div className="status-div">
                              <div>{item.al}</div>
                            </div>
                            <div className="status-div">
                              <div>{item.bd}</div>
                            </div>
                            <div className="status-div">
                              <div>{item.ad}</div>
                            </div>

                            {/* </div> */}
                            <div className="status-div">
                              <div>{item.threeam}</div>
                            </div>

                            {/* Overlay with Framer Motion */}
                          </div>
                          <div
                            className="request-card-item all-scrollbar-style-none"
                            title={`${item.Fasting}`}
                          >
                            {/* Main content */}
                            <div className="name-email-div">
                              {item.CURRENT_DATE}
                            </div>
                            <div className="status-div">Insulin</div>

                            {/* <div className="name-email-div"> */}
                            <div className="status-div one-line-text2">
                              {item.Fastingin}
                            </div>

                            <div className="status-div one-line-text2">
                              {item.abfin}
                            </div>
                            <div className="status-div one-line-text2">
                              {item.blin}
                            </div>
                            {/* </div> */}
                            <div className="status-div">
                              <div>{item.alin}</div>
                            </div>
                            <div className="status-div">
                              <div>{item.bdin}</div>
                            </div>
                            <div className="status-div">
                              <div>{item.adin}</div>
                            </div>
                            {/* </div> */}
                            <div className="status-div">
                              <div>{item.threeamin}</div>
                            </div>

                            {/* Overlay with Framer Motion */}
                          </div>
                          <div
                            className="request-card-item all-scrollbar-style-none"
                            title={`${item.Fasting}`}
                          >
                            {/* Main content */}
                            <div className="name-email-div">
                              {item.CURRENT_DATE}
                            </div>
                            <div className="status-div">Carbs</div>

                            {/* <div className="name-email-div"> */}
                            <div className="status-div one-line-text2">
                              {item.bcarbs}
                            </div>

                            <div className="status-div one-line-text2">--</div>
                            <div className="status-div one-line-text2">
                              {item.lcarbs}
                            </div>
                            {/* </div> */}
                            <div className="status-div">
                              <div>--</div>
                            </div>
                            <div className="status-div">
                              <div>{item.dcarbs}</div>
                            </div>
                            <div className="status-div">
                              <div>--</div>
                            </div>

                            {/* </div> */}
                            <div className="status-div">
                              <div>--</div>
                            </div>

                            {/* Overlay with Framer Motion */}
                          </div>
                        </>
                      ))}{" "}
                    </ul>
                  </div>
                </div>

                // HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                // <div className="main all-website-font">
                //   {/* className="MonthrecordTable"  */}
                //   <table id="my-table">
                //     <tr className="table2">
                //       <th>Current Date</th>
                //       <th>Description</th>
                //       <th>Fasting</th>
                //       <th>ABF</th>
                //       <th>BL</th>
                //       <th>AL</th>
                //       <th>BD</th>
                //       <th>AD</th>
                //       <th>3AM</th>
                //     </tr>

                //     {uniqueNames.map((varrr) => (
                //       <>
                //         <tr>
                //           <td>{varrr.CURRENT_DATE}</td>
                //           <td>
                //             <b>BG</b>
                //           </td>
                //           <td>{varrr.Fasting}</td>
                //           <td>{varrr.abf}</td>
                //           <td>{varrr.bl}</td>
                //           <td>{varrr.al}</td>
                //           <td>{varrr.bd}</td>
                //           <td>{varrr.ad}</td>
                //           <td>{varrr.threeam}</td>
                //         </tr>
                //         <tr>
                //           <td>{varrr.CURRENT_DATE}</td>
                //           <td>
                //             <b>Insulin</b>
                //           </td>
                //           <td>{varrr.Fastingin}</td>
                //           <td>{varrr.abfin}</td>
                //           <td>{varrr.blin}</td>
                //           <td>{varrr.alin}</td>
                //           <td>{varrr.bdin}</td>
                //           <td>{varrr.adin}</td>
                //           <td>{varrr.threeamin}</td>
                //         </tr>
                //         <br></br>
                //       </>
                //     ))}
                //   </table>
                // </div>
                // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
              }
            </div>
          </div>
        ) : (
          <Loading />
        )}
        {/* </div> */}
      </div>
    </div>
  );
};
export default MonthRecord;
