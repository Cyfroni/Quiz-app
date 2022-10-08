import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import CheckBox from "../common/CheckBox";
import TextArea from "../common/TextArea";

const InputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 2rem;
    margin-bottom: 5px;
  }

  > div {
    display: flex;
    textarea {
      flex: 1;
    }
  }
`;

const AddQuestionStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin: 0 auto;
  padding: 10rem 0;
  /* margin-top: 10rem; */
  max-width: 60rem;

  font-size: 2rem;
`;

const AddQuestionButton = styled(Button)`
  align-self: flex-start;
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
      <InputGroupStyled>
        <label htmlFor="question">Question</label>
        <div>
          <TextArea
            name="question"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></TextArea>
        </div>
      </InputGroupStyled>
      {Object.entries(answers).map(([key, value]) => (
        <InputGroupStyled key={key}>
          <label htmlFor={key}>{key}</label>
          <div>
            <TextArea
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
            <CheckBox
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
        </InputGroupStyled>
      ))}
      <AddQuestionButton onClick={addAnswer}>+</AddQuestionButton>
      <Button onClick={save} primary>
        Save
      </Button>
    </AddQuestionStyled>
  );
}
