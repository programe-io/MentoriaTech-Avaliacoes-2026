document.addEventListener("DOMContentLoaded", function() {
    // Lógica do Contador
    let cliques = 0;
    const btnContador = document.getElementById("btn-contador");
    const spanContador = document.getElementById("contador");

    btnContador.addEventListener("click", function() {
        cliques++;
        spanContador.textContent = cliques;
    });

    // Lógica de Validação de Formulário
    const formulario = document.getElementById("meu-formulario");
    const campoEmail = document.getElementById("email");
    const mensagemErro = document.getElementById("erro-msg");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const valorEmail = campoEmail.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            mensagemErro.textContent = "Por favor, insira um e-mail válido.";
            mensagemErro.style.color = "#ff4d4d";
            campoEmail.style.borderColor = "#ff4d4d";
        } else {
            mensagemErro.textContent = "Sucesso! E-mail enviado.";
            mensagemErro.style.color = "#059669";
            campoEmail.style.borderColor = "#059669";
        }
    });
});