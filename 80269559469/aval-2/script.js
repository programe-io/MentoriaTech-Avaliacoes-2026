// JavaScript
const numero = document.getElementById("numero");
const btnMais = document.getElementById("mais");
const btnMenos = document.getElementById("menos");

let contador = 0;

btnMais.addEventListener("click", () => {
  contador++;
  numero.textContent = contador;
});

btnMenos.addEventListener("click", () => {
  contador--;
  numero.textContent = contador;
});