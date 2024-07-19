import React, { Component } from "react";
import { useState, useEffect } from "react";
import cross from "../img/crossbutton.png";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

toast.configure();

const NewDoctorOnboardingForm = (props) => {
  const getName = () => {
    if (
      props.user.displayName.substr(0, 4).toLowerCase() != "dr. " &&
      props.user.displayName.substr(0, 3) != "dr "
    ) {
      return "Dr. " + props.user.displayName;
    } else if (props.user.displayName.substr(0, 3).toLowerCase() == "dr ") {
      return "Dr. " + props.user.displayName.substr(3);
    } else {
      let s =
        props.user.displayName[0].toUpperCase() +
        props.user.displayName[1].toLowerCase() +
        props.user.displayName.substr(2);
      return s;
    }
  };

  const [email, setEmail] = useState(props.user.email);
  const [name, setName] = useState(getName());
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [reg, setReg] = useState("");
  const [degree, setDegree] = useState("");
  const [b, setB] = useState(null);
  const [date, setDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const placeholderText = "Date of birth";

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!date) {
      setIsFocused(false);
    }
  };

  const [showLoading, setShowLoading] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDobChange = (e) => {
    setDob(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleRegChange = (e) => {
    setReg(e.target.value);
  };
  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const handleBChange = (e) => {
    setB(e.target.value);
  };

  const handleSubmit = () => {
    // You can perform any necessary actions with the input data here
    if (
      address.trim() == "" ||
      dob.trim() == "" ||
      reg.trim() == "" ||
      phone.trim() == "" ||
      degree.trim() == ""
    ) {
      toast.error("Enter all the details");
      return;
    }
    // console.log(`Name: ${name}, Email: ${b}`);
    // props.onClose();
    // props.startLoading();

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/web/details`, {
        email: email,
        name: name,
        address: address,
        dob: Date.parse(dob),
        phone: phone,
        reg: reg,
        degree: degree,
      })
      .then((response) => {
        console.log("create account called");
        if (response.data.code == 1) {
          console.log("create account called2222");

          console.log("TTEERERE" + props.id);
          setTimeout(() => {
            setShowLoading(false);
            window.open(
              `${process.env.REACT_APP_API_URL}/auth/web/logout`,
              "_self"
            );
          }, 3000);
          setShowLoading(true);
          toast.success("Account created successfully!");
          toast.success("Now you can sign in.");

          // axios
          //   .delete(
          //     `${process.env.REACT_APP_API_URL}/deleteExerciseRequest/${props.id}`,
          //     {
          //       exercise_name: props.id,
          //     }
          //   )
          //   .then((response) => {
          //     if (response.data.code == 1) {
          //       let newList = [...props.list];
          //       let index = newList.findIndex(
          //         (i) => i.exercise_name === props.id
          //       );

          //       newList.splice(index, 1);
          //       props.setList(newList);
          //       toast.success("Successfully added!");
          //       props.stopLoading();
          //     } else {
          //       toast.error(
          //         "Exercise added! Delete it from the list using cross button."
          //       );
          //       props.stopLoading();
          //     }
          //   });
        } else {
          toast.error("Error occurred!");
          props.stopLoading();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="create-account-outmost">
      <div className="create-account-image">
        {/* <div className=""></div>
        <div className="WgciCg LCN0VA2"> </div>

        <div className="Q7frNQ">
          <div className="_2pukyg">
            <div className="Ft_8Cg a6f7yQ"></div>
            <div className="IMy50w a6f7yQ"></div>
          </div>
        </div> */}
      </div>
      {/* <div className="create-account-image">
      </div> */}
      <div className={`outmost-padding ${"light-theme"}`}>
        <div className="dialog-content all-website-font">
          {/* <label className="all-website-font"> */}
          {/* <span className="entries">Exercise name</span> */}
          <div className="div-title">
            <div className="title-motto2">
              <div>
                <p
                  style={{
                    display: "inline",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  T1 Expert
                </p>
              </div>
            </div>
          </div>
          {/* <div className="title-motto2">
            <div>
              <p
                style={{
                  display: "inline",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                T1 Expert
              </p>
            </div>
          </div> */}
          {/* <div className="img-div-create pointer-class">
            <img src={`${props.user.photos[0].value}`} width={40} height={40} />
          </div> */}
          <h2 style={{ textDecoration: "underline" }}>Create your Account</h2>
          <input
            name="name"
            required
            placeholder="Email"
            className="input-style2"
            type="text"
            contentEditable={false}
            value={`${props.user.email}`}
            onChange={handleEmailChange}
          />
          {/* </label> */}
          {/* <label className="all-website-font"> */}
          {/* <span className="entries">MET Level</span> */}
          <input
            name="b"
            required
            type="text"
            placeholder="Name"
            className="input-style2"
            value={`${getName()}`}
            contentEditable={false}
            onChange={handleNameChange}
          />
          {/* </label> */}
          <input
            name="name"
            required
            placeholder="Clinic Address"
            className="input-style"
            type="text"
            onChange={handleAddressChange}
          />
          <input
            type={isFocused ? "date" : "text"}
            value={dob}
            required
            onChange={handleDobChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-style"
            placeholder={!isFocused ? placeholderText : ""}
            style={{ color: date ? "black" : "grey" }}
          />{" "}
          <input
            name="name"
            type="text"
            required
            placeholder="Phone number"
            className="input-style"
            onChange={handlePhoneChange}
          />
          <input
            name="name"
            required
            placeholder="Medical Registration Number"
            type="text"
            className="input-style"
            onChange={handleRegChange}
          />
          <input
            name="name"
            required
            type="text"
            placeholder="Degree"
            className="input-style"
            onChange={handleDegreeChange}
          />
          <p className="all-website-arapey-font">
            By continuing, you agree to T1 Expert's{" "}
            <u className="blue-color">Terms of Use.</u>
            <br></br>
            Read our <u className="blue-color">Privacy Policy.</u>
          </p>
          <button
            className="submit-button all-website-font input-style"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>

      {showLoading && <Loading />}
    </div>
  );
};

export default NewDoctorOnboardingForm;
