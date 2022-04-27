import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { StudentItemComponent, IStudent } from "./components";

type Getter = (student: IStudent) => string 

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((response) => {
        const responseWithTags = response.data.students.map(
          (student: IStudent) => {
            return { ...student, tags: [] };
          }
        );
        setStudents(responseWithTags);
        setFilteredStudents(responseWithTags);
        if (!response.data.students.length)
          setMessage("No student in the database");
      })
      .catch((err) => {
        setMessage("Oops! Something went wrong.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredByName = filterStudent(students, getName, filterName);
    const filteredByTag = filterStudent(filteredByName, getTag, filterTag);
    setFilteredStudents(filteredByTag);
  }, [filterName, filterTag]);

  const filterStudent = (students: IStudent[], getter: Getter, value: string, ) => {
    if (value === "") return students;

    const filtered = students.filter((student) => {
      const pattern = new RegExp(value, "i");
      const stringToFilter = getter(student)
      return stringToFilter.match(pattern)?.length;
    });
    return filtered;
  };

  const getName = (student: IStudent) => {
    return `${student.firstName} ${student.lastName}`;
  }

  const getTag = (student: IStudent) => {
    return `${student.tags.join(" ")}`;
  }

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleFilterByTag = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterTag(event.target.value);
  };

  const handleAddTag = (tag: string, id: string) => {
    let index = 0;
    let newStudents = students;
    const found = students.find((student: IStudent) => student.id === id);
    let filteredIndex = 0;
    let newFilteredStudents = filteredStudents;
    if (found) {
      index = students.indexOf(found);
      filteredIndex = filteredStudents.indexOf(found);
      found.tags.push(tag);
      newStudents[index] = found;
      newFilteredStudents[filteredIndex] = found;
      setStudents(newStudents);
      setFilteredStudents(newFilteredStudents);
    }
  };

  return (
    <div className={"App"}>
      <div className={"filter"}>
        <input
          className="filter-input"
          onChange={handleFilterByName}
          type="text"
          placeholder="Search by name"
        />
      </div>
      <div className={"filter"}>
        <input
          className="filter-input"
          onChange={handleFilterByTag}
          type="text"
          placeholder="Search by tag"
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
          {filteredStudents.length ? (
            filteredStudents.map((student: IStudent) => (
              <StudentItemComponent
                key={student.id}
                details={student}
                addTag={handleAddTag}
              />
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
