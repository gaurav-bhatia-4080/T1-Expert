import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  UilStethoscope,
  UilUserCheck,
  UilEnvelopeAdd,
  UilDatabase,
  UilPizzaSlice,
  UilDumbbell,
} from "@iconscout/react-unicons";

import "react-toastify/dist/ReactToastify.css";
import {
  pendingPatientsListLengthSelector,
  pendingFoodListLengthSelector,
  pendingExerciseListLengthSelector,
} from "../store/atoms/listsForMain";
import { useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/userState";
export default function MainSideNavSkeleton() {
  return (
    <div
      role="status"
      className="p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700 h-full bg-gray-900"
    >
      <nav className="w-[20vw] bg-gray-900 flex-col flex h-full justify-between">
        <div className="h-20 bg-gray-600 rounded-3xl dark:bg-gray-700 w-full flex items-center justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-16 w-16 text-gray-600 dark:text-gray-300 mr-4" // Increased size and added margin
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div>
          <div className="w-20 h-10 bg-gray-600 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
        </div>
        <div>
          <div className="w-20 h-10 bg-gray-600 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full"></div>
        </div>
        {/* <ul className="nav-menu-items">
          <div>

            <li className="nav-text bg-gray-200 dark:bg-gray-700">
              <div>
                <span></span>
              </div>
            </li>
            <li className="nav-text bg-gray-200 dark:bg-gray-700">
              <div>
                <span></span>
              </div>
            </li>
            <li className="nav-text bg-gray-200 dark:bg-gray-700">
              <div>
                <span></span>
              </div>
            </li>
          </div>
          <div className="sections-gen-req bg-gray-200 dark:bg-gray-700"></div>

          <li className="nav-text bg-gray-200 dark:bg-gray-700">
            <div>
              <span className="pending-count-span bg-gray-200 dark:bg-gray-700">
                <span className="pending-count-span-title bg-gray-200 dark:bg-gray-700"></span>

                <span className="pending-count "></span>
              </span>
            </div>{" "}
          </li>
          <li className="nav-text bg-gray-200 dark:bg-gray-700">
            <div>
              <span className="pending-count-span">
                <span className="pending-count-span-title"></span>

                <span className="pending-count"></span>
              </span>
            </div>{" "}
          </li>
          <li className="nav-text bg-gray-200 dark:bg-gray-700">
            <div>
              <span className="pending-count-span">
                <span className="pending-count-span-title"></span>

                <span className="pending-count"></span>
              </span>
            </div>{" "}
          </li>
        </ul> */}
      </nav>
    </div>
  );
}
