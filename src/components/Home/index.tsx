import React from 'react';
import firebase from '../../firebase'
import './home.css'
interface Post {
  key: string,
  descricao: string,
  imagem: string,
  titulo: string,
  autor: string
}
interface Props { }
interface State {
  posts: Post[]
}
export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    firebase.app.ref('posts').on('value', snapshot => {
      const posts: Post[] = []

      snapshot.forEach(childItem => {
        posts.push({
          key: childItem.key || '',
          titulo: childItem.val().titulo,
          imagem: childItem.val().imagem,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor
        })
      })

      this.setState({ posts: posts.reverse() })

    })
  }

  render() {
    return (
      <section id="post">
        {this.state.posts.map(post => {
          return (
            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>{post.autor}</span>
                </div>
              </header>
              <img src={post.imagem} alt="capa" />
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>
          )
        })}
      </section>
    )
  }
}

