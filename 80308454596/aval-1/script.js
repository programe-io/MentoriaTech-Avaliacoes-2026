

const emojis = ["🐶","🐱","🐸","🦊","🐼","🐵","🐯","🦁"];
let cartas = [...emojis, ...emojis]; // pares
cartas.sort(() => Math.random() - 0.5);

const tabuleiro = document.getElementById("tabuleiro");
let primeira = null;
let segunda = null;
let travar = false;

cartas.forEach((emoji) => {
  const carta = document.createElement("div");
  carta.classList.add("carta");
  carta.dataset.valor = emoji;

  carta.addEventListener("click", () => {
    if (travar || carta.innerText) return;

    carta.innerText = emoji;
    carta.classList.add("virada");

    if (!primeira) {
      primeira = carta;
    } else {
      segunda = carta;
      travar = true;

      if (primeira.dataset.valor === segunda.dataset.valor) {
        primeira = null;
        segunda = null;
        travar = false;
      } else {
        setTimeout(() => {
          primeira.innerText = "";
          segunda.innerText = "";
          primeira.classList.remove("virada");
          segunda.classList.remove("virada");