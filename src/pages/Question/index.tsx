import { useNavigate } from 'react-router-dom';

import {
  selectQuestions,
  selectCurrent,
  setAnswer,
} from '../../store/modules/questions';
import { useStoreSelector } from '../../store/hook';
import { useStoreDispatch } from '../../store/hook';
import QuestionItem from '../../components/QuestionItem';

const Question = () => {
  const questions = useStoreSelector(selectQuestions);
  const current = useStoreSelector(selectCurrent);
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const submitAnswer = (answer: boolean) => {
    dispatch(setAnswer(answer));
    if (current + 1 === questions.length) navigate('/result');
    else navigate(`/questions/${current + 1}`);
  };

  return questions.length > current ? (
    <QuestionItem
      question={questions[current]}
      current={current}
      total={questions.length}
      setAnswer={submitAnswer}
    />
  ) : (
    <p>There is no questions.</p>
  );
};

export default Question;
