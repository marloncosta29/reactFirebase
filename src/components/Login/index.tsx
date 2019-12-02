import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase'
interface Props { }
interface State { 
  email: string,
  senha: string
}
interface Login{}
class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
   
    this.state = {
      email: '',
      senha: ''
    }
    this.login = this.login.bind(this)
  }
  login(e: any){
    e.preventDefault()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.login} id="login">
          <label>Email</label>
          <input type="email" autoComplete="off" autoFocus value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
          <label>Email</label>
          <input type="password" autoComplete="off" value={this.state.senha} onChange={e => this.setState({senha: e.target.value})}/>
          <button type="submit">Entrar</button>
          <Link to="/register">Ainda nao possui uma conta</Link>
        </form>
      </div>
    )
  }
}

export default withRouter<Login>(Login) 