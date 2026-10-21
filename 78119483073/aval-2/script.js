
const formulario = document.getElementById("formLogin");
const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");
const criarConta = document.getElementById("criarConta");

// Mostrar ou ocultar a senha
mostrarSenha.addEventListener("change", function () {
    senha.type = this.checked ? "text" : "password";
});

// Verificar o formulário de login
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senhaDigitada = senha.value;

    // Verificar se os campos estão preenchidos
    if (email === "" || senhaDigitada === "") {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    // Verificar o formato básico do e-mail
    if (!email.includes("@") || !email.includes(".")) {
        mensagem.style.color = "red";
        mensagem.textContent = "Digite um e-mail válido!";
        return;
    }

    // Verificar o tamanho da senha
    if (senhaDigitada.length < 6) {
        mensagem.style.color = "red";
        mensagem.textContent = "A senha deve ter pelo menos 6 caracteres!";
        return;
    }

    // Aviso demonstrativo
    mensagem.style.color = "#2563eb";
    mensagem.textContent =
        "Formulário preenchido! O login precisa ser conectado a um servidor.";
});

// Ação do link para criar conta
criarConta.addEventListener("click", function (evento) {
    evento.preventDefault();

    mensagem.style.color = "#555";
    mensagem.textContent =
        "A página de cadastro ainda não foi criada.";
});
