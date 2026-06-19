const curiosidades = [
    "A maior goleada da história das Copas foi Hungria 10 x 1 El Salvador em 1982.",
    "A Alemanha venceu a Arábia Saudita por 8 x 0 na Copa do Mundo de 2002.",
    "O famoso 7 x 1 da Alemanha sobre o Brasil em 2014 não está entre as maiores goleadas da história das Copas.",
    "A Hungria aparece duas vezes entre as três maiores goleadas da Copa do Mundo.",
    "A Espanha venceu a Costa Rica por 7 x 0 na Copa de 2022.",
    "A Copa do Mundo é realizada pela FIFA desde 1930.",
    "O Brasil é a seleção com mais títulos mundiais."
];

function mostrarCuriosidade() {
    const indice = Math.floor(Math.random() * curiosidades.length);
    document.getElementById("curiosidade").textContent = curiosidades[indice];
}