const publicacoes = [
  {
    usuario: "arthur.garcia",
    categoria: "Fotografia automotiva",
    foto: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000",
    legenda: "Design, potência e personalidade em cada detalhe. 🏁",
    likes: 87,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "motor.club",
    categoria: "Carros esportivos",
    foto: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000",
    legenda: "Uma combinação de engenharia e elegância.",
    likes: 145,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    usuario: "garage.studio",
    categoria: "Automobilismo",
    foto: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1000",
    legenda: "A beleza está nos pequenos detalhes. 📸",
    likes: 203,
    curtido: false,
    salvo: false,
    comentarios: []
  }
];

const feed = document.querySelector("#feed");

let somenteSalvos = false;
let termoPesquisa = "";

function renderizar() {

  feed.replaceChildren();

  const lista = publicacoes.filter(post => {

    const texto = (
      post.usuario + " " +
      post.categoria + " " +
      post.legenda
    ).toLowerCase();

    return texto.includes(termoPesquisa) &&
      (!somenteSalvos || post.salvo);

  });

  document.querySelector("#vazio").hidden = lista.length > 0;

  lista.forEach(post => {

    const artigo = document.createElement("article");

    artigo.className = "post";

    artigo.innerHTML = `
      <div class="post-topo">
        <div class="avatar"></div>

        <div>
          <strong class="nome"></strong>
          <small class="categoria"></small>
        </div>
      </div>

      <img class="foto" alt="Fotografia de automóvel">

      <div class="conteudo">

        <div class="acoes">
          <button class="curtir" aria-label="Curtir">♡</button>
          <button class="comentar" aria-label="Comentar">☏</button>
          <button class="salvar" aria-label="Salvar">♧</button>
        </div>

        <strong class="likes"></strong>

        <p class="legenda"></p>

        <div class="comentarios"></div>

        <form>
          <input
            placeholder="Adicione um comentário..."
            maxlength="180"
            required>

          <button type="submit">Publicar</button>
        </form>

      </div>
    `;

    artigo.querySelector(".avatar").textContent =
      post.usuario.substring(0, 2).toUpperCase();

    artigo.querySelector(".nome").textContent =
      post.usuario;

    artigo.querySelector(".categoria").textContent =
      post.categoria;

    artigo.querySelector(".foto").src = post.foto;

    artigo.querySelector(".legenda").textContent =
      post.usuario + " — " + post.legenda;

    const curtir = artigo.querySelector(".curtir");
    const salvar = artigo.querySelector(".salvar");

    function atualizar() {

      curtir.textContent = post.curtido ? "♥" : "♡";

      curtir.classList.toggle("curtido", post.curtido);

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

        const paragrafo = document.createElement("p");

        const nome = document.createElement("strong");

        nome.textContent = "arthur.garcia ";

        paragrafo.append(
          nome,
          document.createTextNode(texto)
        );

        area.append(paragrafo);

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

document.querySelector("#pesquisa").oninput = evento => {
  termoPesquisa = evento.target.value.toLowerCase().trim();
  renderizar();
};

document.querySelector("#abrir-pesquisa").onclick = () => {
  document.querySelector("#pesquisa").focus();
};

document.querySelector("#mostrar-salvos").onclick = evento => {

  somenteSalvos = !somenteSalvos;

  evento.currentTarget.innerHTML = somenteSalvos
    ? "▤ <span>Ver todos</span>"
    : "♧ <span>Salvos</span>";

  renderizar();

};

// Alternância entre tema claro e escuro.

document.querySelector("#tema").onclick = evento => {

  const claro = document.body.classList.toggle("claro");

  evento.currentTarget.innerHTML = claro
    ? "☾ <span>Tema escuro</span>"
    : "☀ <span>Tema claro</span>";

};

// Sistema de seguir perfis.

document.querySelectorAll(".seguir").forEach(botao => {

  let seguindo = false;

  botao.onclick = () => {

    seguindo = !seguindo;

    botao.textContent = seguindo ? "Seguindo" : "Seguir";

    botao.setAttribute("aria-pressed", String(seguindo));

  };

});

// Stories com fechamento automático.

const modal = document.querySelector("#story-modal");

const barra = document.querySelector("#barra");

let temporizador;

document.querySelectorAll(".story").forEach(story => {

  story.onclick = () => {

    clearTimeout(temporizador);

    document.querySelector("#story-nome").textContent =
      story.dataset.nome;

    document.querySelector("#story-foto").src =
      story.dataset.foto;

    modal.showModal();

    barra.style.animation = "none";

    void barra.offsetWidth;

    barra.style.animation = "tempoStory 5s linear forwards";

    temporizador = setTimeout(() => {

      modal.close();

    }, 5000);

  };

});

document.querySelector("#fechar").onclick = () => {
  modal.close();
};

modal.addEventListener("close", () => {
  clearTimeout(temporizador);
  barra.style.animation = "none";
});

renderizar();