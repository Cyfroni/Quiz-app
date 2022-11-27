// import { child, get, getDatabase, ref } from "firebase/database";
import _shuffle from "lodash.shuffle";
import { useEffect, useReducer, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import CheckBox from "../components/common/CheckBox";
import ToggleSwitch from "../components/common/ToggleSwitch";
import useKeyDown from "../utils/useKeyDown";
// import mockdb from "./_mockdb.json";

export async function loader() {
  // const dbRef = ref(getDatabase());
  // const snapshot = await get(child(dbRef, `questions`));
  // return Object.values(snapshot.val());

  const response = await fetch(import.meta.env.VITE_GRAPHQL_URL + "graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            query{
                questions(categoryId: 3){
                    id
                  content
                  answers
                  correctAnswer
                }
              }
            `,
    }),
  });

  const data = await response.json();

  return data.data.questions.map((q) => ({
    answers: q.answers.reduce((map, obj, ind) => {
      map["Answer " + ind] = {
        correct: !(ind % 3),
        text: obj,
      };
      return map;
    }, {}),
    question: q.content,
  }));
}

const TestStyled = styled.section`
  font-size: 2rem;
  margin-bottom: 6rem;
`;

const FooterStyled = styled.footer`
  width: 100vw;
  display: flex;
  justify-content: center;
  position: ${({ visible }) => (visible ? "absolute" : "sticky")};
  bottom: 0;
  button {
    padding: 2rem 4rem;
    margin: 0.5rem;
  }

  gap: 1rem;

  @media screen and (max-width: 800px) {
    > * {
      flex: 1;
    }
  }
`;

function Footer(props) {
  const { ref, inView, entry } = useInView({
    rootMargin: "-50px",
  });
  return (
    <>
      <FooterStyled {...props} visible={inView} />
      <div ref={ref} />
    </>
  );
}

const QuestionStyled = styled.article`
  padding: 2rem 10rem;
  margin: 0 auto;

  ul {
    padding: 5rem;
    text-align: left;
    margin-top: 1rem;
    list-style-type: none;
  }

  input {
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 800px) {
    padding: 2rem 1rem;
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

const CorrectLabelStyled = styled.label`
  color: ${({ correct, showCorrect }) =>
    showCorrect ? (correct ? "green" : "red") : "inherit"};
`;

const OptionsStyled = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultsStyled = styled.ul`
  margin: 2rem;
  list-style: none;
`;

const ResultStyled = styled.li`
  color: ${({ correct }) => (correct ? "green" : "red")};

  a {
    color: ${({ correct }) => (correct ? "green" : "red")};
    text-decoration: none;
  }
`;

function getAnswer(q) {
  return Object.entries(q?.answers || {});
}

function reducer(state, action) {
  const setQuestion = (questionNumber, randomized) => {
    return {
      questionNumber,
      randomized,
      currentQuestion: state.questions[questionNumber]?.question,
      currentAnswers: randomized
        ? state.randomizedAnswers[questionNumber]
        : getAnswer(state.questions[questionNumber]),
    };
  };

  if (action.type === "nextQuestion") {
    const questionNumber = state.questionNumber + 1;
    if (questionNumber >= state.questions.length)
      return {
        ...state,
        questionNumber: state.questions.length,
      };
    return {
      ...state,
      ...setQuestion(questionNumber, state.randomized),
    };
  } else if (action.type === "prevQuestion") {
    const questionNumber = state.questionNumber - 1;
    if (questionNumber < 0) return state;
    return {
      ...state,
      ...setQuestion(questionNumber, state.randomized),
    };
  } else if (action.type === "randomize") {
    const randomized = !state.randomized;
    return {
      ...state,
      ...setQuestion(state.questionNumber, randomized),
    };
  } else if (action.type === "setQuestion") {
    const questionNumber = action.payload;
    return {
      ...state,
      ...setQuestion(questionNumber, state.randomized),
    };
  }

  throw new Error("Unknown dispatch action");
}

function Test() {
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [finishReached, setFinishReached] = useState(false);

  const [state, dispatch] = useReducer(
    reducer,
    useLoaderData(),
    (loaderData) => ({
      questions: loaderData,
      randomizedAnswers: loaderData.map((d) => _shuffle(getAnswer(d))),

      questionNumber: 0,
      randomized: false,
      currentQuestion: loaderData[0]?.question,
      currentAnswers: getAnswer(loaderData[0]),
    })
  );

  // console.log(state);

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
    dispatch({ type: "prevQuestion" });
  };

  const next = () => {
    dispatch({ type: "nextQuestion" });
  };

  const finish = () => {
    const res = state.questions.map((q, ind) => {
      let r = true;

      getAnswer(q).forEach(([key, value]) => {
        if (value.correct !== !!checkedAnswers[ind]?.[key]) {
          r = false;
        }
      });

      return r;
    });
    setResults(res);
    setFinishReached(true);
  };

  useKeyDown("ArrowLeft", prev);
  useKeyDown("ArrowRight", next);
  useKeyDown("s", () => setShowCorrect((showCorrect) => !showCorrect));
  useKeyDown("r", () => dispatch({ type: "randomize" }));

  const { questionNumber, currentQuestion, currentAnswers, randomized } = state;
  const questionsLength = state.questions.length;

  const isFinishScreen = questionNumber >= questionsLength;

  useEffect(() => {
    if (!finishReached) setShowCorrect(false);
    if (isFinishScreen) finish();
  }, [state.questionNumber]);

  return (
    <TestStyled>
      <HeaderStyled>
        <h1>
          {isFinishScreen
            ? "The End"
            : `Question: ${questionNumber + 1} / ${questionsLength}`}
        </h1>
      </HeaderStyled>
      {isFinishScreen && (
        <ResultsStyled>
          {results.map((r, ind) => (
            <ResultStyled key={ind} correct={r}>
              <a
                href="#"
                onClick={() => {
                  dispatch({ type: "setQuestion", payload: ind });
                  setShowCorrect(true);
                }}
              >
                Question {ind + 1}: {r ? "Correct" : "Incorrect"}
              </a>
            </ResultStyled>
          ))}
        </ResultsStyled>
      )}
      {!isFinishScreen && (
        <QuestionStyled>
          <h2>{currentQuestion}</h2>

          <ul>
            {currentAnswers.map(([key, { correct, text }]) => (
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
            ))}
          </ul>
          <OptionsStyled>
            <ToggleSwitch
              checked={showCorrect}
              onChange={() => setShowCorrect((showCorrect) => !showCorrect)}
              label="Show correct answers [s]"
            />
            <ToggleSwitch
              checked={randomized}
              onChange={() => dispatch({ type: "randomize" })}
              label="Randomize answers [r]"
            />
          </OptionsStyled>
        </QuestionStyled>
      )}
      <Footer>
        <Button onClick={() => prev()} disabled={questionNumber <= 0}>
          &larr;
        </Button>
        {questionNumber < questionsLength - 1 && (
          <Button onClick={() => next()}>&rarr;</Button>
        )}
        {!finishReached && questionNumber === questionsLength - 1 && (
          <Button primary onClick={() => next()}>
            finish
          </Button>
        )}
        {!isFinishScreen && finishReached && (
          <Button
            primary
            onClick={() => {
              dispatch({ type: "setQuestion", payload: questionsLength });
              setShowCorrect(false);
            }}
          >
            Summary &gt;&gt;
          </Button>
        )}
      </Footer>
    </TestStyled>
  );
}

export default Test;
