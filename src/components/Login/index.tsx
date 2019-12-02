import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import firebase from '../../firebase'
import "./login.css";
interface Props extends RouteComponentProps<any> { }
interface State {
  email: string,
  senha: string
}
class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      senha: ''
    }
    this.entrar = this.entrar.bind(this)
    this.login = this.login.bind(this)
  }
  componentDidMount() {
    console.log(firebase.getCurrentUser())
    if (firebase.getCurrentUser()) {
      return this.props.history.replace('/dashboard');
    }
  }
  entrar(e: any) {
    this.login()
    e.preventDefault()
  }
  login = async () => {
    const { email, senha } = this.state
    try {
      await firebase.login(email, senha)
        .then(() => this.props.history.replace('./dashboard'))
        .catch(err => {
          console.log(err);
          if (err.code === 'auth/user-not-found') {
            alert('Usuario nao existe')
          } else {
            alert(err.code);
          }
        })
    } catch (err) {
      alert(err.message)
    }

  }
  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id="login">
          <label>Email</label>
          <input type="email" autoComplete="off" autoFocus value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <label>Email</label>
          <input type="password" autoComplete="off" value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} />
          <button type="submit">Entrar</button>
          <Link to="/register">Ainda nao possui uma conta</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Login) 