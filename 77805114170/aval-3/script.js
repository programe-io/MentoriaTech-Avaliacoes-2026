// Alternar curtida.
document.querySelectorAll(".curtir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));

    botao.querySelector("i").className = ativo
      ? "bx bxs-heart"
      : "bx bx-heart";

    botao.closest("article").querySelector(".curtidas").textContent =
      (ativo ? 19 : 18) + " curtidas";
  });
});

// Alternar publicação salva.
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

// Seguir ou deixar de seguir.
document.querySelectorAll(".seguir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo ? "Seguindo" : "Seguir";
  });
});

// Direcionar o foco ao comentário.
document.querySelectorAll(".comentar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    botao.closest("article").querySelector("input").focus();
  });
});

// Publicar comentários.
document.querySelectorAll(".form-comentario").forEach(function (form) {
  const campo = form.querySelector("input");

  campo.addEventListener("input", function () {
    campo.setCustomValidity("");
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = campo.value.trim();

    if (!texto) {
      campo.setCustomValidity("Escreva um comentário.");
      campo.reportValidity();
      return;
    }

    const item = document.createElement("li");
    const nome = document.createElement("strong");

    nome.textContent = "ana.clara ";

    item.append(nome, document.createTextNode(texto));

    form.closest("article").querySelector(".comentarios").append(item);

    form.reset();
    campo.focus();
  });
});

// Buscar pelo texto da publicação.
document.querySelector("#busca").addEventListener("input", function (evento) {
  const termo = evento.target.value.toLowerCase().trim();
  let quantidade = 0;

  document.querySelectorAll(".post").forEach(function (postagem) {
    const corresponde = postagem.textContent
      .toLowerCase()
      .includes(termo);

    postagem.hidden = !corresponde;

    if (corresponde) {
      quantidade++;
    }
  });

  document.querySelector("#vazio").hidden = quantidade > 0;
});