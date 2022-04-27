import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { StudentItemComponent, IStudent } from "./components";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredStudent, setFilteredStudent] = useState<IStudent[]>([]);

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((response) => {
        setStudents(response.data.students);
        setFilteredStudent(response.data.students);
        if (!response.data.students.length) setMessage("No student in the database");
      })
      .catch((err) => {
        setMessage("Oops! Something went wrong.");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterStudent = (value: string) => {
    if (value === '') {
      setFilteredStudent(students)
      return;
    }
    const filtered = students.filter((student) => {
      const pattern = new RegExp(value, 'i');
      return `${student.firstName} ${student.lastName}`.match(pattern)?.length;
    })
    setFilteredStudent(filtered);
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    filterStudent(event.target.value);
  };

  return (
    <div className={"App"}>
      <div className={"filter"}>
        <input
          className="filter-input"
          onChange={handleFilter}
          type="text"
          placeholder="Search by name"
        />
      </div>
      {loading ? (
        <h3 style={{ color: "teal", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h3>
      ) : message ? (
        <h3 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {message}
        </h3>
      ) : (
        <>
          {filteredStudent.length ? (
            filteredStudent.map((student: IStudent) => (
              <StudentItemComponent key={student.id} details={student} />
            ))
          ) : (
            <h3
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              No student found.
            </h3>
          )}
        </>
      )}
    </div>
  );
}

export default App;
