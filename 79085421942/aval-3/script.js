const publicacoes = [
  {
    usuario: "david.rafael",
    local: "Wildlife • Felinos",
    imagem: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1000",
    legenda: "A imponência dos grandes felinos. 🦁",
    likes: 86,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "david.rafael",
    local: "Wildlife • Elefantes",
    imagem: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1000",
    legenda: "Gigantes da natureza que merecem nossa proteção. 🐘",
    likes: 134,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "david.rafael",
    local: "Wildlife • Floresta",
    imagem: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1000",
    legenda: "Cada animal possui seu próprio papel na natureza. 🦊",
    likes: 102,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "david.rafael",
    local: "Wildlife • Natureza",
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000",
    legenda: "Preservar as florestas é preservar a vida. 🌿",
    likes: 98,
    curtido: false,
    salvo: false,
    comentarios: []
  }
];

const feed = document.querySelector("#feed");
const modal = document.querySelector("#modal");

let somenteSalvos = false;
let pesquisa = "";
let galeria = false;

function abrirImagem(nome, imagem) {

  document.querySelector("#modal-nome").textContent =
    nome;

  document.querySelector("#modal-imagem").src =
    imagem;

  modal.showModal();

}

function renderizar() {

  feed.replaceChildren();

  feed.classList.toggle("galeria", galeria);

  const lista = publicacoes.filter(post => {

    const texto = (
      post.usuario + " " +
      post.local + " " +
      post.legenda
    ).toLowerCase();

    return texto.includes(pesquisa) &&
      (!somenteSalvos || post.salvo);

  });

  document.querySelector("#vazio").hidden =
    lista.length > 0;

  lista.forEach(post => {

    const artigo = document.createElement("article");

    artigo.className = "post";

    artigo.innerHTML = `
      <div class="post-topo">

        <div class="avatar">DR</div>

        <div>
          <strong class="nome"></strong>
          <small class="local"></small>
        </div>

        <span class="ml-auto">•••</span>

      </div>

      <img class="foto" alt="Fotografia de natureza">

      <div class="conteudo">

        <div class="acoes">

          <button class="curtir" aria-label="Curtir">
            ♡
          </button>

          <button class="comentar" aria-label="Comentar">
            💬
          </button>

          <button class="salvar" aria-label="Salvar">
            ♧
          </button>

        </div>

        <strong class="quantidade"></strong>

        <p class="legenda"></p>

        <div class="comentarios"></div>

        <form>

          <input placeholder="Adicione um comentário..."
                 maxlength="180"
                 required>

          <button type="submit">Publicar</button>

        </form>

      </div>
    `;

    artigo.querySelector(".nome").textContent =
      post.usuario;

    artigo.querySelector(".local").textContent =
      post.local;

    artigo.querySelector(".foto").src =
      post.imagem;

    artigo.querySelector(".legenda").textContent =
      post.usuario + " — " + post.legenda;

    const curtir = artigo.querySelector(".curtir");
    const salvar = artigo.querySelector(".salvar");
    const foto = artigo.querySelector(".foto");

    function atualizar() {

      curtir.textContent = post.curtido ? "♥" : "♡";

      curtir.classList.toggle("ativo", post.curtido);

      curtir.setAttribute(
        "aria-pressed",
        String(post.curtido)
      );

      artigo.querySelector(".quantidade").textContent =
        (post.likes + Number(post.curtido)) +
        " curtidas";

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

    foto.onclick = () => {

      if (galeria) {
        abrirImagem(post.local, post.imagem);
      }

    };

    foto.ondblclick = () => {

      if (!galeria) {

        post.curtido = true;

        atualizar();

      }

    };

    salvar.onclick = () => {

      post.salvo = !post.salvo;

      atualizar();

      if (somenteSalvos) {
        renderizar();
      }

    };

    const form = artigo.querySelector("form");
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

        nome.textContent = "david.rafael ";

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

// Pesquisa.

document.querySelector("#pesquisa").oninput = evento => {

  pesquisa = evento.target.value.toLowerCase().trim();

  renderizar();

};

// Publicações salvas.

function alternarSalvos() {

  somenteSalvos = !somenteSalvos;

  document.querySelector("#ver-salvos").textContent =
    somenteSalvos ? "▤" : "🔖";

  document.querySelector("#salvos-mobile").textContent =
    somenteSalvos ? "▤ Ver todas" : "🔖 Salvos";

  renderizar();

}

document.querySelector("#ver-salvos").onclick =
  alternarSalvos;

document.querySelector("#salvos-mobile").onclick =
  alternarSalvos;

// Alternar entre feed e galeria.

const modoFeed = document.querySelector("#modo-feed");
const modoGaleria = document.querySelector("#modo-galeria");

modoFeed.onclick = () => {

  galeria = false;

  modoFeed.classList.add("ativo");
  modoGaleria.classList.remove("ativo");

  renderizar();

};

modoGaleria.onclick = () => {

  galeria = true;

  modoGaleria.classList.add("ativo");
  modoFeed.classList.remove("ativo");

  renderizar();

};

// Stories.

document.querySelectorAll(".story").forEach(story => {

  story.onclick = () => {

    abrirImagem(
      story.dataset.nome,
      story.dataset.imagem
    );

  };

});

document.querySelector("#fechar").onclick = () => {
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

    botao.textContent =
      seguindo ? "Seguindo" : "Seguir";

    botao.setAttribute(
      "aria-pressed",
      String(seguindo)
    );

  };

});

renderizar();