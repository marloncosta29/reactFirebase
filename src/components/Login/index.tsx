import React from 'react';
import './App.css'

interface Props { }
interface State { }
export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <div>
        <h1>Login</h1>
      </div>
    )
  }
}

