
let curtido = false;
let quantidade = 12580;

function curtir(botao) {

    if (!curtido) {
        curtido = true;
        quantidade++;
        botao.innerHTML = "♥";
        botao.style.color = "red";
    } else {
        curtido = false;
        quantidade--;
        botao.innerHTML = "♡";
        botao.style.color = "white";
    }

    document.getElementById("likes").innerText =
        quantidade.toLocaleString("pt-BR");
}
