import React from "react";
import { Line } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { getPredictionExtraDetails, getPredictions } from "../store/atoms/patientDetails.js";
import { useParams } from "react-router-dom";
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

// Register the necessary components from chart.js
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

const BloodGlucoseTrends = () => {
  const { id } = useParams();
  const [exam] = useRecoilState(
    getPredictions(decodeURIComponent(id))
  );

  // Helper function to process data
  const processData = (data) => {
    // Group by date
    const groupedByDate = data.reduce((acc, entry) => {
      const { date, time, meal_category: food_category, blood_glucose: current_bg } = entry;

      // Initialize an array for each date if not present
      if (!acc[date]) acc[date] = [];

      // If time is available, use it, otherwise map food_category to a time order
      // const timeToUse =
      //   time === "Time"
      //     ? {
      //       Breakfast: "08:00",
      //       Lunch: "12:00",
      //       Snack: "16:00",
      //       Dinner: "19:00",
      //     }[food_category]
      //     : time;

      acc[date].push({ time, current_bg, food_category });
      return acc;
    }, {});

    // Sort entries by time within each date
    Object.keys(groupedByDate).forEach((date) => {
      groupedByDate[date].sort(
        (a, b) => new Date(`${date} ${a.time}`) - new Date(`${date} ${b.time}`)
      );
    });

    return groupedByDate;
  };

  const groupedData = processData(exam);

  // Prepare chart data
  const labels = [];
  const bgValues = [];

  Object.keys(groupedData).forEach((date) => {
    groupedData[date].forEach(({ time, current_bg }) => {
      // Use only the date, formatted as "DD MMMM YYYY"
      const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      labels.push(formattedDate);
      bgValues.push(current_bg);
    });
  });

  const chartData = {
    labels, // Only formatted dates will appear on the x-axis
    datasets: [
      {
        label: "Current BG Trend",
        data: bgValues,
        fill: true, // Enable fill to create a shaded area below the line
        backgroundColor: "rgba(255, 0, 0, 0.2)", // Light blood-red color for the shaded area
        borderColor: "rgba(255, 0, 0, 1)", // Blood-red color for the line
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: true, // Skip some labels if there are too many dates
          maxTicksLimit: 10, // Limit the number of displayed dates
        },
      },
      y: {
        title: {
          display: true,
          text: "Current BG",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="basic-details-calendar-div-outer">
      {/* <SideNavBar details={state.details} email={state.recordProp} /> */}

      <div className="basic-details-div">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BloodGlucoseTrends;
