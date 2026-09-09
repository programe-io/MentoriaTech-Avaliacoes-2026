document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("meu-formulario");
    const campoEmail = document.getElementById("email");
    const mensagemErro = document.getElementById("erro-msg");

    formulario.addEventListener("submit", function(evento) {
        // Impede o envio padrão do formulário para validar via JS
        evento.preventDefault();
        
        const valorEmail = campoEmail.value.trim();

        // Validação simples usando expressão regular para verificar e-mail
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            mensagemErro.textContent = "Por favor, insira um endereço de e-mail válido.";
            mensagemErro.style.color = "#ff4d4d";
            campoEmail.style.borderColor = "#ff4d4d";
        } else {
            mensagemErro.textContent = "Sucesso! Formulário enviado.";
            mensagemErro.style.color = "#28a745";
            campoEmail.style.borderColor = "#28a745";
            
            // Aqui você poderia enviar os dados via AJAX/Fetch
            // formulario.submit();
        }
    });
});