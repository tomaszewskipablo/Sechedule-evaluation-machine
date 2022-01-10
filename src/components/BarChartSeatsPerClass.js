import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "none",
    },
    title: {
      display: true,
      text: "Number of classrooms and sits",
    },
  },
};

const labels = ["0-15", "15-30", "30-50", "50-100", "100-200", "200-500"];

export const initialData = {
  labels,
  datasets: [
    {
      label: "pawel",
      data: [],
      backgroundColor: "rgba(100,100, 100, 0.2)",
      borderColor: "rgba(100, 100, 100, 1)",
      borderWidth: 1,
    },
  ],
};

export function BarChartSeatsPerClass() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    fetch(
      "http://ec2-3-121-160-188.eu-central-1.compute.amazonaws.com:5000/barplotdata?schedule_filename=schedule.csv&classroom_filename=classrooms.csv"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let newData = {
          labels,
          datasets: [
            {
              label: "pawel",
              data: [],
              backgroundColor: "rgba(100,100, 100, 0.2)",
              borderColor: "rgba(100, 100, 100, 1)",
              borderWidth: 1,
            },
          ],
        };
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["0-15"]
        );
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["15-30"]
        );
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["30-50"]
        );
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["50-100"]
        );
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["100-200"]
        );
        newData.datasets[0].data.push(
          json["number_of_classrooms_and_sits"]["200-500"]
        );
        setData(newData);
        console.log(newData);
      });
  }, []);

  return <Bar options={options} data={data} />;
}
export default BarChartSeatsPerClass;
