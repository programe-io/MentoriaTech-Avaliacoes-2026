const fotografias = [
  {
    imagem: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000",
    categoria: "Retratos",
    legenda: "Expressões, personalidade e diferentes formas de enxergar a beleza.",
    likes: 125,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
    categoria: "Natureza",
    legenda: "Existem paisagens que não precisam de palavras.",
    likes: 87,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000",
    categoria: "Detalhes",
    legenda: "A beleza também mora nas pequenas coisas.",
    likes: 98,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000",
    categoria: "Urbano",
    legenda: "Cada cidade possui sua própria história, sua luz e seu ritmo.",
    likes: 156,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000",
    categoria: "Bastidores",
    legenda: "Por trás de cada fotografia existe um novo aprendizado.",
    likes: 73,
    curtido: false,
    salvo: false,
    comentarios: []
  },
  {
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000",
    categoria: "Natureza",
    legenda: "A luz transforma até os cenários mais simples.",
    likes: 112,
    curtido: false,
    salvo: false,
    comentarios: []
  }
];

const galeria = document.querySelector("#galeria");
const modal = document.querySelector("#modal-post");

let modo = "galeria";
let pesquisa = "";
let indiceAtual = 0;
let indicesVisiveis = [];

function renderizar() {

  galeria.replaceChildren();

  galeria.classList.toggle(
    "modo-feed",
    modo === "feed"
  );

  indicesVisiveis = [];

  fotografias.forEach((foto, indice) => {

    const texto = (
      foto.categoria + " " +
      foto.legenda
    ).toLowerCase();

    if (!texto.includes(pesquisa)) return;

    if (modo === "salvos" && !foto.salvo) return;

    indicesVisiveis.push(indice);

    const item = document.createElement("button");

    item.className = "item";

    item.setAttribute(
      "aria-label",
      "Abrir fotografia: " + foto.categoria
    );

    item.innerHTML = `
      <img alt="Fotografia da galeria">

      <div class="overlay">

        <span class="likes"></span>

        <span class="total-comentarios"></span>

      </div>
    `;

    item.querySelector("img").src = foto.imagem;

    item.querySelector(".likes").textContent =
      "♥ " + (foto.likes + Number(foto.curtido));

    item.querySelector(".total-comentarios").textContent =
      "💬 " + foto.comentarios.length;

    item.onclick = () => abrirPost(indice);

    galeria.append(item);

  });

  document.querySelector("#vazio").hidden =
    indicesVisiveis.length > 0;

}

function abrirPost(indice) {

  indiceAtual = indice;

  atualizarModal();

  if (!modal.open) {

    modal.showModal();

  }

}

function atualizarModal() {

  const foto = fotografias[indiceAtual];

  document.querySelector("#foto-ampliada").src =
    foto.imagem;

  document.querySelector("#modal-legenda").textContent =
    foto.legenda;

  document.querySelector("#modal-categoria").textContent =
    "#" + foto.categoria.replaceAll(" ", "");

  document.querySelector("#curtidas").textContent =
    (foto.likes + Number(foto.curtido)) + " curtidas";

  const curtir = document.querySelector("#curtir");

  curtir.textContent = foto.curtido ? "♥" : "♡";

  curtir.classList.toggle("ativo", foto.curtido);

  curtir.setAttribute(
    "aria-pressed",
    String(foto.curtido)
  );

  const salvar = document.querySelector("#salvar-post");

  salvar.textContent = foto.salvo ? "🔖" : "♧";

  salvar.setAttribute(
    "aria-pressed",
    String(foto.salvo)
  );

  const comentarios = document.querySelector("#comentarios");

  comentarios.replaceChildren();

  foto.comentarios.forEach(texto => {

    const p = document.createElement("p");

    const nome = document.createElement("strong");

    nome.textContent = "Visitante: ";

    p.append(
      nome,
      document.createTextNode(texto)
    );

    comentarios.append(p);

  });

}

document.querySelector("#curtir").onclick = () => {

  const foto = fotografias[indiceAtual];

  foto.curtido = !foto.curtido;

  atualizarModal();

  renderizar();

};

document.querySelector("#foto-ampliada").ondblclick = () => {

  fotografias[indiceAtual].curtido = true;

  atualizarModal();

  renderizar();

};

document.querySelector("#salvar-post").onclick = () => {

  const foto = fotografias[indiceAtual];

  foto.salvo = !foto.salvo;

  atualizarModal();

  renderizar();

};

const campoComentario = document.querySelector("#comentario");

document.querySelector("#comentar").onclick = () => {

  campoComentario.focus();

};

document.querySelector("#form-comentario").onsubmit = evento => {

  evento.preventDefault();

  const texto = campoComentario.value.trim();

  if (!texto) return;

  fotografias[indiceAtual].comentarios.push(texto);

  campoComentario.value = "";

  atualizarModal();

  renderizar();

};

function navegar(direcao) {

  if (!indicesVisiveis.length) return;

  const posicao = indicesVisiveis.indexOf(indiceAtual);

  const novaPosicao =
    (posicao + direcao + indicesVisiveis.length)
    % indicesVisiveis.length;

  abrirPost(indicesVisiveis[novaPosicao]);

}

document.querySelector("#anterior").onclick = () => {
  navegar(-1);
};

document.querySelector("#proximo").onclick = () => {
  navegar(1);
};

document.querySelector("#fechar-post").onclick = () => {
  modal.close();
};

modal.addEventListener("click", evento => {

  if (evento.target === modal) {

    modal.close();

  }

});

function alterarModo(novoModo) {

  modo = novoModo;

  document.querySelectorAll(".divisor button")
    .forEach(botao => botao.classList.remove("ativo"));

  document.querySelector("#aba-" + novoModo)
    .classList.add("ativo");

  renderizar();

}

document.querySelector("#aba-galeria").onclick = () => {
  alterarModo("galeria");
};

document.querySelector("#aba-feed").onclick = () => {
  alterarModo("feed");
};

document.querySelector("#aba-salvos").onclick = () => {
  alterarModo("salvos");
};

document.querySelector("#salvos").onclick = () => {

  alterarModo(modo === "salvos" ? "galeria" : "salvos");

};

document.querySelector("#pesquisa").oninput = evento => {

  pesquisa = evento.target.value.toLowerCase().trim();

  renderizar();

};

// Sistema de seguidores.

let seguindo = false;

document.querySelector("#seguir-perfil").onclick = evento => {

  seguindo = !seguindo;

  evento.currentTarget.textContent =
    seguindo ? "Seguindo" : "Seguir";

  evento.currentTarget.classList.toggle(
    "seguindo",
    seguindo
  );

  document.querySelector("#seguidores").textContent =
    seguindo ? 249 : 248;

};

// Destaques e stories.

const modalStory = document.querySelector("#modal-story");
const barra = document.querySelector("#barra");

let temporizador;

document.querySelectorAll(".story").forEach(story => {

  story.onclick = () => {

    clearTimeout(temporizador);

    document.querySelector("#story-titulo").textContent =
      story.dataset.titulo;

    document.querySelector("#story-foto").src =
      story.dataset.foto;

    modalStory.showModal();

    barra.style.animation = "none";

    void barra.offsetWidth;

    barra.style.animation =
      "progressoStory 6s linear forwards";

    temporizador = setTimeout(() => {

      modalStory.close();

    }, 6000);

  };

});

document.querySelector("#fechar-story").onclick = () => {

  modalStory.close();

};

modalStory.addEventListener("close", () => {

  clearTimeout(temporizador);

  barra.style.animation = "none";

});

renderizar();