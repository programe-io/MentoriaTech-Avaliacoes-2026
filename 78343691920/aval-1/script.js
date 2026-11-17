
const frases = [
    '"A disciplina de hoje é a saúde de amanhã!"',
    '"Não desista! Cada treino é uma conquista!"',
    '"Seu maior projeto é cuidar de você!"',
    '"Pequenos passos geram grandes resultados!"',
    '"Movimente seu corpo, transforme sua vida!"'
];

function novaFrase() {
    const frase = document.getElementById("frase");

    const indice = Math.floor(
        Math.random() * frases.length
    );

    frase.textContent = frases[indice];
}
