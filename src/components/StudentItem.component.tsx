import React, { Fragment, useEffect, useState } from "react";
import styles from "./StudentItem.module.css";

/* This interface represents the structure of a student data */
export interface IStudent {
  city: string;
  company: string;
  email: string;
  firstName: string;
  grades: string[];
  id: string;
  lastName: string;
  pic: string;
  skill: string;
}

/* Allows us to bind all students data once to props */
export interface IStudentItemComponentProps {
  details: IStudent;
}

export const StudentItemComponent: React.FC<IStudentItemComponentProps> = (
  props
) => {
  const { details } = props;
  const [average, setAverage] = useState(0);
  const [open, setOpen] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);

  useEffect(() => {
    // Convert grades strings into numbers.
    const gradesInt = details.grades.map((grade: string) => parseInt(grade));

    // Calculate the student average.
    const sum = gradesInt.reduce(
      (acc: number, grade: number) => (acc += grade),
      0
    );
    setAverage(sum / details.grades.length);
  }, []);

  const handleOpen = () => {
    setAnimateClose(!animateClose);
    setTimeout(() => setOpen(!open), 180);
  };

  return (
    <div className={styles.student}>
      <div className={styles.picture}>
        <img src={details.pic} height={120} width={120} alt="picture" />
      </div>
      <div className={styles.studentDetails}>
        <div className={styles.head}>
          <h4 className={styles.name}>
            {details.firstName} {details.lastName}
          </h4>
          <button className={styles.button} onClick={handleOpen}>
            <i className={`las la-${open ? "minus" : "plus"}`}></i>
          </button>
        </div>
        <div className={styles.infos}>
          <span>Email: {details.email}</span>
          <span>Company: {details.company}</span>
          <span>Skil: {details.skill}</span>
          <span>Average: {average}%</span>
        </div>
      </div>
      {open ? (
        <div
          className={`${styles.infos} ${styles.accordion} ${
            animateClose ? styles.accordionOpen : styles.accordionClose
          }`}
        >
          <span>City: {details.city}</span>
          {details.grades.map((grade: string, i: number) => (
            <span>
              Test {i + 1}: {`${grade}%`}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
