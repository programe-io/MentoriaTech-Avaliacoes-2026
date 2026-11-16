
const curiosidades = [
    "O Jiu-Jitsu Brasileiro é conhecido mundialmente!",
    "A palavra Jiu-Jitsu significa arte suave.",
    "A disciplina é um dos principais ensinamentos do esporte.",
    "O Jiu-Jitsu utiliza estratégia e inteligência."
];

function mostrarCuriosidade() {
    const numero = Math.floor(
        Math.random() * curiosidades.length
    );

    document.getElementById("curiosidade").textContent =
        curiosidades[numero];
}
  