const frases = [
    "♡ Nunca desista dos seus sonhos!",
    "Porque muitos são chamados, mas poucos são escolhidos. - Mateus 22:14",
    "🎧 Música - É tudo sobre você!",
    "☀ Ninguém pode apagar minha luz, por isso ela é minha!"
];

let indice = 0;

// BOTÃO FRASE
document.getElementById("frase").onclick = function () {
    document.getElementById("mensagem").textContent = frases[indice];

    indice++;

    if (indice >= frases.length) {
        indice = 0;
    }
};

// BOTÃO COR
const cores = [
    "#ffd1dc", // rosa claro
    "#cce7ff"  // azul claro
];

let corAtual = 0;

document.getElementById("cor").onclick = function () {
    corAtual++;

    if (corAtual >= cores.length) {
        corAtual = 0;
    }

    document.body.style.background = cores[corAtual];
};