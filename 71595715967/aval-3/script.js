// ==========================
// FUNÇÃO PARA BOTÃO ALEATÓRIO
// ==========================
function mostrarMensagem() {
    const mensagens = [
        "Olá, bem-vindo ao meu site!",
        "Você clicou no botão!",
        "Hoje é um ótimo dia para aprender HTML, CSS e JavaScript!",
        "JavaScript é divertido!"
    ];
    // Seleciona uma mensagem aleatória
    const mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
    document.getElementById("mensagem").textContent = mensagem;
}

// ==========================
// FUNÇÃO PARA VALIDAR FORMULÁRIO
// ==========================
function validarFormulario(event) {
    event.preventDefault(); // Evita envio do formulário

    // Seleciona campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagemForm").value.trim();

    // Verificação simples
    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    if (!email.includes("@")) {
        alert("Por favor, insira um email válido!");
        return false;
    }

    alert("Formulário enviado com sucesso!");
    // Aqui você poderia enviar os dados via AJAX ou outro método
    document.getElementById("formContato").reset();
    return true;
}

// ==========================
// FUNÇÃO PARA ALTERAR TEMA
// ==========================
function alternarTema() {
    const body = document.body;
    body.classList.toggle("tema-escuro");

    // Muda o texto do botão
    const btn = document.getElementById("botaoTema");
    if (body.classList.contains("tema-escuro")) {
        btn.textContent = "Tema Claro";
    } else {
        btn.textContent = "Tema Escuro";
    }
}

// ==========================
// EVENTOS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    // Adiciona evento de submit no formulário
    const form = document.getElementById("formContato");
    if (form) {
        form.addEventListener("submit", validarFormulario);
    }

    // Adiciona evento de botão de tema
    const btnTema = document.getElementById("botaoTema");
    if (btnTema) {
        btnTema.addEventListener("click", alternarTema);
    }
});