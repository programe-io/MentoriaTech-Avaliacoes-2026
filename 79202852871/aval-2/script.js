// Seleciona os elementos da página
const botao = document.getElementById('botao');
const contadorTxt = document.getElementById('contador');

// Cria a variável para armazenar o valor
let valorContador = 0;

// Adiciona um evento de clique ao botão
botao.addEventListener('click', () => {
    valorContador++; // Aumenta o valor em 1
    contadorTxt.textContent = valorContador; // Atualiza o texto na tela
});
