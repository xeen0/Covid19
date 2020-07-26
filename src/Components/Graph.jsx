import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from 'react-responsive'
const ApexChart = ({ state }) => {
  const isMobile = useMediaQuery({
    query: '(min-device-width: 480px)'
  })
const range = isMobile?20:10
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [recoveryCases, setRecoveryCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    console.log('graph')
    const fetchData = async () => {
      const res = await fetch(
        "https://api.rootnet.in/covid19-in/stats/history",
        {
          method: "GET",
        }
      );
      const resjson = await res.json();
      const data = await resjson.data;
      setData(data);
      var cc = [],
        rc = [],
        d = [],
        dts = [];
       await data.map((data) =>
        data.regional.map((i) => {
          if (i.loc === state) {
            dts.push(data.day);
            cc.push(i.totalConfirmed);
            rc.push(i.discharged);
            d.push(i.deaths);
          }
        })
      );

      setDeaths(d);
      setRecoveryCases(rc);
      setConfirmedCases(cc);
      setDates(dts);
      
    };

    fetchData();
  }, []);
  useEffect (()=>{
    var cc = [],
        rc = [],
        d = [],
        dts = [];
     data.map((data) =>
        data.regional.map((i) => {
          if (i.loc === state) {
            dts.push(data.day);
            cc.push(i.totalConfirmed);
            rc.push(i.discharged);
            d.push(i.deaths);
          }
        })
      );

      setDeaths(d);
      setRecoveryCases(rc);
      setConfirmedCases(cc);
      setDates(dts);
  },[state])
  const series = [
    {
      name: "Confirmed Cases",
      data: [...confirmedCases],
    },
    {
      name: "Discharge",
      data: [...recoveryCases],
    },
    {
      name: "Deaths",
      data: [...deaths],
    },
  ];
  const options = {
    chart: {
      events: {
        beforeZoom: function (ctx) {
          ctx.w.config.xaxis.range = undefined;
        },
      },
     
      height: 550,
      type: "line",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },

      toolbar: {
        autoSelected: "zoom",
      },
    },
    colors: ["#FF8300", "#00FF00", "#FF0000"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Covid Cases Analysis",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], 
        opacity: 0.5,
      },
    },
    markers: {
      size: 0.6,
    },
    xaxis: {
      categories: [...dates],
      title: {
        text: "Date",
      },
      range: range
    },
    tooltip: {
      shared: false,
    
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
