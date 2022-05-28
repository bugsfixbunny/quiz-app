import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  selectQuestions,
  selectAnswers,
  selectScore,
  selectCurrent,
  resetAnswer,
} from '../../store/modules/questions';
import { useStoreSelector } from '../../store/hook';
import { useStoreDispatch } from '../../store/hook';
import ResultItem from '../../components/ResultItem';

const Result = () => {
  const dispatch = useStoreDispatch();
  const questions = useStoreSelector(selectQuestions);
  const answers = useStoreSelector(selectAnswers);
  const score = useStoreSelector(selectScore);
  const current = useStoreSelector(selectCurrent);
  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length && questions.length !== current) {
      navigate(`/questions/${current}`);
    }
  }, [questions, current, navigate]);

  const reset = () => {
    dispatch(resetAnswer());
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-3">You scored</h1>
      <p className="text-center mt-2 font-bold text-2xl mb-8">
        {' '}
        {score} / {questions.length}
      </p>
      {questions.map((question, index) => {
        return (
          <ResultItem
            key={`answer-${index}`}
            question={question}
            answer={answers[index]}
          />
        );
      })}
      <div className="w-full flex items-center justify-center mt-16 mb-8">
        <Link to="/" className="text-center text-3xl mx-auto" onClick={reset}>
          PLAY AGAIN?
        </Link>
      </div>
    </div>
  );
};

export default Result;
