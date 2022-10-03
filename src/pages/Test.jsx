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
  margin-top: 10rem;
  max-width: 60rem;

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
    <TestStyled>
      <h1>Question: {questionNumber + 1}</h1>
      <QuestionStyled>
        <h2>{question?.question}</h2>
        <ul>
          {Object.entries(question?.answers || {}).map(([key, value]) => (
            <li key={key}>
              <CheckBox
                id={key}
                name={key}
                value={checkedAnswers[key]}
                onChange={handleChange}
              />
              <label htmlFor={key}>{value.text}</label>
            </li>
          ))}
        </ul>
      </QuestionStyled>
      <FooterStyled>
        <Button
          onClick={() => setQuestionNumber((q) => q - 1)}
          disabled={questionNumber <= 0}
        >
          &larr;
        </Button>
        <Button
          onClick={() => next()}
          disabled={questionNumber >= questions.length}
        >
          &rarr;
        </Button>
        {/* {questionNumber === questions.length && <button>finish</button>} */}
      </FooterStyled>
    </TestStyled>
  );
}

export default Test;
