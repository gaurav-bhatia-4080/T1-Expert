import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Loading from "./Loading";
import download from "../img/download.png";

var isLogin = false;
var Listid = [];
var Listin = [];
var uniqueNames = [];

export const MonthRecord = (props) => {
  const location = useLocation();
  const { state } = location;

  const [examinsulin, setexaminsulin] = useState([
    {
      AMOUNT: "",
      CATEGORY: "",
      CORRECTION_DOSE: "",
      CURRENT_DATE: "",
      CURRENT_TIME: "",
      DATE: "",
      TIME: "",
      TYPE: "",
    },
  ]);
  const [exambg, setexambg] = useState([
    {
      BLOOD_GLUCOSE_TYPE: "",
      CURRENT_DATE: "",
      CURRENT_TIME: "",
      DATE: "",
      TIME: "",
      VALUE: "",
    },
  ]);
  const exporthere = () => {
    console.log("my table");
    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });
    doc.save("CombinedRecord.pdf");
  };
  const [exam, setexam] = useState([
    {
      CURRENT_BG: "",
      CURRENT_DATE: "",
      CURRENT_TIME: "",
      DATE: "",
      FOOD_CATEGORY: "",
      FOOD_NAME: "",
      QUANTITY: "",
      TIME: "",
    },
  ]);
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

  useEffect(() => {
    // const id = state.insulinProp;
    const x = state.details.email;
    const id = encryptEmailToUrl(x);

    let endpoints = [
      `${process.env.REACT_APP_API_URL}/getPatientPredExtraDetails/${id}`,
      `${process.env.REACT_APP_API_URL}/getPatientBG/${id}`,
      `${process.env.REACT_APP_API_URL}/getPatientInsulin/${id}`,
    ];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
          axios.get(endpoint, { withCredentials: true })
        )
      ).then(([{ data: exam }, { data: exambg }, { data: examinsulin }]) => {
        console.log("these are the record lists");
        console.log(exam);
        console.log(exambg);
        console.log(examinsulin);
        setexam(exam);
        setexambg(exambg);
        setexaminsulin(examinsulin);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="outmost-scrolling">
      <SideNavBar details={state.details} email={state.recordProp} />
      <div className="container-main sidebar-margin">
        <h3 className="all-website-font underline">Formatted Data</h3>
        <h4 className="all-website-font underline">
          Patient Id: {state.details.email}
        </h4>
        <button
          className="all-website-font download-button"
          onClick={exporthere}>
          Download Report
          <img src={download} width={25} height={25} />
        </button>
        {exam != null && exambg != null && examinsulin != null ? (
          <div>
            {exam.map((varrr) => {
              let obj = uniqueNames.find(
                (o) =>
                  o.CURRENT_DATE ===
                    new Date(varrr.date).toLocaleDateString() &&
                  o.CURRENT_TIME === varrr.time
              );
              // console.log(obj)
              if (obj == null) {
                let obj2 = uniqueNames.find(
                  (o) =>
                    o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
                );
                if (obj2 == null) {
                  if (varrr.FOOD_CATEGORY == "Breakfast") {
                    let tryth = {
                      Fasting: varrr.current_bg,
                      abf: "--",
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
                    };
                    uniqueNames.push(tryth);
                  }
                } else {
                  let tryth = obj2;
                  if (varrr.food_category == "Lunch") {
                    tryth.bl = varrr.current_bg;
                    uniqueNames.pop(tryth);
                    uniqueNames.push(tryth);
                  } else if (varrr.FOOD_CATEGORY == "Breakfast") {
                    tryth.Fasting = varrr.current_bg;
                    uniqueNames.pop(tryth);
                    uniqueNames.push(tryth);
                  } else if (varrr.FOOD_CATEGORY == "Dinner") {
                    tryth.bd = varrr.current_bg;
                    uniqueNames.pop(tryth);
                    uniqueNames.push(tryth);
                  }
                }
                // uniqueNames.push(tryth);
                // Listid.push(parseInt(varrr.CURRENT_BG , 10 ) + 1);
                // Listin.push(varrr.CURRENT_DATE)
              }
            })}
            {examinsulin.map((varrr) => {
              let obj = uniqueNames.find(
                (o) =>
                  o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
              );
              // console.log(obj)

              if (obj == null) {
                if (varrr.category == "Pre-breakfast") {
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
                    Fastingin: varrr.amount,
                    abfin: "--",
                    blin: "--",
                    alin: "--",
                    bdin: "--",
                    adin: "--",
                    threeamin: "--",
                  };

                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-lunch") {
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
                    blin: varrr.amount,
                    alin: "--",
                    bdin: "--",
                    adin: "--",
                    threeamin: "--",
                  };

                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-dinner") {
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
                    bdin: varrr.amount,
                    adin: "--",
                    threeamin: "--",
                  };

                  uniqueNames.push(tryth);
                } else if (varrr.category == "Bed-time") {
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
                  tryth.blin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-breakfast") {
                  tryth.Fastingin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-dinner") {
                  tryth.bdin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Bed-time") {
                  tryth.adin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                }
              }
            })}
            {exambg.map((varrr) => {
              let obj = uniqueNames.find(
                (o) =>
                  o.CURRENT_DATE === new Date(varrr.date).toLocaleDateString()
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
                    CURRENT_TIME: new Date(varrr.date).toLocaleDateString(),
                    CURRENT_BG: "--",
                    Fastingin: "--",
                    abfin: "--",
                    blin: "--",
                    alin: "--",
                    bdin: "--",
                    adin: "--",
                    threeamin: "--",
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
                  tryth.blin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-breakfast") {
                  tryth.Fastingin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Pre-dinner") {
                  tryth.bdin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                } else if (varrr.category == "Bed-time") {
                  tryth.adin = varrr.amount;
                  uniqueNames.pop(tryth);
                  uniqueNames.push(tryth);
                }
              }
            })}
            {
              <div className="main all-website-font">
                {/* className="MonthrecordTable"  */}
                <table id="my-table">
                  <tr className="table2">
                    <th>Current Date</th>
                    <th>Description</th>
                    <th>Fasting</th>
                    <th>ABF</th>
                    <th>BL</th>
                    <th>AL</th>
                    <th>BD</th>
                    <th>AD</th>
                    <th>3AM</th>
                  </tr>

                  {uniqueNames.map((varrr) => (
                    <>
                      <tr>
                        <td>{varrr.CURRENT_DATE}</td>
                        <td>
                          <b>BG</b>
                        </td>
                        <td>{varrr.Fasting}</td>
                        <td>{varrr.abf}</td>
                        <td>{varrr.bl}</td>
                        <td>{varrr.al}</td>
                        <td>{varrr.bd}</td>
                        <td>{varrr.ad}</td>
                        <td>{varrr.threeam}</td>
                      </tr>
                      <tr>
                        <td>{varrr.CURRENT_DATE}</td>
                        <td>
                          <b>Insulin</b>
                        </td>
                        <td>{varrr.Fastingin}</td>
                        <td>{varrr.abfin}</td>
                        <td>{varrr.blin}</td>
                        <td>{varrr.alin}</td>
                        <td>{varrr.bdin}</td>
                        <td>{varrr.adin}</td>
                        <td>{varrr.threeamin}</td>
                      </tr>
                      <br></br>
                    </>
                  ))}
                </table>
              </div>
            }
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default MonthRecord;
