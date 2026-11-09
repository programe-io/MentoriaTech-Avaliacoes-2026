
// Mensagens aleatórias
const mensagens = [
    "🚀 Você é incrível!",
    "🔥 Nunca desista!",
    "🌟 Acredite nos seus sonhos!",
    "💜 Continue aprendendo!",
    "👾 Surpresa desbloqueada!"
];

// Contador de cliques
let contador = 0;

// Gerar surpresa
function surpresa() {
    const numero = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").textContent = mensagens[numero];

    contador++;

    document.getElementById("contador").textContent = contador;
}

// Mudar cor do fundo
function mudarCor() {
    const cores = [
        "#090979",
        "#008000",
        "#8B0000",
        "#4B0082",
        "#FF4500"
    ];

    const numero = Math.floor(Math.random() * cores.length);

    document.body.style.background = cores[numero];
}

// Relógio digital
function atualizarRelogio() {
    const agora = new Date();

    document.getElementById("relogio").textContent =
        agora.toLocaleTimeString("pt-BR");
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

console.log("Projeto iniciado com sucesso!");
