import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import "./PieChart.css"

const PieChart = ({series}) => {
  const [chartData, setChartData] = useState({
    series: series,
    options: {
      chart: {
        width: 380,
        type: 'pie',
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
    }
  });

  useEffect(() => {
    setChartData(prevOptions => ({
      ...prevOptions,
      series:
        series
    }));
  }, [series]);

  return (
    <div className='chart-container'>
        <h1>Etat des colis</h1>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={600} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;