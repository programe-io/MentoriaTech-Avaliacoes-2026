// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");

    const botao = document.getElementById("btnClique");

    if (botao) {
        botao.addEventListener("click", () => {
            mostrarMensagem();
        });
    }
});

// Exibe uma mensagem
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Exemplo de alteração de texto
function alterarTexto() {
    const elemento = document.getElementById("texto");
    
    if (elemento) {
        elemento.textContent = "O texto foi alterado pelo JavaScript!";
    }
}

// Exemplo de mudança de tema
function alternarTema() {
    document.body.classList.toggle("tema-escuro");
}