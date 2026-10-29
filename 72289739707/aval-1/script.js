
const botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao) {
    let curtidas = 0;

    botao.addEventListener("click", function() {
        curtidas++;

        botao.querySelector("span").textContent = curtidas;
        botao.textContent = "❤️ Curtido! " + curtidas;
    });
});
