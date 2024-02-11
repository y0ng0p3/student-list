import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { StudentItemComponent } from "./components";
import { IStudent } from "./models";
import { addStudentTag, filterByNameAndTag } from "./utils";

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
    const filtered = filterByNameAndTag(students, filterName, filterTag);
    setFilteredStudents(filtered);
  }, [filterName, filterTag]);

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleFilterByTag = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterTag(event.target.value);
  };

  const handleAddTag = (tag: string, id: string) => {
    const { newStudents, newFilteredStudents } = addStudentTag(
      students,
      filteredStudents,
      tag,
      id
    );
    if (newStudents.length) setStudents(newStudents);
    if (newFilteredStudents.length) setFilteredStudents(newFilteredStudents);
  };

  return (
    <div className={"App"}>
      <div>STUDENT LIST</div>
      <div className={"filter"}>
        <input
          className="filter-name-input"
          onChange={handleFilterByName}
          type="text"
          placeholder="Search by name"
        />
      </div>
      <div className={"filter"}>
        <input
          className="filter-tag-input"
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
      <a href="https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test">cypress e2e</a>
    </div>
  );
}

export default App;
