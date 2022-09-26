import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import "./AddQuestion.css";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);

  const save = () => {
    const db = getDatabase();
    const postListRef = ref(db, "questions");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      question,
      answers: JSON.parse(answers),
      correct: JSON.parse(correct),
    });
  };

  return (
    <div class="add-question">
      <div>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="answers">answers</label>
        <input
          id="answers"
          type="text"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="correct">correct</label>
        <input
          id="correct"
          type="text"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
        />
      </div>
      <button onClick={save}>save</button>
    </div>
  );
}
