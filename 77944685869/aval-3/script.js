
function mostrarMais() {
  const texto = document.getElementById("mais");
  const botao = document.querySelector("#sobre button");

  if (texto.hidden) {
    texto.hidden = false;
    botao.textContent = "Mostrar menos";
  } else {
    texto.hidden = true;
    botao.textContent = "Saiba mais";
  }
}

document
  .getElementById("formulario")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem");

    if (email.trim() !== "") {
      mensagem.textContent =
        "Inscrição demonstrativa realizada com sucesso!";
      this.reset();
    }
  });

