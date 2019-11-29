import React from 'react';
import { Link } from 'react-router-dom'
import './header.css'
interface Props { }
interface State { }
export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <header id="main-header">
        <div className="header-content">
          <Link to="/">Blog</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    )
  }
}

