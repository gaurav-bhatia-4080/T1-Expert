// import React, { Fragment, Suspense } from "react";
// import { Link } from "react-router-dom";
// import ExerciseDetails from "./ExerciseDetails";
// import Navbar from "./Navbar";
// import { useState, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { AiOutlineUser } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";
// import { FaEdit } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";
// import { MdSave } from "react-icons/md";
// import { FaSave } from "react-icons/fa";
// import { FiSave, FiCheckCircle } from "react-icons/fi";
// import Logout from "./Logout";
// import ListItem from "./PatientListItem";
// import axios from "axios";
// import { BeatLoader } from "react-spinners";
// import RequestListItemFnE from "./RequestListItemFnE";
// import RequestListItemFood from "./RequestLIstItemFood";
// import RequestListItem from "./RequestListItem";
// import { FaDatabase } from "react-icons/fa";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import {
//   UilUser,
//   UilStethoscope,
//   UilUserCheck,
//   UilUserPlus,
//   UilEnvelopeAdd,
//   UilFileMedicalAlt,
//   UilHistory,
//   UilDatabase,
//   UilUtensils,
//   UilShoppingCart,
//   UilPizzaSlice,
//   UilDumbbell,
// } from "@iconscout/react-unicons";

// import "react-toastify/dist/ReactToastify.css";
import noReq from "../img/no-requests.png";
// import { css } from "glamor";
// import ToggleButton from "react-toggle-button";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// // import "react-pro-sidebar/dist/css/styles.css";
// import { NavLink } from "react-router-dom";
// import { SidebarData } from "./SideBarData";
// // import './Navbar.css';
// import { currentUser } from "../store/atoms/userState";
// import { IconContext } from "react-icons";
// import insulinlog from "../img/insulinlog.png";
// import bglog from "../img/bglog2.png";
// import doctor from "../img/law-enforcement.png";
// import fitness from "../img/fitness.png";
// import food from "../img/food.png";
// import patient from "../img/patient.png";
// import foodlog from "../img/foodlog2.png";
// import file from "../img/file.png";
// import prediction from "../img/prediction4.png";
// import leftChevron from "../img/undo.png";
// import Loading from "./Loading";
// import home from "../img/homexx.png";
// import { FaUserInjured, FaRunning, FaAppleAlt, FaUserMd } from "react-icons/fa";
// // import {
// //   EiPerson, EiHeart, EiPersonDone, EiClock, EiArchive,
// //   EiShoppingCart, EiSend, EiActivity
// // } from 'react-icons/ei';
// import {
//   User,
//   Heart,
//   UserCircle,
//   CheckCircle,
//   Clock,
//   ExclamationCircle,
//   ArchiveBox,
//   ShoppingCart,
//   PaperAirplane,
//   Sun,
// } from "@heroicons/react/24/outline";
// import { Toaster, toast } from "react-hot-toast";
// import {
//   MdPerson,
//   MdLocalHospital,
//   MdPersonOutline,
//   MdCheckCircle,
//   MdRestaurantMenu,
//   MdAccessTime,
//   MdPendingActions,
//   MdStorage,
//   MdMenuBook,
//   MdShoppingCart,
//   MdSend,
//   MdFitnessCenter,
//   MdWbSunny,
// } from "react-icons/md";
// import RequestListItemDoctor from "./RequestListItemDoctor";
// import SideNavBar from "./SideNavBar";
// import SideNavBarMain from "./SideNavBarMain";
// import DoubleLoader from "./DoubleLoader";
// import FoodDBListItem from "./FoodDBListItem";
// import MainSideNav from "./MainSideNav";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { mypatients, pendingPatients, selectedOption } from "../store/atoms/listsForMain";
// import MainSideNavSkeleton from "./MainSideNavSkeleton";
// import MainExperts from "./MainExperts";
// import MainFoodDB from "./MainFoodDB";
// import MainPendingExercise from "./MainPendingExercise";
// import MainPendingFood from "./MainPendingFood";
// import MainPendingPatients from "./MainPendingPatients";

// export default function MainMyPatients() {
//   const [details, setdetails]=useRecoilState(mypatients);
//   const navAnimationControls = useAnimation();
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <div className="pending-patients-requests-outer">
//       <div className="pending-requests-title">
//         <h3 className="diff-requests-title">My Patients</h3>
//       </div>
//       <div className="div-req">
//         {details == null ? (
//           <DoubleLoader />
//         ) : (
//           <div className="pending-patients-requests-list">
//             <ul
//               style={{
//                 listStyleType: "none",
//                 margin: "0",
//                 padding: "0",
//               }}
//             >
//               <li>
//                 <div>
//                   <div className="request-card-item-header">
//                     <div className="name-email-div">Patient Name</div>
//                     <div className="height-div">Height</div>
//                     <div className="weight-div">Weight</div>
//                     <div className="sex-div">Sex</div>
//                     <div className="contact-div">Contact</div>
//                   </div>
//                 </div>
//               </li>
//               {details.map((item, index) => {
//                 return (
//                   <ListItem
//                     key={index}
//                     item={item}
//                     details={details}
//                     index={index}
//                     navAnimationControls={navAnimationControls}
//                     hoveredIndex={hoveredIndex} // Pass down the hovered index
//                     setHoveredIndex={setHoveredIndex} // Pass down the setter to track hover
//                   />
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useAnimation } from "framer-motion";
import ListItem from "./PatientListItem";
import DoubleLoader from "./DoubleLoader";
import { mypatients } from "../store/atoms/listsForMain";
import { FixedSizeList as List } from "react-window";

export default function MainMyPatients() {
  const [details, setdetails] = useRecoilState(mypatients);
  const navAnimationControls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const parentRef = useRef(null);
  const [lh, setlh] = useState(0);

  // Dynamically calculate the height of the parent div
  useEffect(() => {
    if (parentRef.current) {
      // Set the height of the list to be the height of the parent div
      setlh(parentRef.current.clientHeight);
    }
  }, []);

  // Define the height for each row (adjust based on your design)
  const rowHeight = 55;

  // Filter the patient list based on the search query
  const filteredList = details
    ? details.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Row renderer for FixedSizeList
  const Row = ({ index, style }) => {
    const item = filteredList[index];
    return (
      <li style={style}>
        <ListItem
          key={index}
          item={item}
          details={details}
          index={index}
          navAnimationControls={navAnimationControls}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      </li>
    );
  };

  return (
    <div className="pending-patients-requests-outer">
      <div
        className="pending-requests-title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3 className="diff-requests-title">My Patients</h3>
        <div className="w-1/2">
          <div className="relative rounded-full w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-10 h-10 text-gray-500 dark:text-gray-400 mr-4 p-1" // Adjust margin-right for spacing
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Patients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="default-search"
              className="block w-full p-4 pl-14 text-2xl text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid lightgrey", // Light grey border
            borderRadius: "9999px", // Fully rounded corners
            padding: "5px",
            marginRight: "10px",
            backgroundColor: "#fff", // Optional: White background
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              height: "20px",
              width: "20px",
              color: "grey",
              marginLeft: "5px",
              flexShrink: 0, // Prevent shrinking
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            placeholder="Search Patients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginLeft: "10px",
              verticalAlign: "center",
              padding: "5px",
              fontSize: "16px",
              width: "200px",
              border: "none", // Remove default border
              outline: "none", // Remove focus outline
            }}
          />
        </div> */}

        {/* <input
          type="text"
          placeholder="Search Patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "5px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        /> */}
      </div>
      <div className="div-req all-scrollbar-style-none">
        {details == null ? (
          <DoubleLoader />
        ) : filteredList.length === 0 ? (
          <div className="all-website-font no-req">
            <img src={noReq} width={300} height={300} />
          </div>
        ) : (
          <div
            className="pending-patients-requests-list all-scrollbar-style-none"
            ref={parentRef}
          >
            <ul
              style={{
                listStyleType: "none",
                margin: "0",
                padding: "0",
              }}
            >
              <li>
                <div>
                  <div className="request-card-item-header">
                    <div className="name-email-div">Patient Name</div>
                    <div className="height-div">Height</div>
                    <div className="weight-div">Weight</div>
                    <div className="sex-div">Sex</div>
                    <div className="contact-div">Contact</div>
                  </div>
                </div>
              </li>
              {/* Using react-window's FixedSizeList */}
              <List
                className="all-scrollbar-style"
                height={lh} // Total height of the list container
                itemCount={filteredList.length}
                itemSize={rowHeight} // Height of each row
                width={"100%"} // Width of the list container
              >
                {Row}
              </List>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
