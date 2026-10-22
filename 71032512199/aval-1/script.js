const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("claro");

  botaoTema.textContent =
    document.body.classList.contains("claro")
      ? "🌙"
      : "☀️";
});

const botaoEnviar = document.getElementById("enviar");

botaoEnviar.addEventListener("click", () => {
  const resposta = document
    .getElementById("resposta")
    .value.trim();

  const mensagem = document.getElementById("mensagem");

  if (resposta === "") {
    mensagem.textContent = "Digite o nome de um álbum primeiro!";
    return;
  }

  mensagem.textContent =
    `Boa escolha! Você indicou: ${resposta}. Valeu por participar!`;

  document.getElementById("resposta").value = "";
});