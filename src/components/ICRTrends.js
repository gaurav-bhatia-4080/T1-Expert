import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Line } from "react-chartjs-2";
import { getPatientsICRLists } from "../store/atoms/patientDetails.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useParams } from "react-router-dom";
import EditICRDialog from "./EditICRDialog.js";

// Register Chart.js components including Filler for shadow effect
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ICRTrends = () => {
  const { id } = useParams();

  const [showEditICRDialog, setShowEditICRDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Fetch the ICR lists data from Recoil state using the patientId
  const icrLists = useRecoilValue(getPatientsICRLists(id));

  // Extracting lists for bicr, licr, dicr
  const { bicr, licr, sicr, dicr } = icrLists;

  // Prepare data for the chart

  const allTimestampsSet = new Set([
    ...bicr.map((item) => item.updation_time),
    ...licr.map((item) => item.updation_time),
    ...sicr.map((item) => item.updation_time),
    ...dicr.map((item) => item.updation_time),
  ]);

  // 2. Convert to sorted array
  const allTimestamps = Array.from(allTimestampsSet).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  // 3. Format label
  // s
  const labels = allTimestamps.map((ts) => {
    const date = new Date(parseInt(ts));
    return `${date.toLocaleDateString()} (${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })})`;
  });

  // const labels = allTimestamps.map((ts) =>
  //   new Date(parseInt(ts)).toLocaleDateString()
  // );

  // Helper to map values to all timestamps
  const mapDataToTimestamps = (list) => {
    const map = {};
    list.forEach((item) => {
      map[item.updation_time] = item.value;
    });
    return allTimestamps.map((ts) => map[ts] ?? null); // Use null where no data exists
  };

  // 4. Final chart data
  const data = {
    labels,
    datasets: [
      {
        label: "BICR",
        data: mapDataToTimestamps(bicr),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "LICR",
        data: mapDataToTimestamps(licr),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "SICR",
        data: mapDataToTimestamps(sicr),
        borderColor: "rgba(225,119,164,1)",
        backgroundColor: "rgba(225,159,164,0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "DICR",
        data: mapDataToTimestamps(dicr),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };



  // const data = {
  //   labels: bicr.map((x, index) => {
  //     console.log(x);
  //     console.log(new Date(x.updation_time));
  //     return new Date(parseInt(x.updation_time)).toLocaleDateString();
  //   }), // Assuming all lists have the same length
  //   datasets: [
  //     {
  //       label: "BICR",
  //       data: bicr.map((item) => item.value),
  //       borderColor: "rgba(75,192,192,1)",
  //       backgroundColor: "rgba(75,192,192,0.2)", // Shading color for BICR
  //       fill: true, // Enable shadow effect
  //       tension: 0.1,
  //     },
  //     {
  //       label: "LICR",
  //       data: licr.map((item) => item.value),
  //       borderColor: "rgba(153,102,255,1)",
  //       backgroundColor: "rgba(153,102,255,0.2)", // Shading color for LICR
  //       fill: true, // Enable shadow effect
  //       tension: 0.1,
  //     },
  //     ,
  //     {
  //       label: "SICR",
  //       data: sicr.map((item) => item.value),
  //       borderColor: "rgba(25,119,164,1)",
  //       backgroundColor: "rgba(25,159,164,0.2)", // Shading color for DICR
  //       fill: true, // Enable shadow effect
  //       tension: 0.1,
  //     },
  //     {
  //       label: "DICR",
  //       data: dicr.map((item) => item.value),
  //       borderColor: "rgba(255,159,64,1)",
  //       backgroundColor: "rgba(255,159,64,0.2)", // Shading color for DICR
  //       fill: true, // Enable shadow effect
  //       tension: 0.1,
  //     },
  //   ],
  // };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ICR weekly trends",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Updation Dates",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return (
    <div className="basic-details-calendar-div-outer-icr">
      {/* <SideNavBar details={state.details} email={state.recordProp} /> */}





      <div className="basic-details-div">
        <div className="view-patient-details-button">
          <div className="hover-details-container">
            <button className="details-button" onClick={() => setShowEditICRDialog(true)}>
              <span className="button-text">Edit ICR values</span>
              <span className="dropdown-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.06 4.94l3.75 3.75"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </span>
            </button>
          </div>
        </div>

        <Line data={data} options={options} />
      </div>


      {showEditICRDialog && (
        <EditICRDialog
          icrLists={icrLists}
          // setList={setList}
          onClose={() => {
            setShowEditICRDialog(false);
          }}
          startLoading={() => {
            setShowLoading(true);
          }}
          stopLoading={() => {
            setShowLoading(false);
          }}
        />
      )}

    </div>
  );
};

export default ICRTrends;
