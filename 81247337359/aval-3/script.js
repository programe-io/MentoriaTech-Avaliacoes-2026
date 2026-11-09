document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".btn-login");

    // Função para ativar/desativar o botão de login dependendo do preenchimento dos campos
    function verificarCampos() {
        if (usernameInput.value.trim() !== "" && passwordInput.value.length >= 6) {
            loginButton.disabled = false;
            loginButton.style.opacity = "1";
        } else {
            loginButton.disabled = true;
            loginButton.style.opacity = "0.7";
        }
    }

    // Configuração inicial do botão
    loginButton.disabled = true;
    loginButton.style.opacity = "0.7";

    // Escuta as mudanças nos inputs
    usernameInput.addEventListener("input", verificarCampos);
    passwordInput.addEventListener("input", verificarCampos);

    // Evento de envio do formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o recarregamento da página
        
        const usuario = usernameInput.value;
        alert("Tentativa de login enviada para o usuário: " + usuario);
    });
});