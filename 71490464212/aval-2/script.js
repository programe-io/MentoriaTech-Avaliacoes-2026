// ===== MENSAGENS MOTIVACIONAIS =====

function mensagemTecnologia() {

    const frases = [
        "A tecnologia transforma o mundo! 💻",
        "O futuro começa com o conhecimento! 🚀",
        "Nunca pare de aprender! 🧠",
        "A criatividade é o limite da inovação! 🤖",
        "Programar é transformar ideias em realidade!"
    ];

    const sorteio = Math.floor(Math.random() * frases.length);

    document.getElementById("mensagem").innerHTML =
        frases[sorteio];
\}


// ===== CURIOSIDADES =====

function mostrarCuriosidade() {

    const curiosidades = [
        "O primeiro computador eletrônico ocupava uma sala inteira!",
        "A internet conecta bilhões de dispositivos.",
        "HTML é utilizado para estruturar páginas da internet.",
        "Robôs podem ajudar em cirurgias e pesquisas espaciais.",
        "A inteligência artificial pode reconhecer imagens e textos."
    ];

    const sorteio = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").innerHTML =
        "💡 " + curiosidades[sorteio];
\}


// ===== QUIZ DE TECNOLOGIA =====

function verificarQuiz() {

    let resposta = document.getElementById("resposta").value
        .trim().toLowerCase();

    let resultado = document.getElementById("resultado");

    if (resposta === "css") {

        resultado.innerHTML = "🎉 Parabéns! Resposta correta!";

        resultado.style.color = "#00ff88";

    \} else {

        resultado.innerHTML = "❌ Resposta incorreta. Tente novamente!";

        resultado.style.color = "#ff5555";
    \}
\}


// ===== CONTADOR DE CLIQUES =====

let cliques = 0;

function contarCliques() {

    cliques++;

    document.getElementById("contador").innerHTML =
        "🖱️ Cliques realizados: " + cliques;
\}

function zerarCliques() {

    cliques = 0;

    document.getElementById("contador").innerHTML =
        "🖱️ Cliques realizados: 0";
\}


// ===== RELÓGIO DIGITAL =====

function atualizarRelogio() {

    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");

    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const segundos = String(agora.getSeconds()).padStart(2, "0");

    document.getElementById("relogio").innerHTML =
        horas + ":" + minutos + ":" + segundos;
\}

atualizarRelogio();

setInterval(atualizarRelogio, 1000);


// ===== MODO ESCURO =====

function mudarTema() {

    document.body.classList.toggle("modo-claro");

\}$0