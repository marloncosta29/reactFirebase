import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import firebase from '../../firebase'
import './register.css'
interface Props extends RouteComponentProps<any> { }
interface State {
  nome: string
  email: string
  senha: string
}
class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      senha: ''
    }
    this.register = this.register.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }
  register(e: any) {
    e.preventDefault()
    this.onRegister()
  }
  onRegister = async() => {
    try {
      await firebase.registrar(this.state.email, this.state.senha, this.state.nome)
      this.props.history.replace('/dashboard')
    } catch (error) {
      alert(error.message);      
    }

  }
  render() {
    return (
      <div>
        <h1 className="register-h1">Novo Usuario</h1>
        <form onSubmit={this.register} id="register">
          <label>Nome</label>
          <input type="text" value={this.state.nome} autoFocus autoComplete="off" onChange={e => this.setState({ nome: e.target.value })} />
          <label>Email</label>
          <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <label>Senha</label>
          <input type="password" value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Register) 