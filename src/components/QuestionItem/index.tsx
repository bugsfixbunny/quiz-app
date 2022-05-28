import { Question } from '../../types';

interface Props {
  question: Question;
  current: number;
  total: number;
  setAnswer: any;
}

const QuestionItem = ({ question, current, total, setAnswer }: Props) => {
  return (
    <div className="text-2xl text-center h-full flex flex-col">
      <h1 className="font-bold pt-3">{question.category}</h1>
      <div className="grow flex flex-col items-center justify-center">
        <p
          className="mt-1/2 mx-6 py-10 px-4 border border-black"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></p>
        <p className="pt-5">
          {current + 1} of {total}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="mx-1 cursor-pointer hover:bg-gray-500 px-3 py-2 rounded-md"
          onClick={() => setAnswer(true)}
        >
          True
        </button>
        <button
          className="mx-1 cursor-pointer hover:bg-gray-500 px-3 py-2 rounded-md"
          onClick={() => setAnswer(false)}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;
