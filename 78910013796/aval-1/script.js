const botao = document.getElementById('botao');
const contadorElemento = document.getElementById('contador');

let cliques = 0;

botao.addEventListener('click', function() {
    cliques++;
    contadorElemento.textContent = cliques;
});
