import React, { KeyboardEvent, useEffect, useState } from "react";
import styles from "./StudentItem.module.css";
import { IStudent } from "../models";

/* Allows us to bind all students data once to props */
export interface IStudentItemComponentProps {
  details: IStudent;
  addTag: (tag: string, id: string) => void;
}

export const StudentItemComponent: React.FC<IStudentItemComponentProps> = (
  props
) => {
  const { details, addTag } = props;
  const [average, setAverage] = useState(0);
  const [open, setOpen] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Convert grades strings into numbers.
    const gradesInt = details.grades.map((grade: string) => parseInt(grade));

    // Calculate the student average.
    const sum = gradesInt.reduce(
      (acc: number, grade: number) => (acc += grade),
      0
    );
    setAverage(sum / details.grades.length);

    if (details.tags?.length) setTags(details.tags);
  }, []);

  const handleOpen = () => {
    setAnimateClose(!animateClose);
    setTimeout(() => setOpen(!open), 180);
  };

  const handleTagInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value && event.key === "Enter") {
      event.preventDefault();
      setTags([...tags, event.currentTarget.value]);
      addTag(event.currentTarget.value, details.id);
      event.currentTarget.value = "";
    }
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
          <button
            data-testid="js-button"
            className={styles.button}
            onClick={handleOpen}
          >
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
            <span key={i}>
              Test {i + 1}: {`${grade}%`}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.addTag}>
        <div className={styles.tags}>
          {tags.map((tag: string, i: number) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <input
          className={styles.tagInput}
          type="text"
          placeholder="Add a tag"
          onKeyDown={handleTagInput}
        />
      </div>
    </div>
  );
};
