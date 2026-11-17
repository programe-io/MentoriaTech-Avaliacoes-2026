
// MENSAGENS MOTIVACIONAIS
function mensagemFutebol() {
    const frases = [
        "Nunca desista dos seus sonhos! ⚽",
        "Treine bastante e seja um campeão! 🏆",
        "O futebol exige dedicação e esforço! 💚",
        "Acredite no seu potencial! 🥅",
        "Cada treino é um passo para a vitória!"
    ];

    const sorteio = Math.floor(Math.random() * frases.length);

    document.getElementById("mensagem").innerHTML =
        frases[sorteio];
\}


// DICAS ALEATÓRIAS
function mostrarDica() {
    const dicas = [
        "Treine passes curtos para melhorar sua precisão.",
        "Pratique chutes com os dois pés.",
        "Observe o posicionamento dos seus companheiros.",
        "Treine o domínio da bola.",
        "Não esqueça de aquecer antes de jogar!"
    ];

    const sorteio = Math.floor(Math.random() * dicas.length);

    document.getElementById("dica").innerHTML =
        "⚽ Dica: " + dicas[sorteio];
\}


// QUIZ DE FUTEBOL
function verificarResposta() {

    let resposta = document.getElementById("resposta").value;

    let resultado = document.getElementById("resultado");

    if (resposta === "11") {
        resultado.innerHTML = "🎉 Parabéns! Resposta correta!";
        resultado.style.color = "green";
    \} else {
        resultado.innerHTML = "❌ Resposta incorreta! Tente novamente.";
        resultado.style.color = "red";
    \}
\}


// CONTADOR DE GOLS
let gols = 0;

function marcarGol() {
    gols++;

    document.getElementById("contador").innerHTML =
        "⚽ Gols marcados: " + gols;
\}

function zerarGols() {
    gols = 0;

    document.getElementById("contador").innerHTML =
        "⚽ Gols marcados: 0";
\}$0