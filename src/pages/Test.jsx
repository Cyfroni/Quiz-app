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
import styled from "styled-components";
import Button from "../common/Button";
import CheckBox from "../common/CheckBox";

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

const TestStyled = styled.section`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 10rem 0;
  /* margin-top: 10rem; */
  max-width: 80rem;

  font-size: 2rem;

  footer {
    align-self: center;
  }
`;

const FooterStyled = styled.footer`
  margin-top: 5rem;
  button {
    padding: 2rem 4rem;
    margin: 0.5rem;
  }
`;

const QuestionStyled = styled.article`
  margin-top: 2rem;

  ul {
    margin-top: 1rem;
    list-style-type: none;
  }

  input {
    margin-right: 0.5rem;
  }
`;

function Test() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [results, setResults] = useState([]);

  // const questions = QUESTIONS
  const questions = useLoaderData();

  const question = questions[questionNumber];

  const handleChange = (key, checked) => {
    setCheckedAnswers((answs) => ({
      ...answs,
      [questionNumber]: {
        ...answs[questionNumber],
        [key]: checked,
      },
    }));
  };

  // console.log(checkedAnswers);

  const prev = () => {
    setResults([]);
    setQuestionNumber((q) => q - 1);
  };

  const next = () => {
    // console.log(question?.answers);
    // console.log(checkedAnswers);

    // let correct = 0;
    // let incorrect = 0;

    // console.log(Object.entries(question?.answers).forEach([key, {correct}] => )

    setQuestionNumber((q) => q + 1);
  };

  const finish = () => {
    // console.log(checkedAnswers);
    const res = questions.map((q, ind) => {
      // console.log("#result " + ind);
      // console.log(q?.answers);
      // console.log(checkedAnswers[ind]);
      // console.log("###");
      let r = true;
      Object.entries(q?.answers).forEach(([key, value]) => {
        if (value.correct !== !!checkedAnswers[ind]?.[key]) {
          // console.log(value.correct);
          // console.log(checkedAnswers[ind]?.[key]);
          r = false;
        }
      });

      return r;
    });
    setResults(res);
  };

  // console.log("**");
  // console.log(questions);
  // console.log(checkedAnswers);
  // console.log("//");

  return (
    <TestStyled>
      <h1>
        {questionNumber < questions.length
          ? `Question: ${questionNumber + 1} / ${questions.length}`
          : "The End"}
      </h1>
      <ul>
        {results.map((r, ind) => (
          <li key={ind}>
            Question {ind}: {r ? "Correct" : "Incorrect"}
          </li>
        ))}
      </ul>
      <QuestionStyled>
        <h2>{question?.question}</h2>
        <ul>
          {Object.entries(question?.answers || {}).map(([key, value]) => (
            <li key={key + questionNumber}>
              <CheckBox
                id={key + questionNumber}
                name={key + questionNumber}
                value={checkedAnswers[questionNumber]?.[key] || ""}
                checked={checkedAnswers[questionNumber]?.[key] || ""}
                onChange={(e) => handleChange(key, e.target.checked)}
              />
              <label htmlFor={key}>{value.text}</label>
            </li>
          ))}
        </ul>
      </QuestionStyled>
      <FooterStyled>
        <Button onClick={() => prev()} disabled={questionNumber <= 0}>
          &larr;
        </Button>
        {questionNumber !== questions.length && (
          <Button
            onClick={() => next()}
            disabled={questionNumber >= questions.length}
          >
            &rarr;
          </Button>
        )}
        {questionNumber === questions.length && (
          <Button onClick={() => finish()}>finish</Button>
        )}
      </FooterStyled>
    </TestStyled>
  );
}

export default Test;
