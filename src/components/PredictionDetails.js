import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import save from "../img/tick.png";
import edit from "../img/edit.png";
import Button from "react-bootstrap/Button";
import download from "../img/download.png";
toast.configure();

var isLogin = false;
var Listid = [];

export const PredictionDetails = (props) => {
  const location = useLocation();
  const { state } = location;
  const [showLoading, setShowLoading] = useState(false);

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

  const [avgBreakfast, setAvgBreakfast] = useState(exam.average_breakfast);
  const [avgLunch, setAvgLunch] = useState(exam.average_lunch);
  const [avgSnack, setAvgSnack] = useState(exam.average_snack);
  const [avgDinner, setAvgDinner] = useState(exam.average_dinner);
  const [bicr, setBicr] = useState(exam.breakfast_icr);
  const [bisf, setBisf] = useState(exam.breakfast_isf);
  const [licr, setLicr] = useState(exam.lunch_icr);
  const [lisf, setLisf] = useState(exam.lunch_isf);
  const [sicr, setSicr] = useState(exam.snack_icr);
  const [sisf, setSisf] = useState(exam.snack_isf);
  const [dicr, setDicr] = useState(exam.dinner_icr);
  const [disf, setDisf] = useState(exam.dinner_isf);
  const [icr, setIcr] = useState(exam.icr);
  const [isf, setIsf] = useState(exam.isf);
  const [divisionBy, setDivisionBy] = useState(exam.division_by);
  const [insulinDose, setInsulinDose] = useState(exam.insulin_dose);

  const [editable, setEditable] = useState(false);
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  const handleEdit = () => {
    if (editable) {
      setShowLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/updatePredictionValues`, {
          email: state.details.email,
          breakfast_icr: bicr,
          breakfast_isf: bisf,
          lunch_icr: licr,
          lunch_isf: lisf,
          snack_icr: sicr,
          snack_isf: sisf,
          dinner_icr: dicr,
          dinner_isf: disf,
          icr: icr,
          isf: isf,
          average_breakfast: avgBreakfast,
          average_lunch: avgLunch,
          average_snack: avgSnack,
          average_dinner: avgSnack,
          insulin_dose: insulinDose,
          division_by: divisionBy,
        })
        .then((response) => {
          if (response.data.code == 1) {
            setShowLoading(false);
            setEditable(false);
            toast.success("Values updated successfully!");
          } else {
            setShowLoading(false);
            setEditable(false);
            toast.error("Some error occured! Try again!");
          }
        })
        .catch((e) => {
          setShowLoading(false);
          setEditable(false);

          console.log(e);
        });
    } else {
      setEditable(true);
    }
  };

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
        setAvgBreakfast(res.data.average_breakfast);
        setAvgLunch(res.data.average_lunch);
        setAvgSnack(res.data.average_snack);
        setAvgDinner(res.data.average_dinner);
        setBicr(res.data.breakfast_icr);
        setBisf(res.data.breakfast_isf);
        setLicr(res.data.lunch_icr);
        setLisf(res.data.lunch_isf);
        setSicr(res.data.snack_icr);
        setSisf(res.data.snack_isf);
        setDicr(res.data.dinner_icr);
        setDisf(res.data.dinner_isf);
        setIcr(res.data.icr);
        setIsf(res.data.isf);
        setDivisionBy(res.data.division_by);
        setInsulinDose(res.data.insulin_dose);
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
    <div className="outmost">
      <span className="sidebar-span2">
        <SideNavBar details={state.details} email={state.predProp} />
        <div className="container-main flex-box-div">
          <div className="pending-patients-requests-outer">
            <div className="pending-requests-title">
              <div className="title-edit">
                <h3 className="diff-requests-title underline2">Prediction</h3>
                {editable ? (
                  <button className="save-button" onClick={handleEdit}>
                    Save
                    <img src={save} width={20} height={20} />
                  </button>
                ) : (
                  <img
                    className="edit-save"
                    onClick={handleEdit}
                    src={editable ? save : edit}
                    width={25}
                    height={25}
                  />
                )}
              </div>

              <h4 className="diff-requests-title underline2">
                Patient Id : {state.details.email}
              </h4>
            </div>

            {/* <h1 className="heading">Insulin Entries</h1>
          <h1 className="heading">Patient: {props.match.params.id}</h1> */}

            {exam != null ? (
              <div className="div-req">
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

                  <div className="pending-patients-requests-list2">
                    <table>
                      <tr className="no-highlight">
                        <th>
                          Average Breakfast
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={avgBreakfast}
                            className="input-style"
                            onChange={(e) => {
                              setAvgBreakfast(e.target.value);
                            }}
                            disabled={!editable}
                          />
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Average Dinner
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={avgDinner}
                            className="input-style"
                            onChange={(e) => {
                              setAvgDinner(e.target.value);
                            }}
                            disabled={!editable}
                          />
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Average Lunch
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={avgLunch}
                            className="input-style"
                            onChange={(e) => {
                              setAvgLunch(e.target.value);
                            }}
                            disabled={!editable}
                          />
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Average Snack
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={avgSnack}
                            className="input-style"
                            onChange={(e) => {
                              setAvgSnack(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Breakfast ICR
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={bicr}
                            className="input-style"
                            onChange={(e) => {
                              setBicr(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Breakfast ISF
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={bisf}
                            className="input-style"
                            onChange={(e) => {
                              setBisf(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Lunch ICR
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={licr}
                            className="input-style"
                            onChange={(e) => {
                              setLicr(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Lunch ISF
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={lisf}
                            className="input-style"
                            onChange={(e) => {
                              setLisf(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Snack ICR
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={sicr}
                            className="input-style"
                            onChange={(e) => {
                              setSicr(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Snack ISF
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={sisf}
                            className="input-style"
                            onChange={(e) => {
                              setSisf(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>

                      <tr className="no-highlight">
                        <th>
                          Dinner ICR
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={dicr}
                            className="input-style"
                            onChange={(e) => {
                              setDicr(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Dinner ISF
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={disf}
                            className="input-style"
                            onChange={(e) => {
                              setDisf(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Division by
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={divisionBy}
                            className="input-style"
                            onChange={(e) => {
                              setDivisionBy(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          ICR
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={icr}
                            className="input-style"
                            onChange={(e) => {
                              setIcr(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          Insulin Dose
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={insulinDose}
                            className="input-style"
                            onChange={(e) => {
                              setInsulinDose(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
                        <th>
                          ISF
                          {/* <hr></hr> */}
                        </th>
                        <th>
                          <input
                            type="number"
                            value={isf}
                            className="input-style"
                            onChange={(e) => {
                              setIsf(e.target.value);
                            }}
                            disabled={!editable}
                          />
                          {/* <hr></hr> */}
                        </th>
                      </tr>
                      <tr className="no-highlight">
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
      </span>

      {showLoading && <Loading />}
    </div>
  );
};

export default PredictionDetails;
