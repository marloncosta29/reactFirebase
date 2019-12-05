import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import firebase from '../../firebase'

import './new.css'
interface Props extends RouteComponentProps<any> { }
interface State {
    titulo: string,
    imagem: string,
    descricao: string
}

class New extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        }
        this.cadastrar = this.cadastrar.bind(this)
    }
    componentDidMount() {
        if (!firebase.getCurrentUser()) {
            this.props.history.replace('/')
            return;
        }
        const { titulo, imagem, descricao } = this.state
        if (titulo && imagem && descricao) {
            const posts = firebase.app.ref('posts')
            const chave = posts.push().key;



        }
    }
    cadastrar(e: any) {
        e.preventDefault();



    }
    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-form">
                    <label>Titulo</label>
                    <input
                        type="text"
                        placeholder="Nome do post"
                        value={this.state.titulo}
                        onChange={e => this.setState({ titulo: e.target.value })}
                        autoFocus
                    />
                    <label>Imagem</label>
                    <input
                        type="text"
                        placeholder="Url da imagem"
                        value={this.state.imagem}
                        onChange={e => this.setState({ imagem: e.target.value })}
                    />
                    <label>descricao</label>
                    <textarea
                        name="descricaoPost"
                        id="descricaoPost"
                        cols={30}
                        rows={10} placeholder="descrição do post"
                        value={this.state.descricao}
                        onChange={e => this.setState({ descricao: e.target.value })} />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default withRouter(New)