// import React, { Fragment, Suspense } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import noReq from "../img/no-requests.png";
// import RequestListItemDoctor from "./RequestListItemDoctor";
// import DoubleLoader from "./DoubleLoader";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { getdoctors, pendingPatients, selectedOption } from "../store/atoms/listsForMain";
// export default function MainExperts() {
//   const [doctorList, setDoctorList] = useRecoilState(getdoctors);

//   return (
//     <div className="pending-patients-requests-outer">
//       <div className="pending-requests-title">
//         <h3 className="diff-requests-title">All Experts</h3>
//       </div>
//       <div className="div-req">
//         {doctorList == null ? (
//           <DoubleLoader />
//         ) : doctorList.length == 0 ? (
//           <div className="all-website-font">
//             <img src={noReq} width={35} height={35} />
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
//                     <div className="name-email-div">User Name (T1 Expert)</div>
//                     <div className="access-type-div">Account Type</div>
//                     <div className="allow-button-div">Web App Access</div>
//                   </div>
//                 </div>
//               </li>
//               {doctorList.map((doctor) => {
//                 return (
//                   <li>
//                     <RequestListItemDoctor
//                       list={doctorList}
//                       doctor={doctor}
//                       setList={setDoctorList}
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

import React, { useState, useRef, useEffect, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import noReq from "../img/no-requests.png";
import RequestListItemDoctor from "./RequestListItemDoctor";
import DoubleLoader from "./DoubleLoader";
import { useRecoilState } from "recoil";
import { getdoctors } from "../store/atoms/listsForMain";
import { FixedSizeList as List } from "react-window";
import axios from "axios";


export default function MainExperts() {
  const [doctorList, setDoctorList] = useRecoilState(getdoctors);
  const [searchQuery, setSearchQuery] = useState("");

  // Define the height for each row (adjust based on your design)
  const rowHeight = 55;
  // async function getDoctors(){
  //   try {
  //     // API request to get pending patients
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/getDoctors`,
  //       { withCredentials: true }
  //     );
  //     setDoctorList(response.data);
  //     console.log(response.data);
  //     // return response.data;
  //   } catch (error) {
  //     console.error("Error fetching the details...", error);
  //     throw error; // Handle API errors gracefully
  //   }
  // }
  // useEffect(()=>{
  //   getDoctors();
  //   if (parentRef.current) {
  //     // Set the height of the list to be the height of the parent div
  //     setListHeight(parentRef.current.clientHeight);
  //   }
  // },[]);

  // Filter the list based on search query

  const filteredList = doctorList
    ? doctorList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const parentRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  // Dynamically calculate the height of the parent div
  useEffect(() => {
    if (parentRef.current) {
      // Set the height of the list to be the height of the parent div
      setListHeight(parentRef.current.clientHeight);
    }
  }, []);

  // This is a wrapper to render each item in the list.
  const Row = ({ index, style }) => {
    const doctor = filteredList[index];
    return (
      <li style={style}>
        <RequestListItemDoctor
          list={doctorList}
          doctor={doctor}
          setList={setDoctorList}
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
        <h3 className="diff-requests-title">All Experts</h3>

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
              placeholder="Search Experts"
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
            justifyContent: "center",
            border: "1px solid lightgrey", // Light grey border
            borderRadius: "15px", // Fully rounded corners
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
            placeholder="Search Experts"
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
          placeholder="Search Experts..."
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
        {doctorList == null ? (
          <DoubleLoader />
        ) : filteredList.length === 0 ? (
          <div className="all-website-font">
            <img src={noReq} width={35} height={35} />
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
                    <div className="name-email-div">User Name (T1 Expert)</div>
                    <div className="access-type-div">Account Type</div>
                    <div className="allow-button-div">Web App Access</div>
                  </div>
                </div>
              </li>
              {/* Using react-window's FixedSizeList */}
              <List
                className="all-scrollbar-style"
                height={listHeight} // Total height of the list container
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
