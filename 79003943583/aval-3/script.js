// Curtir e desfazer curtida.
document.querySelectorAll(".curtir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));

    botao.querySelector("i").className = ativo
      ? "bx bxs-heart"
      : "bx bx-heart";

    const postagem = botao.closest("article");

    postagem.querySelector(".quantidade-curtidas").textContent =
      (ativo ? 13 : 12) + " curtidas";
  });
});

// Marcar ou desmarcar uma publicação como salva.
document.querySelectorAll(".salvar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));

    botao.setAttribute(
      "aria-label",
      ativo ? "Remover dos salvos" : "Salvar publicação"
    );

    botao.querySelector("i").className = ativo
      ? "bx bxs-bookmark"
      : "bx bx-bookmark";
  });
});

// Seguir e deixar de seguir usuários da demonstração.
document.querySelectorAll(".seguir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo ? "Seguindo" : "Seguir";
  });
});

// Levar o foco ao campo de comentário.
document.querySelectorAll(".comentar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    botao.closest("article").querySelector("input").focus();
  });
});

// Adicionar comentários.
document.querySelectorAll(".form-comentario").forEach(function (form) {
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const campo = form.querySelector("input");
    const texto = campo.value.trim();

    if (!texto) {
      campo.setCustomValidity("Escreva um comentário.");
      campo.reportValidity();
      return;
    }

    const item = document.createElement("li");
    const nome = document.createElement("strong");

    nome.textContent = "agatha.estuda ";

    // Insere o comentário como texto, sem executar HTML.
    item.append(nome, document.createTextNode(texto));

    form.closest("article").querySelector(".comentarios").append(item);

    form.reset();
    campo.focus();
  });

  form.querySelector("input").addEventListener("input", function (evento) {
    evento.target.setCustomValidity("");
  });
});

// Filtrar as publicações pelo texto digitado.
document.querySelector("#busca").addEventListener("input", function (evento) {
  const termo = evento.target.value.toLowerCase().trim();
  let encontradas = 0;

  document.querySelectorAll(".post").forEach(function (postagem) {
    const corresponde = postagem.textContent
      .toLowerCase()
      .includes(termo);

    postagem.hidden = !corresponde;

    if (corresponde) {
      encontradas++;
    }
  });

  document.querySelector("#nenhum-resultado").hidden =
    encontradas > 0;
});