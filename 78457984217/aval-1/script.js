const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario.length < 3) {
        mensagem.style.color = "#ff4444";
        mensagem.textContent = "Usuário muito curto!";
        return;
    }

    if (senha.length < 6) {
        mensagem.style.color = "#ff4444";
        mensagem.textContent = "Senha precisa ter 6 caracteres!";
        return;
    }

    mensagem.style.color = "#00ff99";
    mensagem.textContent = "⚡ Login demonstrativo realizado!";

    formulario.reset();
});