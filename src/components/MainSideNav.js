import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  UilStethoscope,
  UilUserCheck,
  UilEnvelopeAdd,
  UilDatabase,
  UilPizzaSlice,
  UilDumbbell,
} from "@iconscout/react-unicons";
import Logout from "./Logout";
import "react-toastify/dist/ReactToastify.css";
import {
  pendingPatientsListLengthSelector,
  pendingFoodListLengthSelector,
  pendingExerciseListLengthSelector,
  selectedOption,
} from "../store/atoms/listsForMain";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/userState";
import t1expertlogo from "../img/t1expertlogowhite.png";
export default function MainSideNav() {
  const pendingPatientsListLength = useRecoilValue(
    pendingPatientsListLengthSelector
  );
  const pendingFoodListLength = useRecoilValue(pendingFoodListLengthSelector);
  const pendingExerciseListLength = useRecoilValue(
    pendingExerciseListLengthSelector
  );
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const getName = () => {
    if (
      user.displayName.substr(0, 4).toLowerCase() != "dr. " &&
      user.displayName.substr(0, 3) != "dr "
    ) {
      return "Dr. " + user.displayName;
    } else if (user.displayName.substr(0, 3).toLowerCase() == "dr ") {
      return "Dr. " + user.displayName.substr(3);
    } else {
      let s =
        user.displayName[0].toUpperCase() +
        user.displayName[1].toLowerCase() +
        user.displayName.substr(2);
      return s;
    }
  };

  const user = useRecoilValue(currentUser);
  
  const [selected, setSelected] = useRecoilState(selectedOption);
  const handleSelect = (option) => {
    setSelected(option);
  };
  const handleHideProfile = () => {
    setShowLogoutOptions(false);
  };

  const handleProfileClick = () => {
    showLogoutOptions
      ? setShowLogoutOptions(false)
      : setShowLogoutOptions(true);
    // setShowLogoutOptions(true);
    // console.log(props.user);
    // setOpen(!open);
  };

  const menuItemStyle = (option) => ({
    fontSize: "17px",
    color: selected === option ? "white" : "lightgray",
    width: "100%",
    height: "80%",
    display: "flex",
    // flexDirection: "row"
    // justifyContent: "space-between;
    alignItems: "center",
    // padding: " 0 10px",
    marginLeft: "0",
    marginRight: "0",
    margin: "0px",
    paddingLeft: "10px",
    boxShadow: selected === option ? "0px 0px 9px #7a3cff" : "",
    borderRadius: "15px",
    backgroundColor: selected === option ? "#7a3cff" : "",
  }); // http://localhost:8080/

  return (
    <nav
      className="nav-menu2 all-scrollbar-style-none"
      initial={{ rotateY: 0 }}
      //   animate={navAnimationControls}
    >
      {/* <div className="t1expert-logo-outer-div">
        <img src={t1expertlogo} width={60} height={60}/>
        <div className="t1-expert-text">T1 Expert</div>
      </div> */}
      <div className="user-name-logout-div-navbar" onClick={handleProfileClick}>
        <div className="user-photo-name">
          <div className="name-user">{getName()}</div>
          {showLogoutOptions ? (
            <FiChevronUp
              size={20}
              color="white"
              style={{ marginLeft: "5px" }}
            />
          ) : (
            <FiChevronDown
              size={20}
              color="white"
              style={{ marginLeft: "5px" }}
            />
          )}
        </div>
        <div className="img-div">
          {/* <AiOutlineUser size={50} color="white" /> */}

          <img
            src={user.photos[0].value.replace("http://", "https://")}
            width={35}
            height={35}
            style={{}}
          />
        </div>
      </div>
      <ul className="nav-menu-items">
        <div>
          <div className="sections-gen-req"> GENERAL</div>
          {(user.email == "samwilson14111@gmail.com" ||
            user.email == "docrajivsingla@gmail.com") && (
            <li className="nav-text">
              <div
                onClick={() => handleSelect("doctor")}
                style={menuItemStyle("doctor")}
              >
                <UilStethoscope
                  size={23}
                  color={selected === "doctor" ? "white" : "lightgrey"}
                />{" "}
                <span>Experts</span>
              </div>
            </li>
          )}
          {(user.email == "samwilson14111@gmail.com" ||
            user.email == "docrajivsingla@gmail.com") && (
            <li className="nav-text">
              <div
                onClick={() => handleSelect("fooddb")}
                style={menuItemStyle("fooddb")}
              >
                <UilDatabase
                  size={23}
                  color={selected === "fooddb" ? "white" : "lightgrey"}
                />{" "}
                <span>Food Database</span>
              </div>
            </li>
          )}
          <li className="nav-text">
            <div
              onClick={() => handleSelect("mypatients")}
              style={menuItemStyle("mypatients")}
            >
              <UilUserCheck
                size={23}
                color={selected === "mypatients" ? "white" : "lightgrey"}
              />{" "}
              <span>My Patients</span>
            </div>
          </li>
        </div>
        <div className="sections-gen-req">REQUESTS</div>

        <li className="nav-text">
          <div
            onClick={() => handleSelect("patients")}
            style={menuItemStyle("patients")}
          >
            {/* UilUserPlus,
  UilEnvelopeAdd,
  UilFileMedicalAlt , */}

            <UilEnvelopeAdd
              size={23}
              color={selected === "patients" ? "white" : "lightgrey"}
            />
            <span className="pending-count-span">
              <span className="pending-count-span-title">New Patients</span>

              <span className="pending-count">
                {pendingPatientsListLength}
                {/* {patientsList != null
                  ? patientsList.length != 0
                    ? patientsList.length
                    : null
                  : null} */}
              </span>
            </span>
          </div>{" "}
        </li>
        <li className="nav-text">
          <div
            onClick={() => handleSelect("exercise")}
            style={menuItemStyle("exercise")}
          >
            <UilDumbbell
              size={23}
              color={selected === "exercise" ? "white" : "lightgrey"}
            />{" "}
            <span className="pending-count-span">
              <span className="pending-count-span-title">Exercise</span>

              <span className="pending-count">
                {pendingExerciseListLength}
                {/* {exerciseList != null
                  ? exerciseList.length != 0
                    ? exerciseList.length
                    : null
                  : null} */}
              </span>
            </span>
          </div>{" "}
        </li>
        <li className="nav-text">
          <div
            onClick={() => handleSelect("food")}
            style={menuItemStyle("food")}
          >
            <UilPizzaSlice
              size={23}
              color={selected === "food" ? "white" : "lightgrey"}
            />{" "}
            <span className="pending-count-span">
              <span className="pending-count-span-title">Food</span>

              <span className="pending-count">
                {pendingFoodListLength}
                {/* {foodList != null
                  ? foodList.length != 0
                    ? foodList.length
                    : null
                  : null} */}
              </span>
            </span>
          </div>{" "}
        </li>
      </ul>
      {showLogoutOptions ? (
        <Logout hideProfile={handleHideProfile} />
      ) : (
        <div></div>
      )}
    </nav>
  );
}
