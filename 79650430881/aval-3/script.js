// Seleciona os elementos do HTML
const botao = document.getElementById('meuBotao');
const spanContador = document.getElementById('contador');

// Inicializa a variável do contador
let cliques = 0;

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
    cliques++; // Incrementa o valor
    spanContador.textContent = cliques; // Atualiza o texto na tela
});
