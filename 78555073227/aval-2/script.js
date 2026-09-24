const botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao) {
    let curtidas = 0;

    botao.addEventListener("click", function() {
        curtidas++;

        botao.innerHTML = "💗 " + curtidas;
        botao.classList.add("curtido");
    });
});