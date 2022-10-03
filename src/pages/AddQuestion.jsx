import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";

const AddQuestionStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin: 0 auto;
  margin-top: 10rem;
  max-width: 60rem;

  font-size: 2rem;

  > div > div {
    display: flex;
    textarea {
      font-size: 1.6rem;
      padding: 0.5rem;
      border-radius: 10px;
      flex: 1;
    }
  }

  button {
    align-self: flex-start;
  }
`;

export default function AddQuestion() {
  const [question, setQuestion] = useState("");

  const [answers, setAnswers] = useState({
    "Answer 1": {
      text: "",
      correct: false,
    },
  });

  const save = () => {
    const db = getDatabase();
    const postListRef = ref(db, "questions");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      question,
      answers,
    });
  };

  const addAnswer = () => {
    setAnswers((answers) => ({
      ...answers,
      [`Answer ${Object.keys(answers).length + 1}`]: {
        text: "",
        correct: false,
      },
    }));
  };

  return (
    <AddQuestionStyled>
      <div>
        <label htmlFor="question">Question</label>
        <div>
          <textarea
            name="question"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
      </div>
      {Object.entries(answers).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <div>
            <textarea
              name={key}
              id={key}
              type="text"
              value={value.text}
              onChange={(e) =>
                setAnswers((answers) => ({
                  ...answers,
                  [key]: {
                    text: e.target.value,
                    correct: value.correct,
                  },
                }))
              }
            />
            <input
              type="checkbox"
              value={value.text}
              onChange={(e) =>
                setAnswers((answers) => ({
                  ...answers,
                  [key]: {
                    text: value.text,
                    correct: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
      ))}
      <Button onClick={addAnswer}>Add new answer</Button>
      <Button onClick={save}>save</Button>
    </AddQuestionStyled>
  );
}
