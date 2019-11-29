import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'

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
          </Switch>
        </BrowserRouter>
        :
        <h1>Carregando...</h1>
    )
  }
}

