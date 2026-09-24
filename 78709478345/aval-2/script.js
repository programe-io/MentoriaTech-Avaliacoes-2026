const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function (botao) {

    let curtidas = 0;

    botao.addEventListener("click", function () {

        curtidas = curtidas + 1;

        botao.innerHTML = "💗 " + curtidas;

        botao.classList.add("curtido");

    });

});