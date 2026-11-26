
// Menu responsivo
function alternarMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("ativo");
}

// Botões dos destinos
function explorar(destino) {
    alert("Você escolheu conhecer " + destino +
          "! Prepare-se para essa aventura.");
}

// Formulário de inscrição
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent =
        "Obrigado! O e-mail " + email +
        " foi cadastrado com sucesso!";

    formulario.reset();
});
