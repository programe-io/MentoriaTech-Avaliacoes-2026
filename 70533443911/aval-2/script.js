let valor = 0;
const spanNumero = document.getElementById("numero");

document.getElementById("aumentar").addEventListener("click", function() {
    valor++;
    spanNumero.textContent = valor;
\});

document.getElementById("zerar").addEventListener("click", function() {
    valor = 0;
    spanNumero.textContent = valor;
\});$0