import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import "./AddQuestion.css";

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
    <section id="add-question">
      <div>
        <label htmlFor="question">Question</label>
        <div className="input-container">
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
          <div className="input-container">
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
      <button className="add-answer-btn" onClick={addAnswer}>
        Add new answer
      </button>
      <button className="save-btn" onClick={save}>
        save
      </button>
    </section>
  );
}
