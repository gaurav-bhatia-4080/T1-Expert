import React, { useRef, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import DoubleLoader from "./DoubleLoader";
import FoodDBListItem from "./FoodDBListItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { FixedSizeList as List } from "react-window";
import { getfooddb } from "../store/atoms/listsForMain";

export default function MainFoodDB() {
  // const [exam,setExam]=useState(null);
  const exam = useRecoilValue(getfooddb);
  const headerRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredExam, setFilteredExam] = useState(exam); // State for filtered items

  // Function to calculate dynamic height for the list
  const calculateListHeight = () => {
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
    const availableHeight = window.innerHeight - headerHeight; // Available height in pixels
    setListHeight(availableHeight);
  };
  const parentRef = useRef(null);
  const [lh, setlh] = useState(0);

  // Dynamically calculate the height of the parent div
  useEffect(() => {
    if (parentRef.current) {
      // Set the height of the list to be the height of the parent div
      setlh(parentRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    // Initial height calculation
    calculateListHeight();

    // Recalculate height on window resize
    window.addEventListener("resize", calculateListHeight);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", calculateListHeight);
  }, []);

  // Filter food items based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredExam(exam);
    } else {
      const filtered = exam.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExam(filtered);
    }
  }, [searchTerm, exam]);

  const Row = ({ index, style }) => (
    <div style={style}>
      <FoodDBListItem item={filteredExam[index]} index={index} details={exam} />
    </div>
  );

  return (
    <div className="pending-patients-requests-outer">
      <div
        className="pending-requests-title"
        ref={headerRef}
        style={{ width: "100%" }}
      >
        <h3 className="diff-requests-title">
          Food Database
          {/* Search bar added here */}
        </h3>

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
            placeholder="Search food database"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            placeholder="Search Food Database"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          placeholder="Search Food Database"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          style={{
            marginLeft: "10px",
            padding: "5px",
            fontSize: "14px",
            width: "200px",
          }}
        /> */}
      </div>

      <div className="div-req all-scrollbar-style-none">
        {exam == null ? (
          <DoubleLoader />
        ) : (
          <div
            className="pending-patients-requests-list all-scrollbar-style-none"
            ref={parentRef}
          >
            <div>
              <div className="request-card-item-header">
                <div className="food-name">
                  Food Name
                  <div>(Serving Size)</div>
                </div>
                <div className="carbs-qty">Carbs</div>
                <div className="calories-qty">Calories</div>
                <div className="fat-qty">Fat</div>
                <div className="protein-qty">Protein</div>
                <div className="save-button-fooddb">Edit</div>
              </div>
            </div>

            <List
              className="all-scrollbar-style"
              height={lh} // Height of the window
              itemCount={filteredExam.length} // Number of rows to render
              itemSize={60} // Size of each item
              style={{ listStyleType: "none" }}
              width={"100%"} // Full width
            >
              {Row}
            </List>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useRef, useState, useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import DoubleLoader from "./DoubleLoader";
// import FoodDBListItem from "./FoodDBListItem";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { FixedSizeList as List } from "react-window";
// import { getfooddb } from "../store/atoms/listsForMain";

// export default function MainFoodDB() {
//   const exam = useRecoilValue(getfooddb);
//   const headerRef = useRef(null);
//   const [listHeight, setListHeight] = useState(0);
//   // Function to calculate dynamic height for the list
//   const calculateListHeight = () => {
//     const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
//     const availableHeight = window.innerHeight - headerHeight; // Available height in pixels
//     setListHeight(availableHeight);
//   };

//   useEffect(() => {
//     // Initial height calculation
//     calculateListHeight();

//     // Recalculate height on window resize
//     window.addEventListener("resize", calculateListHeight);

//     // Cleanup listener on unmount
//     return () => window.removeEventListener("resize", calculateListHeight);
//   }, []);
//   const Row = ({ index, style }) => (
//     <div style={style}>
//       <FoodDBListItem item={exam[index]} index={index} details={exam} />
//     </div>
//   );
//   // This is the row renderer function for each item in the list
//   // const Row = ({ index, style }) => (
//   //   <div style={style}>
//   //     {exam[index].name}
//   //     {/* <FoodDBListItem item={exam[index]} index={index} details={exam} /> */}
//   //   </div>
//   // );

//   return (
//     <div className="pending-patients-requests-outer">
//       <div
//         className="pending-requests-title"
//         ref={headerRef}
//         style={{ width: "100%" }}
//       >
//         <h3
//           className="diff-requests-title"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           Food Database
//         </h3>
//       </div>
//       <div className="div-req">
//         {exam == null ? (
//           <DoubleLoader />
//         ) : (
//           <div className="pending-patients-requests-list">
//             <div>
//               <div className="request-card-item-header">
//                 <div className="food-name">
//                   Food Name
//                   <div>(Serving Size)</div>
//                 </div>
//                 <div className="carbs-qty">Carbs</div>{" "}
//                 <div className="calories-qty">Calories</div>
//                 <div className="fat-qty">Fat</div>
//                 <div className="protein-qty">Protein</div>
//                 <div className="save-button-fooddb">Edit</div>
//               </div>
//             </div>

//             <List
//               height={listHeight} // Height of the window
//               itemCount={exam.length} // Number of rows to render
//               itemSize={80}
//               style={{ listStyleType: "none" }} // Hi
//               width={"100%"} // Width of the window
//             >
//               {Row}
//             </List>
//             {/* <List
//               height={600} // Visible height of the list
//               itemCount={exam.length} // Number of total items
//               itemSize={50} // Height of each row (item)
//               width={"100%"} // Full width of the container
//             >
//               {Row} {/* The Row renderer */}
//             {/* </List>  */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { Fragment, Suspense } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import DoubleLoader from "./DoubleLoader";
// import FoodDBListItem from "./FoodDBListItem";
// import { useRecoilState, useRecoilValue } from "recoil";
// import {
//   getfooddb,
// } from "../store/atoms/listsForMain";
// export default function MainFoodDB() {
//   const [exam, setexam] = useRecoilState(getfooddb);

//   return (
//     <div className="pending-patients-requests-outer">
//       <div className="pending-requests-title" style={{ width: "100%" }}>
//         <h3
//           className="diff-requests-title"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           Food Database{" "}
//         </h3>
//       </div>
//       <div className="div-req">
//         {exam == null ? (
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
//                     <div className="food-name">
//                       Food Name
//                       <div>(Serving Size)</div>
//                     </div>

//                     <div className="carbs-qty">Carbs</div>
//                     <div className="calories-qty">Calories</div>
//                     <div className="fat-qty">Fat</div>
//                     <div className="protein-qty">Protein</div>
//                     <div className="save-button-fooddb">Edit</div>
//                   </div>
//                 </div>
//               </li>
//               {exam.map((item, index) => {
//                 return (
//                   <FoodDBListItem
//                     key={item._id}
//                     item={item}
//                     details={exam}
//                     index={index}
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
