const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('btn-login');
const loginForm = document.getElementById('login-form');

// Habilita o botão apenas se os campos estiverem preenchidos (igual ao Instagram real)
function validateInputs() {
    if (usernameInput.value.trim().length > 0 && passwordInput.value.length >= 6) {
        loginButton.removeAttribute('disabled');
    } else {
        loginButton.setAttribute('disabled', 'true');
    }
}

usernameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);

// Simula a ação de login ao enviar o formulário
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Tentativa de login com o usuário: ${usernameInput.value}`);
});