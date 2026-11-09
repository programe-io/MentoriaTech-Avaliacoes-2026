// =====================================
// 🚀 MEU PROJETO JAVASCRIPT
// =====================================

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Site carregado com sucesso!");

    alert("Bem-vindo ao Mundo da Tecnologia! 🚀");
});

// =====================================
// ⏰ RELÓGIO DIGITAL
// =====================================

function atualizarRelogio() {
    const agora = new Date();

    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();

    horas = String(horas).padStart(2, "0");
    minutos = String(minutos).padStart(2, "0");
    segundos = String(segundos).padStart(2, "0");

    console.log(`${horas}:${minutos}:${segundos}`);
}

setInterval(atualizarRelogio, 1000);

// =====================================
// 💬 SISTEMA DE MENSAGENS
// =====================================

function mostrarMensagem() {
    alert("Parabéns! Você está aprendendo JavaScript! 🔥");
}

// =====================================
// 🔢 CONTADOR DE CLIQUES
// =====================================

let contador = 0;

function contarCliques() {
    contador++;

    console.log("Total de cliques: " + contador);

    if (contador === 10) {
        alert("Você chegou a 10 cliques! 🎉");
    }
}

// =====================================
// 🎨 ALTERAR COR DE FUNDO
// =====================================

function mudarCor() {
    const cores = [
        "#121212",
        "#001f3f",
        "#202020",
        "#191970",
        "#2b1055"
    ];

    const corAleatoria = Math.floor(
        Math.random() * cores.length
    );

    document.body.style.backgroundColor =
        cores[corAleatoria];
}

// =====================================
// 📅 MOSTRAR DATA ATUAL
// =====================================

function mostrarData() {
    const data = new Date();

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    alert(`Data atual: ${dia}/${mes}/${ano}`);
}

// =====================================
// 🔐 SISTEMA DE LOGIN SIMPLES
// =====================================

function fazerLogin() {
    const usuario = prompt("Digite seu usuário:");
    const senha = prompt("Digite sua senha:");

    if (usuario === "admin" && senha === "1234") {
        alert("Login realizado com sucesso! ✅");
    } else {
        alert("Usuário ou senha incorretos! ❌");
    }
}

// =====================================
// 🌟 FRASES ALEATÓRIAS
// =====================================

function gerarFrase() {
    const frases = [
        "Nunca desista dos seus sonhos!",
        "A programação cria o futuro!",
        "O conhecimento é poder!",
        "Cada linha de código é uma conquista!",
        "Continue aprendendo e evoluindo!"
    ];

    const numero = Math.floor(
        Math.random() * frases.length
    );

    alert(frases[numero]);
}

// =====================================
// ⚡ FINALIZAÇÃO
// =====================================

console.log("JavaScript iniciado!");
console.log("Desenvolvido com criatividade ❤️");