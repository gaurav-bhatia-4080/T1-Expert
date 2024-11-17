import React, { Fragment } from "react";

import "react-toastify/dist/ReactToastify.css";
export default function MainTablesSkeleton() {
  return (
    <div
      role="status"
      className="p-4 rounded-2xl shadow animate-pulse md:p-6 dark:border-gray-700 h-full w-full bg-white"
    >
      <div className="w-full pl-12 pt-6 bg-white flex-col flex h-full justify-between">
        <div className="flex flex-row justify-between">
          <div className="h-18 bg-gray-200 rounded-2xl dark:bg-gray-700 w-64 flex items-center justify-end"></div>
          <div className="ml-4 pl-4 flex items-center bg-gray-200 w-96 rounded-xl h-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="w-full h-16 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
        </div>
        {/* <div>
          <div className="w-20 h-10 bg-gray-600 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-20 bg-gray-600 rounded-2xl dark:bg-gray-700 w-full"></div>
        </div> */}
      </div>
    </div>
  );
}
