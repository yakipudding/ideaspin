import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import IdeaDetail from './components/ideas/IdeaDetail/IdeaDetail'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateIdea from './components/ideas/CreateIdea/CreateIdea'
import EditIdea from './components/ideas/EditIdea/EditIdea'
import CreateItem from './components/ideas/CreateItem/CreateItem'
import requireAuth from "./components/auth/requireAuth";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={requireAuth(Dashboard)} />
            <Route path='/idea/:id' component={requireAuth(IdeaDetail)} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={requireAuth(CreateIdea)} />
            <Route path='/editidea/:id' component={requireAuth(EditIdea)} />
            <Route path='/createitem/:id' component={requireAuth(CreateItem)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
