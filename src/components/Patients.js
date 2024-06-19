// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import axios from "axios";
import Loading from "./Loading";

var isLogin = false;
var Listid = [];
export const Patients = (props) => {
  // [
  //     {
  //       AGE: "",
  //       NAME: "",
  //       GENDER: "",
  //       MOBILENO: "",
  //     },
  //   ]

  // [
  //     {
  //       id: "",
  //     },
  //   ]
  const encryptEmailToUrl = (email) => {
    // Encode email address to Base64
    const encodedEmail = btoa(email);
    // URL-encode special characters in the encoded email
    const urlEncodedEmail = encodeURIComponent(encodedEmail);
    return urlEncodedEmail;
  };

  const [details, setdetails] = useState([]);
  const [exam, setexam] = useState([]);
  useEffect(() => {
    let endpoints = [
      `${process.env.REACT_APP_API_URL}/getPatients/${encryptEmailToUrl(props.user.emails[0].value)}`,
      `${process.env.REACT_APP_API_URL}/getInsulin`,
    ];

    try {
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint,{withCredentials:true}))).then(
        ([{ data: details }, { data: exam }]) => {
          console.log(details);
          console.log(exam);
          setdetails(details);
          setexam(exam);
        }
      );
    } catch (e) {
      console.log(e);
    }

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/getPatients`)
    //   .then((res) => {
    //     setexam(res.data);
    //     console.log(res.data);
    //     console.log(res.data.length);
    //     console.log(typeof res.data);
    //   });
    //   axios
    //   .get(`${process.env.REACT_APP_API_URL}/getPatients`)
    //   .then((res) => {
    //     setexam(res.data);
    //     console.log(res.data);
    //     console.log(res.data.length);
    //     console.log(typeof res.data);
    //   });

    // const todoRef = firebase.database().ref("insulin");
    // const todoRef2 = firebase.database().ref("login");

    // todoRef.on('value', (snapshot) => {
    //   const todos = snapshot.val();

    //   console.log((todos));
    // });
    // console.log(todoRef);
    // todoRef.on("value", (snapshot) => {
    //   const todos = snapshot.val();
    //   const todoList = [];
    //   for (let id in todos) {
    //     todoList.push({ id });
    //   }
    //   setexam(todoList);
    // });

    // todoRef2.on("value", (snapshot) => {
    //   const todos = snapshot.val();
    //   const todoList = [];
    //   for (let id in todos) {
    //     todoList.push({ id, ...todos[id] });
    //   }
    //   setdetails(todoList);
    // });
  }, []);
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       // User is signed in.
  //       isLogin = true;
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

  const getDetails=(email)=>{
    const ans=details.find(o=>o.email===email);
    return ans;
  }
  // const encryptEmailToUrl = (email) => {
  //   // Encode email address to Base64
  //   const encodedEmail = btoa(email);
  //   // URL-encode special characters in the encoded email
  //   const urlEncodedEmail = encodeURIComponent(encodedEmail);
  //   return urlEncodedEmail;
  // };

  return (
    <div className="outmost-scrolling">    
      <Navbar user={props.user} setUser={props.setUser}></Navbar>
      {details != null ? (
        <div className="App container-main all-website-font monthrecord">
          <h3 className="all-website-font underline">Patients List</h3>
          {/* insulin-list */}
          <div className="main all-website-font">
            {/* {localStorage.getItem("isAdmin") == "true" ? ( */}
            {/* <ol> */}
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Sex</th>
                  <th>Contact</th>
                </tr>
              </thead>

              <tbody>
                {details.map((varr) => (
                  <tr>
                    <td>
                      <NavLink
                        className="buttonuni"
                        to={`/patient-details/${encryptEmailToUrl(varr.email)}`}
                        state={{
                          details: getDetails(varr.email),
                        }}
                      >
                        {" "}
                        {varr.email}
                      </NavLink>
                    </td>
                    <td>{varr.name}</td>
                    <td>{varr.height}</td>
                    <td>{varr.weight}</td>
                    <td>{varr.sex}</td>
                    <td>{varr.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* </ol> */}
            {/* {exam.map((varrr) => <div class="main">
            
                <li> <Link className="buttonuni" to={"/insulin-entries/"+ varrr.id}>{varrr.id}</Link></li>
      
       
       
            </div>)} */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {/* {localStorage.getItem("email")=="jatinbindra171998@gmail.com" ? (<div className="small-text">Fetching</div>):(<div className="small-text">Not Authorised</div>)} */}
      {/* {localStorage.getItem("isAdmin") == "true" ? (
            <div className="small-text">Fetching</div>
          ) : (
            <div className="small-text">Not Authorised</div>
          )} */}
    </div>
  );
};
{
  /* </li> */
}
{
  /* <hr></hr> */
}

{
  /* <li> <Link className="buttonuni" to={"/insulin-entries/"+ varr.id}>Name: {varr.NAME}</Link></li> */
}
// </div>

export default Patients;
