// Seleciona os elementos no HTML
const contadorElemento = document.getElementById('contador');
const botaoAumentar = document.getElementById('btnAumentar');

// Variável para armazenar o valor
let cliques = 0;

// Adiciona um evento de clique ao botão
botaoAumentar.addEventListener('click', () => {
    cliques++;
    contadorElemento.textContent = cliques;
});
