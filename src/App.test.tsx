import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import App from "./App";
import { IStudent } from "./models";
import { StudentItemComponent } from "./components";

const student: IStudent = {
  city: "Fush\u00eb-Muhurr",
  company: "Yadel",
  email: "iorton0@imdb.com",
  firstName: "Ingaberg",
  grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
  id: "1",
  lastName: "Orton",
  pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
  skill: "Oracle",
  tags: ["tag2", "sdfd", "t8ig"],
};

test("render student item", () => {
  const { getByText } = render(
    <StudentItemComponent details={student} addTag={() => {}} />
  );
  const ANIMATION_FINISHED_DURATION = 1000;
  const button = screen.getByTestId(/js-button/i);
  fireEvent.click(button);
  setTimeout(() => {
    const span = getByText(/78/i);
    expect(span).toBeInTheDocument();
  }, ANIMATION_FINISHED_DURATION);
});
