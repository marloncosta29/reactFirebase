import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import New from './components/New'
import firebase from './firebase'

import './App.css'
interface Props { }
interface State {
  firebaseInicialized: false;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firebaseInicialized: false
    }

  }
  componentDidMount() {
    firebase.isInicialized().then((init: any) => this.setState({ firebaseInicialized: init }))
  }
  render() {
    return (
      this.state.firebaseInicialized !== false ?
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard/new" component={New} />

          </Switch>
        </BrowserRouter>
        :
        <h1>Carregando...</h1>
    )
  }
}

