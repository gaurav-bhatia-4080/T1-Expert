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
// import { pendingPatients, selectedOption } from "../store/atoms/listsForMain";
// import MainSideNavSkeleton from "./MainSideNavSkeleton";
// import MainExperts from "./MainExperts";
// import MainFoodDB from "./MainFoodDB";
// import MainMyPatients from "./MainMyPatients";
// import MainPendingExercise from "./MainPendingExercise";
// import MainPendingFood from "./MainPendingFood";
// export default function MainPendingPatients() {
//   const [patientsList, setPatientsList] = useRecoilState(pendingPatients);

//   return (
//     <div className="pending-patients-requests-outer">
//       <div className="pending-requests-title">
//         <h3 className="diff-requests-title">New Patients</h3>
//       </div>
//       <div className="div-req">
//         {patientsList == null ? (
//           <DoubleLoader />
//         ) : patientsList.length == 0 ? (
//           <div className="all-website-font no-req">
//             <img src={noReq} width={300} height={300} />
//           </div>
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
//                     <div className="name-email-div">User Name (T1 Life)</div>
//                     <div className="status-div">Status</div>
//                     <div className="accept-button-div">Accept</div>
//                     <div className="reject-button-div">Reject</div>
//                   </div>
//                 </div>
//               </li>

//               {patientsList.map((patient) => {
//                 return (
//                   <li>
//                     <RequestListItem
//                       list={patientsList}
//                       patient={patient}
//                       setList={setPatientsList}
//                     />
//                   </li>
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
import DoubleLoader from "./DoubleLoader";
import RequestListItem from "./RequestListItem";
import { pendingPatients } from "../store/atoms/listsForMain";
import { FixedSizeList as List } from "react-window"; // Import FixedSizeList

export default function MainPendingPatients() {
  const [patientsList, setPatientsList] = useRecoilState(pendingPatients);

  // Define the height for each row (adjust based on your design)
  const rowHeight = 55;


  // Ref for the parent container to get its height
  const parentRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  // Dynamically calculate the height of the parent div
  useEffect(() => {
    if (parentRef.current) {
      // Set the height of the list to be the height of the parent div
      setListHeight(parentRef.current.clientHeight);
    }
  }, []);

  // Row renderer for FixedSizeList
  const Row = ({ index, style }) => {
    const patient = patientsList[index];
    return (
      <li style={style}>
        <RequestListItem
          list={patientsList}
          patient={patient}
          setList={setPatientsList}
        />
      </li>
    );
  };

  return (
    <div className="pending-patients-requests-outer" >
      <div className="pending-requests-title">
        <h3 className="diff-requests-title">New Patients</h3>
      </div>

      <div className="div-req all-scrollbar-style-none">
        {patientsList == null ? (
          <DoubleLoader />
        ) : patientsList.length === 0 ? (
          <div className="all-website-font no-req">
            <img src={noReq} width={300} height={300} />
          </div>
        ) : (
          <div className="pending-patients-requests-list all-scrollbar-style-none" ref={parentRef}>
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
                    <div className="name-email-div">User Name (T1 Life)</div>
                    <div className="status-div">Status</div>
                    <div className="accept-button-div">Accept</div>
                    <div className="reject-button-div">Reject</div>
                  </div>
                </div>
              </li>

              {/* Using react-window's FixedSizeList */}
              {listHeight > 0 && (
                <List
                  className="all-scrollbar-style"
                  height={listHeight} // Set height dynamically based on parent
                  itemCount={patientsList.length}
                  itemSize={rowHeight} // Height of each row
                  width={"100%"} // Width of the list container
                >
                  {Row}
                </List>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}