import { Routes as Switch, Route } from 'react-router-dom';

import Layout from './layouts';
import Home from './pages/Home';
import Result from './pages/Result';
import Question from './pages/Question';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/result" element={<Result />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/*" element={<Home />} />
      </Switch>
    </Layout>
  );
};

export default Routes;
