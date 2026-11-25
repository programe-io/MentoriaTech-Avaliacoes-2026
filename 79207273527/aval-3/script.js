const publicacoes = [
  {
    usuario: "antonio.pedro",
    local: "Explore • Montanhas",
    imagem: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000",
    legenda: "O mundo é maior do que imaginamos. 🏔️",
    likes: 128,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "antonio.pedro",
    local: "Explore • Natureza",
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000",
    legenda: "Um pouco de tranquilidade em meio à natureza. 🌿",
    likes: 94,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "antonio.pedro",
    local: "Explore • Paisagens",
    imagem: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
    legenda: "Sempre existe um novo lugar para descobrir.",
    likes: 156,
    curtido: false,
    salvo: false,
    comentarios: []
  }
];

const feed = document.querySelector("#feed");
let somenteSalvos = false;
let pesquisa = "";

function renderizar() {
  feed.replaceChildren();

  const filtrados = publicacoes.filter(post => {
    const texto =
      (post.usuario + " " + post.local + " " + post.legenda)
      .toLowerCase();

    return texto.includes(pesquisa) &&
      (!somenteSalvos || post.salvo);
  });

  document.querySelector("#vazio").hidden =
    filtrados.length > 0;

  filtrados.forEach(post => {
    const artigo = document.createElement("article");
    artigo.className = "post";

    artigo.innerHTML = `
      <div class="post-topo">
        <div class="avatar">AP</div>

        <div>
          <strong class="usuario"></strong>
          <small class="local"></small>
        </div>

        <span class="ml-auto">•••</span>
      </div>

      <img class="foto" alt="Fotografia de paisagem">

      <div class="post-conteudo">
        <div class="acoes">
          <button class="curtir" aria-label="Curtir">♡</button>
          <button class="comentar" aria-label="Comentar">♧</button>
          <button class="salvar" aria-label="Salvar">♧</button>
        </div>

        <strong class="quantidade"></strong>

        <p class="legenda"></p>

        <div class="comentarios"></div>

        <form>
          <input placeholder="Adicione um comentário..."
                 maxlength="200" required>
          <button type="submit">Publicar</button>
        </form>
      </div>
    `;

    artigo.querySelector(".usuario").textContent =
      post.usuario;

    artigo.querySelector(".local").textContent =
      post.local;

    artigo.querySelector(".foto").src =
      post.imagem;

    artigo.querySelector(".legenda").textContent =
      post.usuario + " — " + post.legenda;

    const botaoCurtir = artigo.querySelector(".curtir");
    const botaoSalvar = artigo.querySelector(".salvar");

    function atualizarCurtidas() {
      botaoCurtir.textContent =
        post.curtido ? "♥" : "♡";

      botaoCurtir.classList.toggle("ativo", post.curtido);

      botaoCurtir.setAttribute(
        "aria-pressed",
        String(post.curtido)
      );

      artigo.querySelector(".quantidade").textContent =
        (post.likes + Number(post.curtido)) + " curtidas";
    }

    function atualizarSalvo() {
      botaoSalvar.textContent = post.salvo ? "🔖" : "♧";

      botaoSalvar.classList.toggle("ativo", post.salvo);

      botaoSalvar.setAttribute(
        "aria-pressed",
        String(post.salvo)
      );
    }

    function atualizarComentarios() {
      const area = artigo.querySelector(".comentarios");

      area.replaceChildren();

      post.comentarios.forEach(texto => {
        const comentario = document.createElement("p");
        const nome = document.createElement("strong");

        nome.textContent = "antonio.pedro ";

        comentario.append(nome, document.createTextNode(texto));

        area.appendChild(comentario);
      });
    }

    botaoCurtir.onclick = () => {
      post.curtido = !post.curtido;
      atualizarCurtidas();
    };

    artigo.querySelector(".foto").ondblclick = () => {
      post.curtido = true;
      atualizarCurtidas();
    };

    botaoSalvar.onclick = () => {
      post.salvo = !post.salvo;
      atualizarSalvo();

      if (somenteSalvos) renderizar();
    };

    const form = artigo.querySelector("form");
    const campo = form.querySelector("input");

    artigo.querySelector(".comentar").onclick = () => {
      campo.focus();
    };

    form.onsubmit = evento => {
      evento.preventDefault();

      const texto = campo.value.trim();

      if (!texto) return;

      post.comentarios.push(texto);

      atualizarComentarios();
      form.reset();
    };

    atualizarCurtidas();
    atualizarSalvo();
    atualizarComentarios();

    feed.appendChild(artigo);
  });
}

// Pesquisa de publicações.
document.querySelector("#pesquisa").oninput = evento => {
  pesquisa = evento.target.value.toLowerCase().trim();
  renderizar();
};

// Exibir somente publicações salvas.
document.querySelector("#ver-salvos").onclick = evento => {
  somenteSalvos = !somenteSalvos;

  evento.currentTarget.textContent =
    somenteSalvos ? "▤" : "🔖";

  evento.currentTarget.title =
    somenteSalvos ? "Mostrar todas" : "Publicações salvas";

  renderizar();
};

// Stories.
const modal = document.querySelector("#modal-story");

document.querySelectorAll(".story").forEach(story => {
  story.onclick = () => {
    document.querySelector("#story-titulo").textContent =
      story.dataset.titulo;

    document.querySelector("#story-imagem").src =
      story.dataset.imagem;

    modal.showModal();
  };
});

document.querySelector("#fechar-story").onclick = () => {
  modal.close();
};

modal.addEventListener("click", evento => {
  if (evento.target === modal) {
    modal.close();
  }
});

// Seguir perfis.
document.querySelectorAll(".seguir").forEach(botao => {
  let seguindo = false;

  botao.onclick = () => {
    seguindo = !seguindo;

    botao.textContent = seguindo ? "Seguindo" : "Seguir";

    botao.style.color = seguindo ? "#899189" : "#315c49";
  };
});

renderizar();