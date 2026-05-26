// Aguarda o carregamento do DOM (estrutura da página)
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os botões de "Saber Mais" nos cards de destino
    const botoesSaberMais = document.querySelectorAll(".btn-card");

    // Adiciona um evento de clique para cada botão
    botoesSaberMais.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            // Encontra o card pai do botão que foi clicado
            const card = evento.target.closest(".card");
            
            // Pega o nome do destino guardado no atributo 'data-destino'
            const nomeDestino = card.getAttribute("data-destino");

            // Exibe uma mensagem personalizada de acordo com o destino escolhido
            exibirInteresse(nomeDestino);
        });
    });
});

// Função que simula uma ação de interesse no destino
function exibirInteresse(destino) {
    alert(`Arrumem as malas! ✈️\nVocê demonstrou interesse em ir para: ${destino}.\nEm breve nossa equipe de consultores entrará em contato com as melhores ofertas!`);
}