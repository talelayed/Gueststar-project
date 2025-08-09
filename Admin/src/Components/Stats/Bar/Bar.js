import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Bar = ({barXaxis, seriesBar}) => {    
  const [chartData, setChartData] = useState({
    series: [{
      data: seriesBar
    }],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: [  
        '#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7', '#ff7f50', '#32cd32', '#ff6347', '#8a2be2', '#7fff00', '#d2691e',
        '#ff1493', '#00bfff', '#ff4500', '#2f4f4f', '#00008b', '#f0e68c', '#dda0dd', '#ff8c00'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
          text: 'Colis livrés par Governorat (%)',
          align: 'center',
        style: {
            fontSize: '20px',
            fontWeight: 'bold'
        }
    },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      }
    }
  });

  useEffect(() => {
    setChartData(prevOptions => ({
      ...prevOptions,
      series: [
        {
          data: seriesBar
        }
      ],
      options: {
        ...prevOptions.options,
        xaxis: {
          ...prevOptions.options.xaxis,
          categories: barXaxis,
        },
      }
    }));
  }, [barXaxis, seriesBar]);
  

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={700} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Bar;
