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

  useEffect(() => {
    // Convert grandes strings into numbers.
    const gradesInt = details.grades.map((grade: string) => parseInt(grade));

    // Calcul the student average.
    const sum = gradesInt.reduce(
      (acc: number, grade: number) => (acc += grade),
      0
    );
    setAverage(sum / details.grades.length);
  }, []);

  return (
    <div className={styles.student}>
      <div className={styles.picture}>
        <img src={details.pic} height={120} width={120} alt="picture" />
      </div>
      <div className={styles.studentDetails}>
        <h4 className={styles.name}>
            {details.firstName} {details.lastName}
        </h4>
        <span className={styles.infos}>
        <span>Email: {details.email}</span>
        <span>Company: {details.company}</span>
        <span>Skil: {details.skill}</span>
        <span>Average: {average}%</span>
        </span>
      </div>
    </div>
  );
};
