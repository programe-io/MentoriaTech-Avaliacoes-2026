let contador = 0;

const valor = document.getElementById("contador");
const aumentar = document.getElementById("aumentar");
const diminuir = document.getElementById("diminuir");
const resetar = document.getElementById("resetar");

aumentar.addEventListener("click", () => {
  contador++;
  valor.textContent = contador;
});

diminuir.addEventListener("click", () => {
  contador--;
  valor.textContent = contador;
});

resetar.addEventListener("click", () => {
  contador = 0;
  valor.textContent = contador;
});