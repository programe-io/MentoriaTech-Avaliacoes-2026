
const curtir = document.getElementById("curtir");
const curtidas = document.getElementById("curtidas");

let gostei = false;
let quantidade = 1250;

curtir.addEventListener("click", function() {

    gostei = !gostei;

    if (gostei) {

        quantidade++;

        curtir.textContent = "♥";
        curtir.style.color = "#ff267d";

    } else {

        quantidade--;

        curtir.textContent = "♡";
        curtir.style.color = "#a83e69";

    }

    curtidas.textContent =
        quantidade.toLocaleString("pt-BR") + " curtidas";

});
