import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndividualOrg from './IndividualOrg';
import Home from './Home';
import Orgs from './Orgs';
import Header from './Header';
import Registration from './Registration';
import Quiz from './Quiz';

function Nav() {
  return (
    <main>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/orgs" component={Orgs} />
            <Route exact path="/orgs/:org_name" component={IndividualOrg} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/quiz" component={Quiz} />
            <Route path="/" render={() => (<div>404</div>)} />
        </Switch>
    </main>
  );
}

export default Nav;
