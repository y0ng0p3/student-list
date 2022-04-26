import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { StudentItemComponent, IStudent } from "./components";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <h3 style={{ color: "teal", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h3>
      ) : error ? (
        <h3 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          Oops! Something went wrong.
        </h3>
      ) : (
        students.map((student: IStudent) => (
          <StudentItemComponent key={student.id} details={student} />
        ))
      )}
    </Fragment>
  );
}

export default App;
