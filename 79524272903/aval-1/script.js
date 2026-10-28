
function mostrarMensagem() {
    alert("🍿 Prepare a pipoca e aproveite!");
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    contador.textContent = Number(contador.textContent) + 1;
}

const curiosidades = [
    "🌽 A pipoca é feita com um tipo específico de milho.",
    "🔥 O vapor dentro do grão provoca a explosão que faz a pipoca estourar.",
    "🍿 A pipoca pode ser preparada com sabores doces ou salgados.",
    "🎬 A pipoca ficou muito popular como lanche nos cinemas."
];

let indice = 0;

function novaCuriosidade() {
    document.getElementById("curiosidade").textContent =
        curiosidades[indice];

    indice = (indice + 1) % curiosidades.length;
}
