import { Question } from '../../types';

interface Props {
  question: Question;
  answer: boolean;
}

const ResultItem = ({ question, answer }: Props) => {
  const correct_answer = question.correct_answer === 'True';
  return (
    <div className="flex text-2xl mx-4 my-3">
      <span className="mr-3">{correct_answer === answer ? '+' : '-'}</span>
      <p dangerouslySetInnerHTML={{ __html: question.question }} />
    </div>
  );
};

export default ResultItem;
