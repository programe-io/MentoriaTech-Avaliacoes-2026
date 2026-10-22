const botao = document.getElementById("curiosidadeBtn");
const texto = document.getElementById("curiosidadeTexto");

const curiosidades = [
    "Messi nasceu em Rosário, na Argentina, em 24 de junho de 1987.",
    "Ele conquistou a Copa do Mundo com a Argentina em 2022.",
    "Messi ganhou oito Bolas de Ouro até 2023.",
    "Seu apelido é La Pulga.",
    "Ele marcou 91 gols em partidas oficiais no ano de 2012."
];

botao.addEventListener("click", function () {
    const indice = Math.floor(Math.random() * curiosidades.length);

    texto.textContent = curiosidades[indice];
});