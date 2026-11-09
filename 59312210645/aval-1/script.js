
// =================================
// 🚀 SISTEMA JAVASCRIPT ALEATÓRIO
// =================================

// MENSAGENS ALEATÓRIAS
const mensagens = [
    "🚀 Bem-vindo ao futuro!",
    "🔥 Você é incrível!",
    "👾 Sistema iniciado com sucesso!",
    "💜 Nunca pare de evoluir!",
    "⚡ Energia máxima ativada!",
    "🌎 Explore novas possibilidades!"
];

function gerarMensagem() {
    const indice = Math.floor(Math.random() * mensagens.length);

    console.log(mensagens[indice]);

    return mensagens[indice];
}

// CONTADOR
let contador = 0;

function aumentarContador() {
    contador++;

    console.log("Contador: " + contador);
}

// RELÓGIO DIGITAL
function atualizarRelogio() {
    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR");

    const elemento = document.getElementById("relogio");

    if (elemento) {
        elemento.textContent = hora;
    }
}

setInterval(atualizarRelogio, 1000);

// MODO ESCURO
function alternarTema() {
    document.body.classList.toggle("modo-escuro");
}

// EFEITO DE CLIQUE
document.addEventListener("click", function(evento) {
    console.log(
        "Você clicou na posição:",
        evento.clientX,
        evento.clientY
    );
});

// BOTÃO DE SURPRESA
function surpresa() {
    const mensagem = gerarMensagem();

    const elemento = document.getElementById("mensagem");

    if (elemento) {
        elemento.textContent = mensagem;
    }
}

// INICIALIZAÇÃO
console.log("⚡ JavaScript carregado!");
console.log("Sistema pronto para funcionar!");
