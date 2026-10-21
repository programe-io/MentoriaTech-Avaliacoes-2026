
// Pesquisa de artigos
const pesquisa = document.getElementById("pesquisa");
const cartoes = [...document.querySelectorAll(".cartao-artigo")];
const contador = document.getElementById("contador");
const semResultados = document.getElementById("semResultados");

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLocaleLowerCase("pt-BR").trim();
  let encontrados = 0;

  cartoes.forEach(cartao => {
    const corresponde = cartao.innerText
      .toLocaleLowerCase("pt-BR")
      .includes(termo);

    cartao.hidden = !corresponde;
    if (corresponde) encontrados++;
  });

  contador.textContent = `${encontrados} artigos`;
  semResultados.hidden = encontrados !== 0;
});

// Alternar modo escuro e claro
const temaBotao = document.getElementById("temaBotao");

if (localStorage.getItem("tema-pedro") === "claro") {
  document.body.classList.add("claro");
}

function atualizarTema() {
  temaBotao.textContent =
    document.body.classList.contains("claro") ? "☀" : "☾";
}

atualizarTema();

temaBotao.addEventListener("click", () => {
  document.body.classList.toggle("claro");

  localStorage.setItem(
    "tema-pedro",
    document.body.classList.contains("claro") ? "claro" : "escuro"
  );

  atualizarTema();
});

// Menu para celulares
const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", () => {
  menu.classList.toggle("aberto");
});

// Fecha o menu após clicar em uma página
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
  });
});

// Abrir os artigos em uma janela
const modal = document.getElementById("modalArtigo");

document.querySelectorAll(".ler-mais").forEach(botao => {
  botao.addEventListener("click", () => {
    document.getElementById("modalTitulo").textContent =
      botao.dataset.titulo;

    document.getElementById("modalTexto").textContent =
      botao.dataset.texto;

    modal.showModal();
  });
});

document.getElementById("fecharModal")
  .addEventListener("click", () => modal.close());

document.getElementById("okModal")
  .addEventListener("click", () => modal.close());

// Formulário de contato
document.getElementById("formContato")
  .addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const corpo =
      `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;

    document.getElementById("feedback").textContent =
      "Abrindo seu aplicativo de e-mail para preparar a mensagem.";

    window.location.href =
      `mailto:?subject=${encodeURIComponent("Contato pelo blog")}` +
      `&body=${encodeURIComponent(corpo)}`;
  });

// Atualizar ano automaticamente
document.getElementById("ano").textContent =
  new Date().getFullYear();
