let contador = 0;
const valor = document.getElementById("valor");
const btnDiminuir = document.getElementById("diminuir");
const btnZerar = document.getElementById("zerar");
const btnAumentar = document.getElementById("aumentar");

btnAumentar.addEventListener("click", () => {
    contador++;
    valor.textContent = contador;
\});

btnDiminuir.addEventListener("click", () => {
    contador--;
    valor.textContent = contador;
\});

btnZerar.addEventListener("click", () => {
    contador = 0;
    valor.textContent = contador;
\});$0