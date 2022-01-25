import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
const url = "https://61ee1facd593d20017dbac54.mockapi.io/students/";
function AllStudents() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (i) => {
    try {
      let response = await axios.delete(url + i);
      if (response.status == 200) getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table className="Allstu" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.class}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>
                    Delete
                  </Button>
                  <span>&nbsp; &nbsp;</span>
                  <Link to={`/edit-student/${e.id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  {/* <Button variant='primary' onClick={()=>{
                                            navigate('/edit-student/'+i)
                                        }}>Edit</Button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default AllStudents;
