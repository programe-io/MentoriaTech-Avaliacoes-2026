
function mensagem() {
    alert("Seja bem-vindo ao Mundo dos Lírios! 🌸");
}

const curiosidades = [
    "Os lírios pertencem ao gênero botânico Lilium.",
    "Algumas espécies de lírios possuem perfume intenso.",
    "Os lírios podem apresentar diversas cores.",
    "Os lírios são plantas bulbosas.",
    "Os lírios são cultivados em diferentes partes do mundo.",
    "Na linguagem das flores, os lírios podem representar pureza e renovação."
];

let indice = 0;

function novaCuriosidade() {
    document.getElementById("curiosidadeTexto").textContent =
        curiosidades[indice];

    indice = (indice + 1) % curiosidades.length;
}
