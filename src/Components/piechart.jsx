import React, { useState } from "react";
import Covid from "../Images/covid prevention.gif";
import Cough from "../Images/cough.gif";
import tiredness from "../Images/tiredness.gif";
import fever from "../Images/fever.gif";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import './prev.css'
const states = [
  "",
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

function MyVerticallyCenteredModal(props) {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book Appointment for Testing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} required controlId="formGridEmail">
              <Form.Label>FirstName</Form.Label>
              <Form.Control required placeholder="ex: Sahith Srivyshnav" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>LastName</Form.Label>
              <Form.Control placeholder="ex: Mahadevapuram" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control required placeholder="+91 8341543176" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control required as="select" defaultValue="Choose...">
                {states.map((state) => (
                  <option>{state}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Label>Symtoms</Form.Label>
          <Form.Group required id="formGridCheckbox">
            <Form.Check type="checkbox" label="Fever" />
            <Form.Check type="checkbox" label="Dry cough" />
            <Form.Check type="checkbox" label="Tiredness" />
            <Form.Check
              type="checkbox"
              label="Shortness of breath or difficulty breathing"
            />
            <Form.Check type="checkbox" label="Muscle aches" />
            <Form.Check type="checkbox" label="Sore throat" />
            <Form.Check type="checkbox" label="Runny nose" />
            <Form.Check type="checkbox" label="Headache" />
            <Form.Check type="checkbox" label="Chest pain" />
          </Form.Group>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Others
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              aria-label="Others"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              console.alert("Request sent");
              if (validated) {
                alert("Request sent");
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const Piechart = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="dis">
      <Card style={{ width: "100%" }}>
        <br />
        <Card.Title className="Card-title">
          Prevention
          <br />
          <img src={Covid} />
        </Card.Title>
        <br />
        <Card.Text style={{ fontFamily: "'Alice', serif", fontSize: "1rem" }}>
        <span style={{fontFamily:"'Krona One', sans-serif"}}>  STAY HOME. SAVE LIVES.</span>
          <br />
          Help stop coronavirus
          <br />
          <span className="prev">1. STAY</span> home
          <br />
          <span className="prev">2. KEEP</span> a safe distance
          <br />
          <span className="prev">3. WASH</span> hands often
          <br />
          <span className="prev">4. COVER</span> your cough
          <br />
          <span className="prev">5. SICK?</span> Call the helpline
          <br />
        </Card.Text>
      </Card>
      <Card style={{ width: "100%" }}>
        <div>
          <br />
          <Card.Title className="Card-title">
            Symptoms
          </Card.Title>

            <img  src={fever} />
            <img src={Cough} />
            <img src={tiredness} />
          
          <Card.Subtitle
          className="Card-subtitle"
          >
            <br/>
            Most common symptoms:
          </Card.Subtitle>
          <Card.Text
          className="Card-text"
          >
            1. Fever
            <br />
            2. Dry cough
            <br />
            3. Tiredness
          </Card.Text>
          <Card.Subtitle
            className="Card-subtitle"
          >
            Other symptoms can include:
          </Card.Subtitle>
          <Card.Text
             className="Card-text"
          >
            1. Shortness of breath or difficulty breathing
            <br />
            2. Muscle aches
            <br />
            3. Chills
            <br />
            4. Sore throat
            <br />
            5. Runny nose
            <br />
            6. Headache
            <br />
            7. Chest pain
            <br />
            <br />
          </Card.Text>
          <div>
            
          <span style={{fontFamily:"'Patua One', cursive"}}>Note : </span>If you find yourself with these symptoms, please help yourself
          by getting tested.
          </div>
          <br />
          <Button onClick={() => setModalShow(true)}>Book Test</Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <br />
          <br />
        </div>
      </Card>
    </div>
  );
};

export default Piechart;
