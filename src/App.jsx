import "./App.css";

// import { getDatabase, set, ref, get, child } from "firebase/database";
import { useState } from "react";

const QUESTIONS = [
  {
    question: "What is love?",
    answers: ["love", "hurt me", "baby dont hurt me"],
    correct: [2],
  },
  {
    question: "Is dollar expensive?",
    answers: ["yes", "no", "very"],
    correct: [0, 2],
  },
];

function App() {
  const [question, setQuestion] = useState(0);
  const q = QUESTIONS[question];

  return (
    <div className="App">
      <article>
        <p>{q.question}</p>
        <ul>
          {q.answers.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </article>
      <button
        onClick={() => setQuestion((q) => q - 1)}
        disabled={question <= 0}
      >
        &larr;
      </button>
      <button
        onClick={() => setQuestion((q) => q + 1)}
        disabled={question >= QUESTIONS.length - 1}
      >
        &rarr;
      </button>
    </div>
  );
}

export default App;
