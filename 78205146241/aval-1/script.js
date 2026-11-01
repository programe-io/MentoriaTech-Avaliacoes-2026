let contador = 0;
const botao = document.getElementById('botao-clique');
const display = document.getElementById('numero');


botao.eddEventListener('click' , () => {
    contador++;
    display.textContent = contador;
});