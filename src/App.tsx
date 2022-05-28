import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useStoreDispatch } from './store/hook';
import { getQuestionList } from './store/modules/questions';

import Routes from './routes';
import './App.scss';

function App() {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(getQuestionList());
  }, []);
  return (
    <div className="container mx-auto h-full">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
