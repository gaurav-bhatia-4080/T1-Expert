import React from "react";

const PatientDetailsSkeleton = () => {
  return (
    <div className="selected-patients-info-outer dark-light-back h-screen">
      <div
        role="status"
        className="p-4 border border-gray-200 rounded-xl shadow animate-pulse md:p-6 dark:border-gray-700 flex flex-col h-full bg-white"
      >
        {" "}
        <div className="nav-bar-top flex space-x-6">
          <div className="h-12 bg-gray-200 rounded-2xl dark:bg-gray-700 w-24"></div>
          <div className="h-12 bg-gray-200 rounded-2xl dark:bg-gray-700 w-24"></div>
          <div className="h-12 bg-gray-200 rounded-2xl dark:bg-gray-700 w-24"></div>
          <div className="h-12 bg-gray-200 rounded-2xl dark:bg-gray-700 w-24"></div>
        </div>
        <div className="flex items-center mt-4 patient-details-header">
          <svg
            className="w-20 h-20 me-3 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-60 mb-2"></div>
            <div className="w-80 h-8 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="flex flex-1 rounded space-x-4 basic-details-calendar-div-outer mt-6 pr-6">
          <div className="w-[30%] bg-gray-300 rounded dark:bg-gray-700 p-4 flex flex-col justify-between h-full">
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>

            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="w-[70%] bg-gray-300 rounded dark:bg-gray-700 p-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-gray-200 dark:text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsSkeleton;
