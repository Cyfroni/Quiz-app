import {
  child,
  get,
  getDatabase,
  ref,
  query,
  limitToLast,
} from "firebase/database";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./App.css";

// const QUESTIONS = [
//   {
//     question: "What is love?",
//     answers: ["love", "hurt me", "baby dont hurt me"],
//     correct: [2],
//   },
//   {
//     question: "Is dollar expensive?",
//     answers: ["yes", "no", "very"],
//     correct: [0, 2],
//   },
// ];

export async function loader() {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `questions`));
  return Object.values(snapshot.val());

  // const db = getDatabase();
  // const data = query(ref(db, "questions"), limitToLast(100));
  // return data.
}

function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState({});

  // const questions = QUESTIONS
  const questions = useLoaderData();

  const question = questions[questionNumber];

  const handleChange = (event) => {
    setCheckedAnswers((answs) => ({
      ...answs,
      [event.target.name]: event.target.checked,
    }));
  };

  const next = () => {
    console.log(question?.correct);
    console.log(checkedAnswers);
    setQuestionNumber((q) => q + 1);
  };

  return (
    <div className="App">
      <h1>Question: {questionNumber}</h1>
      <article className="question">
        <h2 className="question__question">{question?.question}</h2>
        <ul className="question__answers">
          {question?.answers?.map((a) => (
            <li key={a}>
              <input
                type="checkbox"
                id={a}
                name={a}
                value={checkedAnswers[a]}
                onChange={handleChange}
              />
              <label htmlFor={a}>{a}</label>
            </li>
          ))}
        </ul>
      </article>
      <footer>
        <button
          onClick={() => setQuestionNumber((q) => q - 1)}
          disabled={questionNumber <= 0}
        >
          &larr;
        </button>
        <button
          onClick={() => next()}
          disabled={questionNumber >= questions.length}
        >
          &rarr;
        </button>
        {/* {questionNumber === questions.length && <button>finish</button>} */}
      </footer>
    </div>
  );
}

export default App;
