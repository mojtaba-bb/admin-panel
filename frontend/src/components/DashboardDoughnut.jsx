import React from 'react'
import Chart, { Chart as ChartJs, Legend } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

function DashboardDoughnut() {
    
    const myChart = new ChartJs({
        type : "doughnut",
        data:{
            labels: ["Social Media", "Blue"],

            datasets: [
              {
                label: "My First Dataset",

                data: [300, 50],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                ],
                borderRadius: "30",
                borderWidth: 0,
                offset: 15,
                weight: 1,
              },
            ],
          },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
              }
            }
          },
    })
  return (
    <div>
        {myChart}
    </div>
  )
}

export default DashboardDoughnut