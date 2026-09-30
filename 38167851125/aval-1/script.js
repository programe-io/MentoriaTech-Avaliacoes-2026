// Aguarda o carregamento do documento
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleciona os elementos da tela
    const botao = document.getElementById("btn-mensagem");
    const mensagem = document.getElementById("mensagem-oculta");

    // Adiciona o evento de clique no botão
    botao.addEventListener("click", function() {
        // Alterna a classe para mostrar ou esconder o texto
        if (mensagem.classList.contains("escondido")) {
            mensagem.classList.remove("escondido");
            mensagem.classList.add("visivel");
            botao.textContent = "Fechar";
        } else {
            mensagem.classList.remove("visivel");
            mensagem.classList.add("escondido");
            botao.textContent = "Clique aqui";
        }
    });
});
