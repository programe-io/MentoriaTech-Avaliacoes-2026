document.addEventListener("DOMContentLoaded", () => {

    const curiosidades = [
        "🌳 A Amazônia ocupa cerca de 5,5 milhões de km².",
        "🦜 Mais de 1.300 espécies de aves vivem na Amazônia.",
        "🐆 A onça-pintada é o maior felino das Américas.",
        "💧 O Rio Amazonas é um dos maiores rios do mundo.",
        "🌱 A Amazônia produz grande parte do oxigênio gerado pelas florestas tropicais.",
        "🐒 Existem centenas de espécies de mamíferos na região.",
        "🌎 A floresta influencia o clima de diversos países da América do Sul."
    ];

    const botao = document.getElementById("btnCuriosidade");
    const texto = document.getElementById("textoCuriosidade");

    botao.addEventListener("click", () => {
        const numero = Math.floor(Math.random() * curiosidades.length);
        texto.textContent = curiosidades[numero];
    });

});