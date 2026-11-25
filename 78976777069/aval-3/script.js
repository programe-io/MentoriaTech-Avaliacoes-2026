const publicacoes = [
  {
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000",
    categoria: "Confeitaria",
    legenda: "Pequenos momentos merecem grandes sabores. 🍰",
    likes: 92,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1000",
    categoria: "Cupcakes",
    legenda: "Uma dose de criatividade e muita doçura. 🧁",
    likes: 134,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000",
    categoria: "Cafeteria",
    legenda: "Uma pausa para apreciar as pequenas coisas. ☕",
    likes: 78,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000",
    categoria: "Sobremesas",
    legenda: "Deixando o dia um pouco mais doce.",
    likes: 116,
    curtido: false,
    salvo: false,
    comentarios: []
  }
];

const feed = document.querySelector("#feed");

const modalStory = document.querySelector("#modal-story");

const modalPublicacao =
  document.querySelector("#modal-publicacao");

let modo = "feed";

let pesquisa = "";

function abrirImagem(titulo, imagem) {

  document.querySelector("#story-titulo").textContent =
    titulo;

  document.querySelector("#story-imagem").src =
    imagem;

  modalStory.showModal();

}

function renderizar() {

  feed.replaceChildren();

  feed.classList.toggle("galeria", modo === "galeria");

  document.querySelector("#total-posts").textContent =
    publicacoes.length;

  const lista = publicacoes.filter(post => {

    const texto = (
      "esmeralda.sweet " +
      post.categoria + " " +
      post.legenda
    ).toLowerCase();

    return texto.includes(pesquisa) &&
      (modo !== "salvos" || post.salvo);

  });

  document.querySelector("#vazio").hidden =
    lista.length > 0;

  lista.forEach(post => {

    const artigo = document.createElement("article");

    artigo.className = "post";

    artigo.innerHTML = `
      <div class="post-topo">

        <div class="avatar">E</div>

        <div>
          <strong>esmeralda.sweet</strong>
          <small class="categoria"></small>
        </div>

      </div>

      <img class="foto" alt="Fotografia da publicação">

      <div class="conteudo">

        <div class="acoes">

          <button class="curtir"
            aria-label="Curtir">♡</button>

          <button class="comentar"
            aria-label="Comentar">💬</button>

          <button class="salvar"
            aria-label="Salvar">♧</button>

        </div>

        <strong class="likes"></strong>

        <p class="legenda"></p>

        <div class="comentarios"></div>

        <form class="comentario-form">

          <input placeholder="Adicione um comentário..."
                 maxlength="180"
                 required>

          <button type="submit">Publicar</button>

        </form>

      </div>
    `;

    artigo.querySelector(".categoria").textContent =
      post.categoria;

    artigo.querySelector(".foto").src =
      post.imagem;

    artigo.querySelector(".legenda").textContent =
      "esmeralda.sweet — " + post.legenda;

    const curtir = artigo.querySelector(".curtir");

    const salvar = artigo.querySelector(".salvar");

    function atualizar() {

      curtir.textContent = post.curtido ? "♥" : "♡";

      curtir.classList.toggle("ativo", post.curtido);

      curtir.setAttribute(
        "aria-pressed",
        String(post.curtido)
      );

      artigo.querySelector(".likes").textContent =
        (post.likes + Number(post.curtido)) + " curtidas";

      salvar.textContent = post.salvo ? "🔖" : "♧";

      salvar.setAttribute(
        "aria-pressed",
        String(post.salvo)
      );

    }

    curtir.onclick = () => {

      post.curtido = !post.curtido;

      atualizar();

    };

    artigo.querySelector(".foto").ondblclick = () => {

      post.curtido = true;

      atualizar();

    };

    artigo.querySelector(".foto").onclick = () => {

      if (modo === "galeria") {

        abrirImagem(post.categoria, post.imagem);

      }

    };

    salvar.onclick = () => {

      post.salvo = !post.salvo;

      atualizar();

      if (modo === "salvos") {
        renderizar();
      }

    };

    const form = artigo.querySelector(".comentario-form");

    const campo = form.querySelector("input");

    artigo.querySelector(".comentar").onclick = () => {

      campo.focus();

    };

    function mostrarComentarios() {

      const area = artigo.querySelector(".comentarios");

      area.replaceChildren();

      post.comentarios.forEach(texto => {

        const comentario = document.createElement("p");

        const nome = document.createElement("strong");

        nome.textContent = "esmeralda.sweet ";

        comentario.append(
          nome,
          document.createTextNode(texto)
        );

        area.append(comentario);

      });

    }

    form.onsubmit = evento => {

      evento.preventDefault();

      const texto = campo.value.trim();

      if (!texto) return;

      post.comentarios.push(texto);

      mostrarComentarios();

      form.reset();

    };

    atualizar();

    mostrarComentarios();

    feed.append(artigo);

  });

}

// Alternar entre feed, galeria e favoritos.

function alterarModo(novoModo) {

  modo = novoModo;

  document.querySelectorAll(".abas button").forEach(botao => {

    botao.classList.remove("ativo");

  });

  document.querySelector("#aba-" + modo)
    .classList.add("ativo");

  renderizar();

}

document.querySelector("#aba-feed").onclick = () => {
  alterarModo("feed");
};

document.querySelector("#aba-galeria").onclick = () => {
  alterarModo("galeria");
};

document.querySelector("#aba-salvos").onclick = () => {
  alterarModo("salvos");
};

function alternarSalvos() {

  alterarModo(modo === "salvos" ? "feed" : "salvos");

}

document.querySelector("#ver-salvos").onclick =
  alternarSalvos;

document.querySelector("#salvos-mobile").onclick =
  alternarSalvos;

// Pesquisa.

document.querySelector("#pesquisa").oninput = evento => {

  pesquisa = evento.target.value.toLowerCase().trim();

  renderizar();

};

// Stories.

document.querySelectorAll(".story").forEach(story => {

  story.onclick = () => {

    abrirImagem(
      story.dataset.titulo,
      story.dataset.foto
    );

  };

});

document.querySelector("#fechar-story").onclick = () => {

  modalStory.close();

};

// Sistema de seguidores.

let seguindoPerfil = false;

document.querySelector("#seguir-perfil").onclick = evento => {

  seguindoPerfil = !seguindoPerfil;

  evento.currentTarget.textContent =
    seguindoPerfil ? "Seguindo" : "Seguir";

  evento.currentTarget.classList.toggle(
    "seguindo",
    seguindoPerfil
  );

  document.querySelector("#seguidores").textContent =
    seguindoPerfil ? 187 : 186;

};

document.querySelectorAll(".seguir").forEach(botao => {

  let seguindo = false;

  botao.onclick = () => {

    seguindo = !seguindo;

    botao.textContent =
      seguindo ? "Seguindo" : "Seguir";

  };

});

// Criar novas publicações.

function abrirPublicacao() {

  document.querySelector("#aviso").textContent = "";

  modalPublicacao.showModal();

}

document.querySelector("#nova-publicacao").onclick =
  abrirPublicacao;

document.querySelector("#publicar-mobile").onclick =
  abrirPublicacao;

document.querySelector("#fechar-publicacao").onclick = () => {

  modalPublicacao.close();

};

document.querySelector("#form-publicacao").onsubmit = evento => {

  evento.preventDefault();

  const formulario = evento.currentTarget;

  const endereco =
    document.querySelector("#url-foto").value.trim();

  const legenda =
    document.querySelector("#legenda").value.trim();

  const aviso = document.querySelector("#aviso");

  if (!legenda) return;

  let url;

  try {

    url = new URL(endereco);

    if (url.protocol !== "https:") {

      throw new Error("Endereço inválido");

    }

  } catch {

    aviso.textContent =
      "Informe um endereço de imagem HTTPS válido.";

    return;

  }

  const imagemTeste = new Image();

  const botao = formulario.querySelector(
    "button[type='submit']"
  );

  botao.disabled = true;

  aviso.textContent = "Verificando imagem...";

  imagemTeste.onload = () => {

    publicacoes.unshift({
      imagem: url.href,
      categoria: "Nova publicação",
      legenda,
      likes: 0,
      curtido: false,
      salvo: false,
      comentarios: []
    });

    formulario.reset();

    botao.disabled = false;

    modalPublicacao.close();

    pesquisa = "";

    document.querySelector("#pesquisa").value = "";

    alterarModo("feed");

  };

  imagemTeste.onerror = () => {

    aviso.textContent =
      "Não foi possível carregar a imagem. Tente outro link.";

    botao.disabled = false;

  };

  imagemTeste.src = url.href;

};

renderizar();