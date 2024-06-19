import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

var isLogin = false;
var Listid = [];
export const PredictionICR = (props) => {
  const encryptEmailToUrl = (email) => {        
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  const [exam, setexam] = useState([
    {
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
    },
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getPredictionTrainedParams/${encryptEmailToUrl(props.user.emails[0].value)}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("this is prediction list");
        console.log(res);
        setexam(res.data);
      });
    // const todoRef = firebase.database().ref('exercise_entry').child('Prediction_values');
    // const todoRef2 = firebase.database().ref('login');

    // todoRef.on('value', (snapshot) => {
    //   const todos = snapshot.val();

    //   console.log((todos));
    // });
    // console.log(todoRef);
    //         todoRef.on('value', (snapshot) => {
    //           const todos = snapshot.val();
    //           const todoList = [];
    //           for (let id in todos) {
    //             todoList.push({id});
    //             Listid.push({id});
    //           }
    // console.log(todoList);
    //           setexam(todoList);
    //         });
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
      <Navbar user={props.user} setUser={props.setUser}></Navbar>
      <div className="App container-main all-website-font monthrecord">
        <h1 className="heading">Patients List</h1>
        <div className="insulin-list">
          {exam != null ? (
            <div>
              <ol>
                {exam.map((varr) => (
                  <div>
                    {/* {console.log(varr)} */}
                    <li>
                      <table>
                        <tr>
                          <th>Email</th>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              className="buttonuni"
                              to={"/prediction/" + varr.email}
                            >
                              {" "}
                              {varr.email}
                            </Link>
                          </td>
                          <div></div>
                        </tr>
                      </table>
                    </li>
                    <hr></hr>

                    {/* <li> <Link className="buttonuni" to={"/insulin-entries/"+ varr.id}>Name: {varr.NAME}</Link></li> */}
                  </div>
                ))}
              </ol>
              {/* {exam.map((varrr) => <div class="main">
            
                <li> <Link className="buttonuni" to={"/insulin-entries/"+ varrr.id}>{varrr.id}</Link></li>
      
       
       
            </div>)} */}
            </div>
          ) : (
            <Loading/>
          )}
          {/* {localStorage.getItem("email")=="jatinbindra171998@gmail.com" ? (<div className="small-text">Fetching</div>):(<div className="small-text">Not Authorised</div>)} */}
        </div>
      </div>
    </div>
  );
};

export default PredictionICR;
