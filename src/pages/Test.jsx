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
import "./Test.css";

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

function Test() {
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
    console.log(question?.answers);
    console.log(checkedAnswers);

    // let correct = 0;
    // let incorrect = 0;

    // console.log(Object.entries(question?.answers).forEach([key, {correct}] => )

    setQuestionNumber((q) => q + 1);
  };

  console.log(questions);

  return (
    <section id="test">
      <h1>Question: {questionNumber}</h1>
      <article className="question">
        <h2 className="question__question">{question?.question}</h2>
        <ul className="question__answers">
          {Object.entries(question?.answers || {}).map(([key, value]) => (
            <li key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                value={checkedAnswers[key]}
                onChange={handleChange}
              />
              <label htmlFor={key}>{value.text}</label>
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
    </section>
  );
}

export default Test;
