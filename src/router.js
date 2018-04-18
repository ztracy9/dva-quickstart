import React from 'react';
import Products from './routes/Products';
import { Router, Route, Switch } from 'dva/router';

import IndexPage from './routes/IndexPage';
import movieDetailPage from "./routes/MovieDetailPage";
import CinemaChoosePage from "./routes/CinemaChoosePage";
import TimePage from "./routes/TimePage";
import ChooseSeatPage from "./routes/ChooseSeatPage";
import MovieManagePage from "./routes/MovieManagePage";
import UserTable from "./components/UserTable/UserTable";
import CinemaManagePage from "./routes/CinemaManagePage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/movieDetail/:mid" exact component={movieDetailPage} />
        <Route path="/cinema/:mid" exact component={CinemaChoosePage}/>
        <Route path="/timelist/:mid/:cid" exact component={TimePage}/>
        <Route path="/chooseSeat/:tid" exact component={ChooseSeatPage}/>
        <Route path="/manage" exact component={MovieManagePage}/>
        <Route path="/user" exact component={UserTable}/>
        <Route path="/CinemaManage" exact component={CinemaManagePage}/>
      </Switch>
    </Router>
  );
}


export default RouterConfig;
