import { Link } from 'react-router-dom';

import { useStoreSelector } from '../../store/hook';
import { selectQuestions, selectCurrent } from '../../store/modules/questions';

const Home = () => {
  const questions = useStoreSelector(selectQuestions);
  const current = useStoreSelector(selectCurrent);

  return (
    <div className="flex flex-col items-center justify-between h-full text-2xl">
      <h1 className="font-bold mt-3">
        Weclome to the
        <br />
        Triva Challenge!
      </h1>
      <p className="text-center pt-4 w-80 mx-auto">
        You will be presented with {questions.length} True or False questions
      </p>
      <p>Can you score 100%</p>
      <Link
        to={current === questions.length ? '/result' : '/questions/' + current}
        className="mb-3 cursor-pointer hover:bg-gray-500 px-3 py-2 rounded-md"
      >
        BEGIN
      </Link>
    </div>
  );
};

export default Home;
