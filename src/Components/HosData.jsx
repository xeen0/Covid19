import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Iframe from 'react-iframe'
const  HosData= ({ state }) => {
  const [urbanHos, setUrbanHos] = useState(65);
  const [urbanBeds, setUrbanBeds] = useState(16658);
  const [ruralHos, setRuralHos] = useState(193);
  const [ruralBeds, setRuralBeds] = useState(6480);
  const [totalHos, setTotalHos] = useState(258);
  const [totalBeds, setTotalBeds] = useState(23138);
  const [hosData, setHosData] = useState(0);
  useEffect(() => {
      console.log("hosData")
    const fetchData = async () => {
      const res2 = await fetch(
        "https://api.rootnet.in/covid19-in/hospitals/beds",
        { method: "GET" }
      );
      const resJson2 = await res2.json();
      const data2 = await resJson2.data;
      setHosData(data2);
      console.log(data2)
      await data2.regional.map((st) => {
          if (st.state === state) {
            setUrbanHos(st.urbanHospitals);
            setUrbanBeds(st.urbanBeds);
            setRuralHos(st.ruralHospitals);
            setRuralBeds(st.ruralBeds);
            setTotalBeds(st.totalBeds);
            setTotalHos(st.totalHospitals);
        }
      });
    };
    fetchData();
    console.log(state)
  },[]);
  useEffect(() => {
    if (hosData.regional !== undefined) {
      hosData.regional.map(async (st) => {
        if (st.state == state) {
          setUrbanHos(st.urbanHospitals);
          setUrbanBeds(st.urbanBeds);
          setRuralHos(st.ruralHospitals);
          setRuralBeds(st.ruralBeds);
          setTotalBeds(st.totalBeds);
          setTotalHos(st.totalHospitals);
        }
      });
    }
  }, [state]);
  return (
    <div>
        
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>No. Of Hospitals</th>
            <th>No. Of Beds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rural: </td>
            <td>{ruralHos}</td>
            <td>{ruralBeds}</td>
          </tr>
          <tr>
            <td>Urban</td>
            <td>{urbanHos}</td>
            <td>{urbanBeds}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{totalHos}</td>
            <td>{totalBeds}</td>
          </tr>
        </tbody>
      </Table>
      
    </div>
  );
}

export default HosData;
