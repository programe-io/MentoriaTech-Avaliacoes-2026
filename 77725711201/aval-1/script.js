// Mensagens para o usuário

function mostrarMensagem() {

    const mensagens = [
        "🌱 Cada pequena atitude ajuda a proteger o planeta!",
        "💧 Economizar água é cuidar do futuro!",
        "♻️ Reciclar é transformar lixo em oportunidade!",
        "🌳 Plantar árvores é investir no futuro!",
        "🌎 O planeta precisa da nossa ajuda todos os dias!"
    ];

    const numero = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagemTexto").innerText =
        mensagens[numero];
}


// Calculadora de água

function calcularAgua() {

    let banhos = Number(document.getElementById("banhos").value);
    let tempo = Number(document.getElementById("tempo").value);

    const resultado = document.getElementById("resultado");

    if (banhos <= 0 || tempo <= 0) {

        resultado.innerHTML =
            "⚠️ Digite valores maiores que zero.";

        return;
    }

    // Estimativa de 9 litros de água por minuto

    let consumoAtual = banhos * tempo * 9;

    // Economia estimada reduzindo o banho em 5 minutos

    let novoTempo = Math.max(tempo - 5, 1);

    let novoConsumo = banhos * novoTempo * 9;

    let economia = consumoAtual - novoConsumo;

    resultado.innerHTML = `
        💧 Seu consumo estimado é de
        <strong>${consumoAtual} litros</strong> por dia.
        <br><br>
        🌱 Reduzindo 5 minutos por banho,
        você poderia economizar aproximadamente
        <strong>${economia} litros</strong> por dia!
    `;
}


// Efeito quando os cards aparecem

const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        card.style.transform = "scale(1.05)";

        setTimeout(function() {
            card.style.transform = "";
        }, 300);

    });

});