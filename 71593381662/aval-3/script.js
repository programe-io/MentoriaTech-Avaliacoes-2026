/* =========================
   CONFIGURAÇÃO INICIAL
========================= */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");

    iniciarEventos();
});

/* =========================
   FUNÇÕES PRINCIPAIS
========================= */

// Exibe uma mensagem simples
function mostrarAlerta() {
    alert("Olá! Você clicou no botão!");
}

// Altera o conteúdo de um elemento
function mudarTexto() {
    const elemento = document.getElementById("texto");
    if (elemento) {
        elemento.innerText = "Texto alterado com sucesso!";
    }
}

// Alterna modo escuro
function alternarTema() {
    document.body.classList.toggle("dark-mode");
}

// Validação de formulário simples
function validarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (nome === "" || email === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    alert("Formulário enviado com sucesso!");
}

/* =========================
   EVENTOS
========================= */
function iniciarEventos() {
    const botao = document.getElementById("btnAlerta");
    if (botao) {
        botao.addEventListener("click", mostrarAlerta);
    }

    const botaoTexto = document.getElementById("btnTexto");
    if (botaoTexto) {
        botaoTexto.addEventListener("click", mudarTexto);
    }

    const botaoTema = document.getElementById("btnTema");
    if (botaoTema) {
        botaoTema.addEventListener("click", alternarTema);
    }

    const form = document.getElementById("formulario");
    if (form) {
        form.addEventListener("submit", validarFormulario);
    }
}

/* =========================
   UTILIDADES
========================= */

// Função para gerar número aleatório
function gerarNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Exemplo de uso
console.log("Número aleatório:", gerarNumero(1, 100));

/* =========================
   MODO ESCURO (CSS DINÂMICO)
========================= */
const style = document.createElement("style");
style.innerHTML = `
.dark-mode {
    background-color: #121212;
    color: #ffffff;
}
`;
document.head.appendChild(style);