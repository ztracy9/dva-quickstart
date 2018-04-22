import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import movieDetailPage from "./routes/MovieDetailPage";
import CinemaChoosePage from "./routes/CinemaChoosePage";
import TimePage from "./routes/TimePage";
import ChooseSeatPage from "./routes/ChooseSeatPage";
import HomePage from './routes/HomePage';
import Privacy from './routes/Privacy';
import Movie from './routes/Movie';
import Register from './routes/Register';
import Management from './routes/Management';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/movie" component={Movie} />
        <Route path="/register" component={Register} />
        <Route path="/manage" component={Management} />

        <Route path="/movieDetail/:mid" exact component={movieDetailPage} />
        <Route path="/cinema/:mid" exact component={CinemaChoosePage}/>
        <Route path="/timelist/:mid/:cid" exact component={TimePage}/>
        <Route path="/chooseSeat/:tid" exact component={ChooseSeatPage}/>
      </Switch>
    </Router>
  );
}


export default RouterConfig;
