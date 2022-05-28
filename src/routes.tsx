import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Result from './pages/Result';
import Question from './pages/Question';

const Routes = () => {
  return (
    <Switch>
      <Route path="/result" element={<Result />} />
      <Route path="/questions/:id" element={<Question />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default Routes;
