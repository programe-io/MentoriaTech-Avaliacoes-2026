// Seleciona os elementos do HTML
const botao = document.getElementById('botao');
const contadorElemento = document.getElementById('contador');

// Variável para guardar o número de cliques
let cliques = 0;

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
    cliques++; // Adiciona +1 à variável
    contadorElemento.textContent = cliques; // Atualiza o texto na tela
});
