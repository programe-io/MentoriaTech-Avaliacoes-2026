const botao = document.getElementById("curtirBtn");
const contador = document.getElementById("contador");

let curtidas = 0;

botao.addEventListener("click", function() {
    curtidas++;
    contador.textContent = curtidas;
});