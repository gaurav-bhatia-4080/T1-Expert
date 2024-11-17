import React, { Fragment, Suspense } from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Logout from "./Logout";
import "react-toastify/dist/ReactToastify.css";
import { currentUser } from "../store/atoms/userState";
import { Toaster, toast } from "react-hot-toast";
import MainSideNav from "./MainSideNav";
import { useRecoilState, useRecoilValue } from "recoil";
import { pendingPatients, selectedOption } from "../store/atoms/listsForMain";
import MainSideNavSkeleton from "./MainSideNavSkeleton";
import MainExperts from "./MainExperts";
import MainFoodDB from "./MainFoodDB";
import MainMyPatients from "./MainMyPatients";
import MainPendingExercise from "./MainPendingExercise";
import MainPendingFood from "./MainPendingFood";
import MainPendingPatients from "./MainPendingPatients";
import DoubleLoader from "./DoubleLoader";
import Loading from "./Loading";
import MainTablesSkeleton from "./MainTablesSkeleton";
// const MainFoodDB = React.lazy(() => import('./MainFoodDB'));
// const MainMyPatients = React.lazy(() => import('./MainMyPatients'));
// const MainExperts = React.lazy(() => import('./MainExperts'));
// const MainPendingPatients = React.lazy(() => import('./MainPendingPatients'));
// const MainPendingFood = React.lazy(() => import('./MainPendingFood'));
// const MainPendingExercise = React.lazy(() => import('./MainPendingExercise'));

// function Main() {
//   const [user, setUser] = useRecoilState(currentUser);
//   const selected = useRecoilValue(selectedOption);
//   const [showLogoutOptions, setShowLogoutOptions] = useState(false);

//   const handleHideProfile = () => {
//     setShowLogoutOptions(false);
//   };

//   return (
//     <div className="outmost">
//       <span className="sidebar-span">
//         <Suspense fallback={<MainSideNavSkeleton />}>
//           <MainSideNav />
//         </Suspense>
//         <div className="flex-outer">
//           <div className="flex-box-div">
//             <Suspense fallback={<MainTablesSkeleton/>}>
//               {(user.email === "samwilson14111@gmail.com" ||
//                 user.email === "docrajivsingla@gmail.com") &&
//                 selected === "doctor" && (
//                   <MainExperts />
//                 )}
//               {selected === "mypatients" && <MainMyPatients />}
//               {selected === "fooddb" && <MainFoodDB />} {/* Lazy loaded food database */}
//               {selected === "patients" && <MainPendingPatients />}
//               {selected === "food" && <MainPendingFood />}
//               {selected === "exercise" && <MainPendingExercise />}
//             </Suspense>
//           </div>
//         </div>
//       </span>
//       {showLogoutOptions ? (
//         <Logout user={user} setUser={setUser} hideProfile={handleHideProfile} />
//       ) : (
//         <div></div>
//       )}
//       <Toaster position="top-center" reverseOrder={true} />
//     </div>
//   );
// }

// export default Main;
function Main() {
  const [user, setUser] = useRecoilState(currentUser);
  const selected = useRecoilValue(selectedOption);
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);

  const handleHideProfile = () => {
    setShowLogoutOptions(false);
  };

  return (
    <div className="outmost">
      <span className="sidebar-span">
        <Suspense fallback={<MainSideNavSkeleton />}>
          <MainSideNav />
        </Suspense>
        {/* <MainSideNavSkeleton /> */}
        <div className="flex-outer">
          <div className="flex-box-div">
            {(user.email == "samwilson14111@gmail.com" ||
              user.email == "docrajivsingla@gmail.com") &&
              selected == "doctor" && (
                <Suspense fallback={<MainTablesSkeleton />}>
                  <MainExperts />{" "}
                </Suspense>
              )}
            {selected == "mypatients" && (
              <Suspense fallback={<MainTablesSkeleton />}>
                <MainMyPatients />{" "}
              </Suspense>
            )}
            {selected == "fooddb" && (
              <Suspense fallback={<MainTablesSkeleton />}>
                <MainFoodDB />
              </Suspense>
            )}
            {selected == "patients" && (
              <Suspense fallback={<MainTablesSkeleton />}>
                <MainPendingPatients />
              </Suspense>
            )}
            {selected == "food" && (
              <Suspense fallback={<MainTablesSkeleton />}>
                <MainPendingFood />{" "}
              </Suspense>
            )}
            {selected == "exercise" && (
              <Suspense fallback={<MainTablesSkeleton />}>
                <MainPendingExercise />{" "}
              </Suspense>
            )}
          </div>
        </div>
      </span>
      {showLogoutOptions ? (
        <Logout user={user} setUser={setUser} hideProfile={handleHideProfile} />
      ) : (
        <div></div>
      )}
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}
export default Main;
