const botaoCurtir = document.getElementById("curtirBtn");
const contador = document.getElementById("contador");

let curtidas = 0;

botaoCurtir.addEventListener("click", function () {
    curtidas = curtidas + 1;
    contador.textContent = curtidas;
});