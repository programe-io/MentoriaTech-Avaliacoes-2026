// Informações sobre futebol

const esporte = "Futebol";
const jogadores = 11;
const duracao = 90;

console.log("⚽ " + esporte);
console.log("Número de jogadores por equipe: " + jogadores);
console.log("Duração da partida: " + duracao + " minutos.");

function falarSobreFutebol() {
    alert(
        "⚽ Futebol\n\n" +
        "O futebol é o esporte mais popular do mundo.\n" +
        "Cada equipe possui 11 jogadores e o objetivo é marcar mais gols que o adversário.\n" +
        "Uma partida oficial dura 90 minutos, divididos em dois tempos de 45 minutos."
    );
}

// Chama a função
falarSobreFutebol();