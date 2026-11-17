function curtir(botao) {
    let numero = botao.querySelector("span");
    let curtido = botao.dataset.curtido === "true";

    botao.dataset.curtido = !curtido;

    numero.textContent =
        Number(numero.textContent) + (curtido ? -1 : 1);

    botao.firstChild.textContent =
        curtido ? "♡ CURTIR " : "♥ CURTIDO ";

    botao.style.color = curtido ? "#25221e" : "#b73529";
}

function comentar() {
    let mensagem = prompt("Escreva seu comentário:");

    if (mensagem) {
        alert("Comentário enviado: " + mensagem);
    }
}

function tocarRadio() {
    alert("Em breve! Adicione um arquivo de música para ativar a rádio.");
}
