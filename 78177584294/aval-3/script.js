function mostrarMensagem() {
    alert("🚀 A Inteligência Artificial está transformando o mundo!");
}

/* Relógio */
setInterval(function () {
    let agora = new Date();
    document.getElementById("relogio").innerHTML =
    agora.toLocaleTimeString();
}, 1000);

/* Curiosidade */
function curiosidade() {

let lista = [
"IA ajuda médicos a salvar vidas.",
"Carros autônomos usam IA.",
"ChatGPT é uma IA.",
"IA aprende com dados."
];

let sorteio = Math.floor(Math.random() * lista.length);

document.getElementById("curio").innerHTML =
lista[sorteio];

}