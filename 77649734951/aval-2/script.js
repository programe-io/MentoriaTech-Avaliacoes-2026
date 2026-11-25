const form = document.querySelector("#form");
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const categoria = document.querySelector("#categoria");
const feed = document.querySelector("#feed");
const filtro = document.querySelector("#filtro");
const contador = document.querySelector("#contador");

const categorias = {
  livro: { nome: "Livro", icone: "📚" },
  filme: { nome: "Filme", icone: "🎬" },
  musica: { nome: "Música", icone: "🎧" }
};

function filtrar() {
  let quantidade = 0;

  feed.querySelectorAll(".dica").forEach(function (item) {
    const mostrar =
      filtro.value === "todas" ||
      filtro.value === item.dataset.categoria;

    item.hidden = !mostrar;

    if (mostrar) {
      quantidade++;
    }
  });

  document.querySelector("#vazio").hidden = quantidade > 0;
}

function adicionar(nome, texto, tipo, data) {
  const artigo = document.createElement("article");
  artigo.className = "dica";
  artigo.dataset.categoria = tipo;

  const icone = document.createElement("div");
  icone.className = "icone " + tipo;
  icone.textContent = categorias[tipo].icone;
  icone.setAttribute("aria-hidden", "true");

  const conteudo = document.createElement("div");

  const identificacao = document.createElement("small");
  identificacao.textContent =
    categorias[tipo].nome + " • Andressa Ribeiro • " + data;

  const heading = document.createElement("h3");
  heading.textContent = nome;

  const paragrafo = document.createElement("p");
  paragrafo.textContent = texto;

  const curtir = document.createElement("button");
  curtir.type = "button";
  curtir.className = "curtir";
  curtir.setAttribute("aria-pressed", "false");
  curtir.textContent = "♡ Gostei da dica · 0";

  curtir.addEventListener("click", function () {
    const ativo = curtir.getAttribute("aria-pressed") !== "true";

    curtir.setAttribute("aria-pressed", String(ativo));
    curtir.textContent = ativo
      ? "♥ Gostei da dica · 1"
      : "♡ Gostei da dica · 0";
  });

  conteudo.append(identificacao, heading, paragrafo, curtir);
  artigo.append(icone, conteudo);
  feed.prepend(artigo);

  filtrar();
}

descricao.addEventListener("input", function () {
  contador.textContent = descricao.value.length + "/240";
  descricao.setCustomValidity("");
});

titulo.addEventListener("input", function () {
  titulo.setCustomValidity("");
});

filtro.addEventListener("change", filtrar);

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!titulo.value.trim()) {
    titulo.setCustomValidity("Digite o nome da indicação.");
    titulo.reportValidity();
    return;
  }

  if (!descricao.value.trim()) {
    descricao.setCustomValidity("Explique sua indicação.");
    descricao.reportValidity();
    return;
  }

  // Mostra todas as categorias para a nova dica ficar visível.
  filtro.value = "todas";

  adicionar(
    titulo.value.trim(),
    descricao.value.trim(),
    categoria.value,
    new Date().toLocaleDateString("pt-BR")
  );

  form.reset();
  contador.textContent = "0/240";

  document.querySelector("#aviso").textContent =
    "Dica publicada! As publicações reiniciam ao recarregar.";

  titulo.focus();
});

adicionar(
  "Minha próxima leitura",
  "Exemplo de publicação: substitua este título por um livro e conte por que você o recomenda.",
  "livro",
  "Exemplo"
);

adicionar(
  "Uma trilha para estudar",
  "Exemplo de publicação: indique uma música que combine com um momento de concentração.",
  "musica",
  "Exemplo"
);