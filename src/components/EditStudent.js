import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {

  let params = useParams();
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [cls, setCls] = useState("");
  const url = "https://61ee1facd593d20017dbac54.mockapi.io/students/";

  //using axios
  let getData = async () => {
    try {
      let response = await axios.get(url + params.id);
      setName(response.data.name);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setCls(response.data.class);
    } catch (error) {
      console.log(error);
    }
  };

  let handleSubmit = async () => {
    try {
      let response = await axios.put(url + params.id, {
        name,
        email,
        mobile,
        class: cls,
      });
      if (response.status == 200) {
        navigate("/all-students");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          value={mobile}
          type="text"
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Class</Form.Label>
        <Form.Control
          value={cls}
          type="text"
          placeholder="Class"
          onChange={(e) => setCls(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  );
}

export default EditStudent;
