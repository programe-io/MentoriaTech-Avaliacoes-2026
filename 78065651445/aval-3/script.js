const curiosidades = [
    "Sabrina nasceu em 11 de maio de 1999, na Pensilvânia.",
    "Ela começou a carreira como atriz antes de conquistar o pop.",
    "“Espresso” se tornou um dos maiores sucessos de 2024.",
    "Sabrina também escreve grande parte de suas próprias músicas.",
    "Ela já lançou sete álbuns de estúdio ao longo da carreira."
];

function mostrarCuriosidade(){

    const texto = document.getElementById("curiosidade");

    const numero = Math.floor(Math.random() * curiosidades.length);

    texto.innerHTML = curiosidades[numero];

}