import React from 'react';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'
import firebase from '../../firebase'
import './dashboard.css'

interface Props  extends RouteComponentProps<any> { }
interface State {
  nome:string
  email:string
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: localStorage.nome,
      email: localStorage.email
    }
    this.logout = this.logout.bind(this)
  }
  async componentDidMount(){
    if(!firebase.getCurrentUser()){
      this.props.history.replace('/login')
      return;
    }
    firebase.getUserName((info:any) => {
      localStorage.nome = info.val().nome
      this.setState({nome: localStorage.nome})
    })
    const email = await firebase.getCurrentUser() || ''
    localStorage.email = email
    this.setState({email: email})
  }

  logout = async() => {
    await firebase.logout()
    .then(() => localStorage.removeItem('nome'))
    .then(()=> this.props.history.push('/'))
    .catch(error => {
      console.log(error);
    })
  }
  render() {
    return (
      <div id="dashboard">
        <div className="user-info">
          <h1>{this.state.nome}</h1>
          <Link to="/dashboard/new">Novo Post</Link>
        </div>
        <p>Logado com {this.state.email}</p>
        <button onClick={() => this.logout()}>Sair</button>
      </div>
    )
  }
}

export default withRouter(Dashboard)