
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const contador = botao.querySelector("span");
        let curtidas = Number(contador.textContent);

        if (botao.classList.contains("ativo")) {
            curtidas--;
            botao.classList.remove("ativo");
        } else {
            curtidas++;
            botao.classList.add("ativo");
        }

        contador.textContent = curtidas;
    });
});

const curiosidades = [
    "O piano tradicional possui 88 teclas.",
    "Existem instrumentos musicais de diferentes épocas e culturas.",
    "A música pode ajudar a criar memórias marcantes.",
    "O ritmo é um dos elementos fundamentais da música."
];

document.getElementById("botaoMensagem")
    .addEventListener("click", function() {
        const indice = Math.floor(Math.random() * curiosidades.length);

        document.getElementById("mensagem").textContent =
            curiosidades[indice];
    });
