let contador = 0;
const elementoValor = document.getElementById("valor");

function mudarValor(quantidade) {
    contador += quantidade;
    elementoValor.textContent = contador;
}

function zerar() {
    contador = 0;
    elementoValor.textContent = contador;
}
