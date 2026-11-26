
let publicacoes = [];

function publicar() {
  const nome = document.getElementById("nome").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const foto = document.getElementById("foto").value.trim();

  if (!nome || !texto) {
    alert("Preencha seu nome e sua publicação!");
    return;
  }

  publicacoes.unshift({
    nome,
    texto,
    foto,
    curtidas: 0,
    comentarios: []
  });

  document.getElementById("texto").value = "";
  document.getElementById("foto").value = "";

  mostrarFeed();
}

function mostrarFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  publicacoes.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = post.nome;

    const mensagem = document.createElement("p");
    mensagem.textContent = post.texto;

    div.appendChild(titulo);
    div.appendChild(mensagem);

    if (post.foto) {
      const imagem = document.createElement("img");
      imagem.src = post.foto;
      imagem.alt = "Imagem da publicação";
      imagem.onerror = () => imagem.remove();
      div.appendChild(imagem);
    }

    const curtidas = document.createElement("p");
    curtidas.textContent = post.curtidas + " curtidas";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "❤️ Curtir";
    botaoCurtir.onclick = () => {
      post.curtidas++;
      mostrarFeed();
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = () => {
      const comentario = prompt("Digite seu comentário:");
      if (comentario && comentario.trim()) {
        post.comentarios.push(comentario.trim());
        mostrarFeed();
      }
    };

    const listaComentarios = document.createElement("div");
    listaComentarios.className = "comentarios";

    post.comentarios.forEach(comentario => {
      const p = document.createElement("p");
      p.textContent = "💬 " + comentario;
      listaComentarios.appendChild(p);
    });

    div.appendChild(curtidas);
    div.appendChild(botaoCurtir);
    div.appendChild(botaoComentar);
    div.appendChild(listaComentarios);

    feed.appendChild(div);
  });
}
