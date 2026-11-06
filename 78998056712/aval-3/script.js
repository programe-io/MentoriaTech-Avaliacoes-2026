const botao = document.getElementById('botao');
const contador = document.getElementById('contador');

let cliques = 0;

botao.addEventListener('click', () => {
    cliques++;
    contador.textContent = cliques;
});
