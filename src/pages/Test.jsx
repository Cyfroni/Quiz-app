import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
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
  flex: 1;
  display: flex;
  flex-direction: column;

  font-size: 2rem;

  footer {
    align-self: center;
  }
`;

const FooterStyled = styled.footer`
  margin-top: auto;
  position: sticky;
  bottom: 3rem;
  button {
    padding: 2rem 4rem;
    margin: 0.5rem;
  }
`;

const QuestionStyled = styled.article`
  padding: 0 10rem;
  margin: 2rem auto;
  text-align: center;

  ul {
    padding: 5rem;
    text-align: left;
    margin-top: 1rem;
    list-style-type: none;
  }

  input {
    margin-right: 0.5rem;
  }
`;

const HeaderStyled = styled.header`
  display: flex;

  h1 {
    color: ${({ theme }) => theme.colors.main_lighter};
  }

  box-shadow: 0px 0px 2px #555;
  padding: 1rem;
`;

const FinishButtonStyled = styled(Button)`
  margin-left: auto;
`;

const CorrectLabelStyled = styled.label`
  color: ${({ correct, showCorrect }) =>
    showCorrect ? (correct ? "green" : "red") : "inherit"};
`;

function Test() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);

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

  const prev = () => {
    setQuestionNumber((q) => (q === 0 ? 0 : q - 1));
  };

  const next = () => {
    setQuestionNumber((q) => (q === questions.length ? q : q + 1));
  };

  useEffect(() => {
    const leftArrowListener = ({ key }) => key === "ArrowLeft" && prev();
    const rightArrowListener = ({ key }) => key === "ArrowRight" && next();
    window.addEventListener("keydown", leftArrowListener);
    window.addEventListener("keydown", rightArrowListener);
    return () => {
      window.removeEventListener("keydown", leftArrowListener);
      window.removeEventListener("keydown", rightArrowListener);
    };
  }, [prev, next]);

  useEffect(() => {
    setResults([]);
    setShowCorrect(false);
    if (questionNumber === questions.length) {
      finish();
    }
  }, [questionNumber]);

  const finish = () => {
    const res = questions.map((q, ind) => {
      let r = true;
      Object.entries(q?.answers).forEach(([key, value]) => {
        if (value.correct !== !!checkedAnswers[ind]?.[key]) {
          r = false;
        }
      });

      return r;
    });
    setResults(res);
  };

  const isFinishScreen = questionNumber >= questions.length;

  return (
    <TestStyled>
      <HeaderStyled>
        <h1>
          {isFinishScreen
            ? "The End"
            : `Question: ${questionNumber + 1} / ${questions.length}`}
        </h1>
        {!isFinishScreen && (
          <FinishButtonStyled
            onClick={() => setShowCorrect((showCorrect) => !showCorrect)}
          >
            Show Correct Answers
          </FinishButtonStyled>
        )}
      </HeaderStyled>
      {isFinishScreen && (
        <ul>
          {results.map((r, ind) => (
            <li key={ind}>
              Question {ind}: {r ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
      )}
      <QuestionStyled>
        <h2>{question?.question}</h2>

        <ul>
          {Object.entries(question?.answers || {}).map(
            ([key, { correct, text }]) => (
              <li key={key + questionNumber}>
                <CheckBox
                  id={key + questionNumber}
                  name={key + questionNumber}
                  value={checkedAnswers[questionNumber]?.[key] || ""}
                  checked={checkedAnswers[questionNumber]?.[key] || ""}
                  onChange={(e) => handleChange(key, e.target.checked)}
                />
                <CorrectLabelStyled
                  htmlFor={key}
                  correct={correct}
                  showCorrect={showCorrect}
                >
                  {text}
                </CorrectLabelStyled>
              </li>
            )
          )}
        </ul>
      </QuestionStyled>
      <FooterStyled>
        <Button onClick={() => prev()} disabled={questionNumber <= 0}>
          &larr;
        </Button>
        {questionNumber < questions.length - 1 && (
          <Button onClick={() => next()}>&rarr;</Button>
        )}
        {questionNumber === questions.length - 1 && (
          <Button primary onClick={() => next()}>
            finish
          </Button>
        )}
      </FooterStyled>
    </TestStyled>
  );
}

export default Test;
