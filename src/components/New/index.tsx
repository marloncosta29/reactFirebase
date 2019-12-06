import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import firebase from '../../firebase'

import './new.css'
interface Props extends RouteComponentProps<any> { }
interface State {
    titulo: string,
    imagem: File | null,
    url: string
    descricao: string,
    alert: string
    progress: number
}

class New extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.cadastrar = this.cadastrar.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }
    componentDidMount() {
        if (!firebase.getCurrentUser()) {
            this.props.history.replace('/')
            return;
        }

    }
    async cadastrar(e: any) {
        e.preventDefault();
        const { titulo, url, imagem, descricao } = this.state
        if (titulo && imagem && url && descricao) {
            const posts = firebase.app.ref('posts')
            const chave = posts.push().key || '';
            posts.child(chave).set({
                titulo,
                imagem: url,
                descricao,
                autor: localStorage.nome
            });
            this.props.history.push('/')
        } else {
            this.setState({ alert: "Preencha todos os campos" })
        }
    }
    handleFile = async (e: any) => {
        if (e.target.files[0]) {
            const image: File = e.target.files[0];
            if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
                await this.setState({ imagem: image })
                this.handleUpload()
            } else {
                alert("Envie uma imagem em PNG, JPEG ou JPG")
                this.setState({ imagem: null });
                return
            }
        }
    }
    handleUpload = async () => {
        const { imagem } = this.state
        const currentUid = firebase.getCurrentUid()
        const uploadTask = firebase.storage.ref(`images/${currentUid}/${imagem && imagem.name}`).put(imagem!)
        await uploadTask.on('state_changed',
            snapshot => {
                //progress
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({ progress })
            },
            error => {
                console.log(error);
            },
            () => {
                //success
                firebase.storage.ref(`images/${currentUid}`)
                    .child(imagem!.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ url })
                    })
            })
    }
    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>

                <form onSubmit={this.cadastrar} id="new-form">
                    <span>{this.state.alert}</span>

                    <input type="file" onChange={this.handleFile} />
                    {this.state.url ?
                        <img src={this.state.url} alt="" width="250" height="150" />
                        :
                        <progress value={this.state.progress} />
                    }
                    <label>Titulo</label>
                    <input
                        type="text"
                        placeholder="Nome do post"
                        value={this.state.titulo}
                        onChange={e => this.setState({ titulo: e.target.value })}
                        autoFocus
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