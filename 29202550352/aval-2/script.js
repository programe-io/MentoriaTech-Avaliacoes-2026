
const posts = [];

function criarPost(usuario, texto) {
  const post = {
    usuario: usuario,
    texto: texto,
    curtidas: 0,
    data: new Date().toLocaleString("pt-BR")
  };

  posts.unshift(post);
  mostrarFeed();
}

function curtir(index) {
  posts[index].curtidas++;
  mostrarFeed();
}

function mostrarFeed() {
  const feed = document.getElementById("feed");

  feed.innerHTML = "";

  posts.forEach((post, index) => {
    const artigo = document.createElement("article");
    artigo.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = post.usuario;

    const texto = document.createElement("p");
    texto.textContent = post.texto;

    const data = document.createElement("small");
    data.textContent = post.data;

    const botao = document.createElement("button");
    botao.textContent = `❤️ ${post.curtidas}`;
    botao.onclick = () => curtir(index);

    artigo.append(titulo, texto, data, botao);
    feed.appendChild(artigo);
  });
}
