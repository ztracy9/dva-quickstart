import React from 'react';
import Products from './routes/Products';
import { Router, Route, Switch } from 'dva/router';

import IndexPage from './routes/IndexPage';
import movieDetailPage from "./routes/MovieDetailPage";
import CinemaPage from "./routes/CinemaPage";
import TimePage from "./routes/TimePage";
import ChooseSeatPage from "./routes/ChooseSeatPage";
import CommentPage from "./routes/CommentPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/movieDetail/:mid" exact component={movieDetailPage} />
        <Route path="/cinema/:mid" exact component={CinemaPage}/>
        <Route path="/timelist/:mid/:cid" exact component={TimePage}/>
        <Route path="/chooseSeat/:cid" exact component={ChooseSeatPage}/>
        <Route path="/comment/:mid/:cid" exact component={CommentPage}/>
      </Switch>
    </Router>
  );
}


export default RouterConfig;
