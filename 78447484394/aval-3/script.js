
let curtido = false;
let quantidade = 8450;

function curtir(botao) {

    if (!curtido) {
        curtido = true;
        quantidade++;
        botao.innerHTML = "♥";
        botao.style.color = "#ec4899";
    } else {
        curtido = false;
        quantidade--;
        botao.innerHTML = "♡";
        botao.style.color = "black";
    }

    document.getElementById("likes").innerText =
        quantidade.toLocaleString("pt-BR");
}
