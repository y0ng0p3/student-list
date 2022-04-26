import React, { Fragment, useEffect, useState } from "react";

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
    <div>
      <img src={details.pic} height={100} width={100} alt="picture" /> <br />
      <br />
      <div>
        <strong>
          {details.firstName} {details.lastName}
        </strong>
      </div>
      <br />
      <div>Email: {details.email}</div> <br />
      <div>Company: {details.company}</div> <br />
      <div>Skil: {details.skill}</div> <br />
      <div>Average: {average}%</div> <br />
    </div>
  );
};
