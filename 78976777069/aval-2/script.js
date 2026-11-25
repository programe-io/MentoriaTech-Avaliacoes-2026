const formulario = document.querySelector("#formulario");
const feed = document.querySelector("#feed");
const mensagem = document.querySelector("#mensagem");

let corAtual = "#fff0d9";
let filtroAtual = "Todos";

const publicacoes = [];

document.querySelectorAll(".cor").forEach(botao => {

  botao.onclick = () => {

    corAtual = botao.dataset.cor;

    document.querySelectorAll(".cor").forEach(item => {
      item.classList.remove("selecionada");
    });

    botao.classList.add("selecionada");

  };

});

function atualizarEstatisticas() {

  document.querySelector("#minhas-ideias").textContent =
    publicacoes.filter(post => post.proprio).length;

  document.querySelector("#favoritos").textContent =
    publicacoes.filter(post => post.favorito).length;

}

function renderizar() {

  feed.replaceChildren();

  const lista = publicacoes.filter(post => {

    if (filtroAtual === "Todos") return true;

    if (filtroAtual === "Favoritos") {
      return post.favorito;
    }

    return post.categoria === filtroAtual;

  });

  document.querySelector("#total").textContent =
    lista.length + " ideias";

  document.querySelector("#vazio").hidden =
    lista.length > 0;

  lista.forEach(post => {

    const artigo = document.createElement("article");

    artigo.className = "post";

    artigo.style.background = post.cor;

    artigo.innerHTML = `
      <div class="autor">

        <div class="avatar"></div>

        <div>
          <strong class="nome"></strong>
          <small>Creative Space</small>
        </div>

      </div>

      <span class="tag"></span>

      <h3 class="titulo-post"></h3>

      <p class="texto-post"></p>

      <div class="acoes">
        <button class="curtir">♡ Curtir</button>
        <button class="favoritar">☆ Favoritar</button>
        <button class="comentar">💬 Comentar</button>
      </div>

      <div class="comentarios"></div>

      <form class="comentario-form" hidden>

        <input placeholder="Escreva um comentário..."
               maxlength="180"
               required>

        <button type="submit">Enviar</button>

      </form>
    `;

    artigo.querySelector(".avatar").textContent =
      post.nome[0].toUpperCase();

    artigo.querySelector(".nome").textContent =
      post.nome;

    artigo.querySelector(".tag").textContent =
      post.categoria;

    artigo.querySelector(".titulo-post").textContent =
      post.titulo;

    artigo.querySelector(".texto-post").textContent =
      post.texto;

    const curtir = artigo.querySelector(".curtir");

    const favoritar = artigo.querySelector(".favoritar");

    curtir.textContent = post.curtido
      ? "♥ " + (post.likes + 1)
      : "♡ " + post.likes;

    curtir.classList.toggle("ativo", post.curtido);

    curtir.onclick = () => {

      post.curtido = !post.curtido;

      renderizar();

    };

    favoritar.textContent = post.favorito
      ? "★ Favoritado"
      : "☆ Favoritar";

    favoritar.classList.toggle("ativo", post.favorito);

    favoritar.onclick = () => {

      post.favorito = !post.favorito;

      renderizar();

    };

    const formComentario =
      artigo.querySelector(".comentario-form");

    artigo.querySelector(".comentar").onclick = () => {

      formComentario.hidden = !formComentario.hidden;

      if (!formComentario.hidden) {
        formComentario.querySelector("input").focus();
      }

    };

    post.comentarios.forEach(texto => {

      const comentario = document.createElement("p");

      comentario.textContent = "Esmeralda: " + texto;

      artigo.querySelector(".comentarios").append(comentario);

    });

    formComentario.onsubmit = evento => {

      evento.preventDefault();

      const campo = formComentario.querySelector("input");

      const texto = campo.value.trim();

      if (!texto) return;

      post.comentarios.push(texto);

      renderizar();

    };

    if (post.proprio) {

      const excluir = document.createElement("button");

      excluir.className = "excluir";

      excluir.textContent = "Excluir";

      excluir.onclick = () => {

        const indice = publicacoes.indexOf(post);

        publicacoes.splice(indice, 1);

        renderizar();

      };

      artigo.querySelector(".acoes").append(excluir);

    }

    feed.append(artigo);

  });

  atualizarEstatisticas();

}

function adicionarPost(
  nome,
  titulo,
  texto,
  categoria,
  cor,
  proprio,
  likes = 0
) {

  publicacoes.unshift({
    nome,
    titulo,
    texto,
    categoria,
    cor,
    proprio,
    likes,
    curtido: false,
    favorito: false,
    comentarios: []
  });

  renderizar();

}

mensagem.oninput = () => {

  document.querySelector("#contador").textContent =
    mensagem.value.length + "/300";

};

formulario.onsubmit = evento => {

  evento.preventDefault();

  const titulo = document.querySelector("#titulo").value.trim();

  const texto = mensagem.value.trim();

  const categoria = document.querySelector("#categoria").value;

  if (!titulo || !texto) return;

  filtroAtual = "Todos";

  document.querySelectorAll(".filtros button").forEach(botao => {

    botao.classList.toggle(
      "ativo",
      botao.dataset.filtro === "Todos"
    );

  });

  adicionarPost(
    "Esmeralda",
    titulo,
    texto,
    categoria,
    corAtual,
    true
  );

  formulario.reset();

  document.querySelector("#contador").textContent =
    "0/300";

};

document.querySelectorAll(".filtros button").forEach(botao => {

  botao.onclick = () => {

    filtroAtual = botao.dataset.filtro;

    document.querySelectorAll(".filtros button").forEach(item => {

      item.classList.remove("ativo");

    });

    botao.classList.add("ativo");

    renderizar();

  };

});

adicionarPost(
  "Creative Studio",
  "Transforme ideias em realidade",
  "Comece anotando suas ideias em um caderno. Pequenos registros podem se transformar em grandes projetos.",
  "Inspiração",
  "#ebdff7",
  false,
  15
);

adicionarPost(
  "Esmeralda",
  "Meu primeiro projeto criativo",
  "Uma página web pode ser muito mais do que textos e imagens. Ela também pode transmitir sentimentos e personalidade.",
  "Projetos",
  "#dff2e4",
  false,
  12
);

adicionarPost(
  "Design Club",
  "Experimente novas cores",
  "Uma combinação diferente de cores pode transformar completamente a identidade visual de um projeto.",
  "Design",
  "#fbe1e7",
  false,
  21
);