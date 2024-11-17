import React from "react";
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

  // Fetch the ICR lists data from Recoil state using the patientId
  const icrLists = useRecoilValue(getPatientsICRLists(id));

  // Extracting lists for bicr, licr, dicr
  const { bicr, licr, dicr } = icrLists;

  // Prepare data for the chart
  const data = {
    labels: bicr.map((_, index) => `Point ${index + 1}`), // Assuming all lists have the same length
    datasets: [
      {
        label: "BICR",
        data: bicr.map((item) => item.value),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)", // Shading color for BICR
        fill: true, // Enable shadow effect
        tension: 0.1,
      },
      {
        label: "LICR",
        data: licr.map((item) => item.value),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)", // Shading color for LICR
        fill: true, // Enable shadow effect
        tension: 0.1,
      },
      {
        label: "DICR",
        data: dicr.map((item) => item.value),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)", // Shading color for DICR
        fill: true, // Enable shadow effect
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ICR Line Graph with Shading",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Points",
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
    <div className="basic-details-calendar-div-outer">
      {/* <SideNavBar details={state.details} email={state.recordProp} /> */}

      <div className="basic-details-div">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ICRTrends;
