const form = document.querySelector("#form");
const mensagem = document.querySelector("#mensagem");
const categoria = document.querySelector("#categoria");
const mural = document.querySelector("#mural");
const contador = document.querySelector("#contador");
const total = document.querySelector("#total");
const aviso = document.querySelector("#aviso");

const nomes = {
  estudo: "📚 Estudo",
  criatividade: "🎨 Criatividade",
  cotidiano: "☀️ Dia a dia"
};

mensagem.addEventListener("input", function () {
  contador.textContent = mensagem.value.length + "/240";
  mensagem.setCustomValidity("");
});

function adicionar(texto, tipo, data) {
  const artigo = document.createElement("article");
  artigo.className = "bilhete " + tipo;

  const tema = document.createElement("strong");
  tema.textContent = nomes[tipo];

  const autoria = document.createElement("small");
  autoria.textContent = "Ana Carolina • " + data;

  const conteudo = document.createElement("p");
  conteudo.textContent = texto;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "aplaudir";
  botao.setAttribute("aria-pressed", "false");
  botao.textContent = "👏 Aplaudir · 0";

  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";
    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo
      ? "👏 Aplaudido · 1"
      : "👏 Aplaudir · 0";
  });

  artigo.append(tema, autoria, conteudo, botao);
  mural.prepend(artigo);

  const quantidade = mural.children.length;
  total.textContent =
    quantidade + (quantidade === 1 ? " publicação" : " publicações");
}

adicionar(
  "Uma ideia para o mural: registrar o que aprendemos, mesmo quando parece pequeno.",
  "criatividade",
  "Exemplo"
);

adicionar(
  "Primeiro desafio do projeto: criar uma página e dar vida a ela com JavaScript!",
  "estudo",
  "Exemplo"
);

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) {
    mensagem.setCustomValidity("Conte uma conquista antes de publicar.");
    mensagem.reportValidity();
    return;
  }

  adicionar(
    texto,
    categoria.value,
    new Date().toLocaleDateString("pt-BR")
  );

  form.reset();
  contador.textContent = "0/240";
  aviso.textContent =
    "Conquista adicionada! Este mural reinicia ao recarregar a página.";

  mensagem.focus();
});