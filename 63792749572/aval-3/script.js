document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.querySelector(".login-form input[type='text']");
    const passwordInput = document.querySelector(".login-form input[type='password']");
    const loginButton = document.querySelector(".btn-login");
    const loginForm = document.querySelector(".login-form");

    // Define o estilo inicial do botão (desativado)
    loginButton.style.opacity = "0.5";
    loginButton.style.cursor = "not-allowed";
    loginButton.disabled = true;

    // Função que verifica se os campos possuem conteúdo
    function validarCampos() {
        const usuarioValido = usernameInput.value.trim().length > 0;
        const senhaValida = passwordInput.value.trim().length >= 6; // Instagram exige mínimo de 6 caracteres

        if (usuarioValido && senhaValida) {
            loginButton.style.opacity = "1";
            loginButton.style.cursor = "pointer";
            loginButton.disabled = false;
        } else {
            loginButton.style.opacity = "0.5";
            loginButton.style.cursor = "not-allowed";
            loginButton.disabled = true;
        }
    }

    // Escuta as digitações nos campos de texto
    usernameInput.addEventListener("input", validarCampos);
    passwordInput.addEventListener("input", validarCampos);

    // Evento de envio do formulário
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        
        const usuario = usernameInput.value;
        alert(`Tentativa de login realizada para o usuário: ${usuario}`);
    });
});