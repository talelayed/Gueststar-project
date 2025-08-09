import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { setXAxis } from '../../../Functions/Functions';

const Line = ({ xAxis, series }) => {

  const [chartData, setChartData] = useState({
    series: [{
        name: "commandes",
        data: [
            "150", "160", "155", "170", "180", "175", "165", "190", "200", "195",
            "210", "220", "215", "230", "225", "235", "240", "230", "220", "210",
            "200", "190", "180", "170", "160", "150", "160", "170", "160", "150"
          ]
          
      }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: `${xAxis[0]} - ${xAxis[xAxis.length - 1]}`,
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      xaxis: {
        type: "date",
        categories:xAxis
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });


  useEffect(() => {
    setChartData(prevOptions => ({
      ...prevOptions,
    //   series: [
    //     {
    //       name: "commandes",
    //       data: series
    //     }
    //   ],
      options: {
        ...prevOptions.options,
        xaxis: {
          ...prevOptions.options.xaxis,
          categories: xAxis,
        }
      }
    }));
  }, [series, xAxis]);
  

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={650} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Line;