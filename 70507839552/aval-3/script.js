// Aguarda o carregamento completo do documento antes de executar o script
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleciona os elementos HTML que vamos manipular
    const botaoMudarTema = document.getElementById("btn-tema");
    const contadorElemento = document.getElementById("contador");
    const botaoContador = document.getElementById("btn-contador");
    
    let cliques = 0;

    // 1. Funcionalidade de alternar o tema (Modo Escuro / Claro)
    botaoMudarTema.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        // Altera o texto do botão dependendo do estado atual
        if (document.body.classList.contains("dark-mode")) {
            botaoMudarTema.textContent = "☀️ Modo Claro";
        } else {
            botaoMudarTema.textContent = "🌙 Modo Escuro";
        }
    });

    // 2. Funcionalidade de contador de cliques
    botaoContador.addEventListener("click", function() {
        cliques++;
        contadorElemento.textContent = cliques;
    });

});