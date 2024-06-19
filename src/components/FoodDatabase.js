// import firebase from '../utils/firebase';
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Loading from "./Loading";

var isLogin = false;
export const FoodDatabase = (props) => {
  const [exam, setexam] = useState(null);
  // {
  //   Carbs: "",
  //   Calories: "",
  //   Fat: "",
  //   Protein: "",
  //   Serving_Size: "",
  // },
  // ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getFoodDatabase`, {
        withCredentials: true,
      })
      .then((res) => {
        setexam(res.data);
        // console.log(res.data);
        // console.log(res.data.length);
        // console.log(typeof res.data);
      });
    // const todoRef = firebase.database().ref('food_entry').child('food_db');

    // // todoRef.on('value', (snapshot) => {
    // //   const todos = snapshot.val();

    // //   console.log((todos));
    // // });
    // // console.log(todoRef);
    // todoRef.on('value', (snapshot) => {
    //   const todos = snapshot.val();
    //   const todoList = [];
    //   for (let id in todos) {
    //     todoList.push({ id, ...todos[id] });
    //   }
    // });
  }, []);
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       isLogin=true;
  //       console.log(localStorage.getItem('isAdmin'));

  //     } else {
  //       // No user is signed in.
  //     }
  //   });

  return (
    <div className="outmost-scrolling">
      <Navbar user={props.user} setUser={props.setUser}></Navbar>

      {exam != null ? (
        <div>
          <div className="App container-main monthrecord">
            <h3 className="all-website-font underline">Food database</h3>

            <div class="main all-website-font">
              <table>
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Carbs</th>
                    <th>Calories</th>
                    <th>Fat</th>
                    <th>Protein</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.map((varrr) => (
                    <tr>
                      {console.log("XXXW", varrr)}

                      <td>{varrr.name}</td>
                      <td>{varrr.carbs}</td>
                      <td>{varrr.calories}</td>
                      <td>{varrr.fat}</td>
                      <td>{varrr.protein}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {/* {localStorage.getItem("isAdmin") == "true" ? (
          <div className="small-text">Fetching</div>
        ) : (
          <div className="small-text">Not Authorised</div>
        )} */}
    </div>
    // </div>
  );
};

export default FoodDatabase;
