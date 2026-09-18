// Menu mobile
function abrirMenu() {
    const menu = document.querySelector(".nav-links");
    menu.classList.toggle("ativo");
}

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("ativo");
    });
});

// Formulário
const formulario = document.getElementById("formContato");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;

    formulario.reset();
});