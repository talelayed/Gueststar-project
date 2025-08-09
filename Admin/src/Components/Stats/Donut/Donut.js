import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import "./Donut.css"

const Donut = ({series}) => {
  const [chartData, setChartData] = useState({
    series: series,
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['En cours',"Livré","A vérifier","Retour"],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  useEffect(() => {
    setChartData(prevOptions => ({
      ...prevOptions,
      series:
        series
    }));
  }, [series]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width={400} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Donut;
