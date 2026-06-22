// Executa quando a página termina de carregar
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");
});

// Função para exibir uma mensagem
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Alterar o texto de um elemento
function alterarTexto() {
    const titulo = document.getElementById("titulo");

    if (titulo) {
        titulo.textContent = "Texto alterado com JavaScript!";
    }
}

// Alternar modo escuro
function alternarTema() {
    document.body.classList.toggle("dark-mode");
}