```javascript
// Botões de curtir
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const contador = botao.querySelector("span");
        let curtidas = Number(contador.textContent);

        if (botao.classList.contains("curtido")) {
            curtidas--;
            botao.classList.remove("curtido");
            botao.style.background = "#087c39";
        } else {
            curtidas++;
            botao.classList.add("curtido");
            botao.style.background = "#d62828";
        }

        contador.textContent = curtidas;
    });
});

// Curiosidades aleatórias
const curiosidades = [
    "A Copa do Mundo masculina começou em 1930.",
    "Uma partida oficial dura normalmente 90 minutos, divididos em dois tempos.",
    "O Brasil conquistou cinco títulos da Copa do Mundo masculina.",
    "O futebol é praticado em países de todos os continentes."
];

const botaoCuriosidade = document.querySelector("#curiosidadeBtn");
const textoCuriosidade = document.querySelector("#curiosidadeTexto");

botaoCuriosidade.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * curiosidades.length);
    textoCuriosidade.textContent = curiosidades[indice];
});
```