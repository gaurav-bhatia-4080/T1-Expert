import React from "react";
// import firebase from "../utils/firebase";
import { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import googleOneTap from "google-one-tap";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
// const options={
//   client_id=process.env.CLIENT_ID,
//   auto_select:false,
//   cancel_on_tap_outside:false,
//   context:"signin"
// }
function Landing(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLogin: localStorage.getItem("login"),
  //     name: localStorage.getItem("name"),
  //     photo: localStorage.getItem("photo"),
  //     email: localStorage.getItem("email"),
  //     isAdmin: localStorage.getItem("isAdmin"),
  //   };
  // }
  const navigate = useNavigate();

  async function googleAuth(response) {
    console.log("resonse111223", response);
    // axios.get(`${process.env.REACT_APP_API_URL}/auth/web/google`).then(res=>{
    //   console.log("Login button response recevied");
    //   console.log(res);

    //   if(res.success){
    //     props.setUser(res.user);
    //     navigate("/");
    //   }
    //   else{
    //     console.log("Authentication failed");
    //   }
    // })
    // .catch(e=>{
    //   console.log(e);
    // })
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/web/google`,
      "_self"
    );

    // window.location.href=`${process.env.REACT_APP_API_URL}/auth/web/google/callback`;
    // auth/google/callback
    // const access_token = response.accessToken;
    // const tokenSend = { access_token };
    // .post("http://localhost:8080/expertAuth", tokenSend, {
    //   headers:
    // })

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/expertAuth",
    //   data: { tokenId: response.credential },
    //   headers: {
    //     // Authorization: `Bearer ${user.access_token}`,
    //     Accept: "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.approved == 1) {
    //       navigate('/home');
    //     }
    //     else{
    //       alert("");
    //     }
    //     // setProfile(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }

  const onLogout = () => {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     // Sign-out successful.
    //     localStorage.setItem("login", false);
    //     // window.location.reload(false);
    //     localStorage.removeItem("login");
    //     localStorage.removeItem("name");
    //     localStorage.removeItem("photo");
    //     localStorage.removeItem("email");
    //     localStorage.removeItem("isAdmin");
    //     alert("You have been Logged out");
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
  };
  const check = () => {
    const todoList = [];
    // const todoRef = firebase.database().ref("exercise").child("admin");
    // todoRef.on("value", (snapshot) => {
    //   const todos = snapshot.val();

    //   for (let id in todos) {
    //     todoList.push(todos[id]);
    //   }
    //   console.log(todoList);
    //   var isAdmin1 = false;
    //   for (let id in todoList) {
    //     if (this.state.email == todoList[id]) {
    //       isAdmin1 = true;
    //     }
    //     console.log(this.state.email + " " + todoList[id]);
    //   }
    //   if (!isAdmin1) {
    //     firebase
    //       .auth()
    //       .signOut()
    //       .then(() => {
    //         // Sign-out successful.
    //         localStorage.setItem("login", false);
    //         // window.location.reload(false);
    //         localStorage.removeItem("login");
    //         localStorage.removeItem("name");
    //         localStorage.removeItem("photo");
    //         localStorage.removeItem("email");
    //         localStorage.removeItem("isAdmin");
    //         alert("You have been Logged out");
    //         window.location.reload(false);
    //       })
    //       .catch((error) => {
    //         // An error happened.
    //       });
    //   } else {
    //     localStorage.setItem("isAdmin", true);
    //     console.log(localStorage.getItem("isAdmin") + "chala");
    //   }

    //   // window.location.reload(false);
    // });
  };

  const onSubmit = () => {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     var credential = result.credential;
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     alert("Saved");
    //     window.location.reload(false);
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     console.log(error);
    //     // ...
    //   });
  };

  const componentDidMount = () => {
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log(user.displayName);
    //     // this.setState = {
    //     //       isLogin: true,
    //     //       name: user.displayName,
    //     //       photo: user.photo
    //     // }
    //     localStorage.setItem("login", true);
    //     localStorage.setItem("name", user.displayName);
    //     localStorage.setItem("photo", user.photoURL);
    //     localStorage.setItem("email", user.email);
    //     localStorage.setItem("isAdmin", false);
    //   } else {
    //     console.log("error");
    //   }
    // });
  };

  // render() {
  //   let user = firebase.auth().currentUser;

  return (
    <div className="parent">
      <div className="landing-page"></div>
      <div className="WgciCg LCN0VA"> </div>

      <div className="Q7frNQ">
        <div className="_2pukyg">
          <div className="Ft_8Cg a6f7yQ"></div>
          <div className="IMy50w a6f7yQ">
            <div className="x-large">T1 Expert</div>
          </div>
        </div>
      </div>
      <div className="sign-welcome-container">
        <div className="welcome-text">Welcome to T1 Expert</div>
        <div className="Sign-in-div">
          <h4 className="all-website-arapey-font bold-font">
            Welcome to T1 Expert!
          </h4>

          <div className="google-button-container">
            {/* <GoogleOAuthProvider> 
               <GoogleLogin
              onClick={googleAuth}
              ux_mode="redirect"
              shape="pill"

              theme="filled_blue"
              use_fedcm_for_prompt={false}
              ic
              >

              </GoogleLogin> 
             </GoogleOAuthProvider> */}
            <GoogleButton
              onClick={googleAuth}
              className="google-button"
              type="dark"
              label="Continue with Google"
            ></GoogleButton>
          </div>

          <p className="all-website-arapey-font">
            By continuing, you agree to T1 Expert's <u>Terms of Use.</u>
            <br></br>
            Read our <u>Privacy Policy.</u>
          </p>
          <p className="all-website-arapey-font"></p>
        </div>
      </div>
    </div>
  );
}
{
  /* <GoogleOAuthProvider
              className="button-google"
              clientId="550164351391-fg3sngb21tjll7vm0gsd36vdut270n1r.apps.googleusercontent.com"
            >
              <GoogleLogin
                theme="filled_blue"
                text="continue_with"
                width="100%"
                size="medium"
                onSuccess={googleAuth}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider> */
}

export default Landing;
