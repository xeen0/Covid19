import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ApexChart from "./Components/Graph";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import { Autocomplete } from "@material-ui/lab";
import Alert from "react-bootstrap/Alert";
import "./App.css";
import HosData from "./Components/HosData";
import Pie from "./Components/piechart";
import {FiPhone , FiMail} from "react-icons/fi"
const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharastra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];
function App() {
  const [value, setValue] = useState(states[0]);
  const [contactData, setContactData] = useState();
  const [contact, setContact] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [confirmCases, setConfirmCases] = useState("0");
  const [discharged, setDischarged] = useState("0");
  const [deaths, setDeaths] = useState("0");
  const [casesData, setCasesData] = useState();
  
  

  useEffect(() => {
    const fetchData = async () => {
      console.log('mai')
      const res = await fetch("https://api.rootnet.in/covid19-in/contacts", {
        method: "GET",
      });

      const resJson = await res.json();
      const data = await resJson.data;
      const res1 = await fetch(
        "https://api.rootnet.in/covid19-in/stats/latest",
        { method: "GET" }
      );
     

      const resJson1 = await res1.json();
      const data1 = await resJson1.data;

     
      await setCasesData(data1);
      await setContactData(data.contacts);
      var pc = await data.contacts.primary;
     await data.contacts.regional.map( (re) => {
        if (re.loc === value) {
          setContact(re.number);
        }
        return
      });
      await setPrimaryContact(pc);
     await data1.regional.map( (cas) => {
        if (cas.loc === value) {
          setConfirmCases(cas.totalConfirmed);
          setDeaths(cas.deaths);
          setDischarged(cas.discharged);
        }
      });
     
    };
    fetchData();
  },[]);
  useEffect(() => {
    if (contactData !== undefined) {
      contactData.regional.map((re) => {
        if (re.loc === value) setContact(re.number);
      });
    }
    if (casesData !== undefined) {
      casesData.regional.map((cas) => {
        if (cas.loc === value) {
          setConfirmCases(cas.totalConfirmed);
          setDeaths(cas.deaths);
          setDischarged(cas.discharged);
        }
      });
     
    }
  }, [value]);
  return (
    
    <div className="App">
      <div style={{ width: "98%", margin: "auto" }}>
        <Autocomplete
          id="State"
          freeSolo
          options={states}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="State"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </div>
      <CardDeck style={{ margin: "auto" }}>
        <Card>
          <Alert variant="success">
            <Alert.Heading>Discharged</Alert.Heading>
            <Card.Text>{discharged}</Card.Text>
          </Alert>
        </Card>
        <Card>
          <Alert variant="warning">
            <Alert.Heading>Confirm Cases</Alert.Heading>
            <Card.Text>{confirmCases}</Card.Text>
          </Alert>
        </Card>
        <Card>
          <Alert variant="danger">
            <Alert.Heading>Deaths</Alert.Heading>
            <Card.Text>{deaths}</Card.Text>
          </Alert>
        </Card>
      </CardDeck>
      <Card>
        <Card.Body border="light" style={{ padding: "1em", borderRadius: 0 }}>
          <ApexChart state={value} />
        </Card.Body>
      </Card>
      <Card border="light" style={{ width: "100%" }}>
        <Card.Header className="title-1"> {value}</Card.Header>
        <Card.Body>
          <Card.Title >
            India:-
             <FiPhone/>{" :"}
            <a href={`tel:${primaryContact.number}`}>
              {primaryContact.number}
            </a>
            <br/>
            <FiMail/> {":"}
            <a href={`mailto:${primaryContact.email}`}>
              {primaryContact.email}
            </a>
          </Card.Title>
          <Card.Text >Local Contact Details:-<span style={{ fontSize: "1em" }}> <FiPhone/> {":"}</span> <a href={`tel:${contact}`}>{contact}</a></Card.Text>
      <HosData state={value}/>
      </Card.Body>
      </Card>
      {/* <Card style={{width:"30rem"}}> */}
      <Pie/>
      {/* </Card> */}
    </div>
  );
}

export default App;
