
const botaoSeguir = document.getElementById("seguir");
const seguidores = document.getElementById("seguidores");

let seguindo = false;
let quantidade = 1250;

botaoSeguir.addEventListener("click", function() {

    seguindo = !seguindo;

    if (seguindo) {
        quantidade++;
        botaoSeguir.textContent = "Seguindo";
        botaoSeguir.style.background = "#444";
    } else {
        quantidade--;
        botaoSeguir.textContent = "Seguir";
        botaoSeguir.style.background = "#e1306c";
    }

    seguidores.textContent = quantidade.toLocaleString("pt-BR");
});

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {

    let curtido = false;

    botao.addEventListener("click", function() {

        const likes = botao.nextElementSibling;
        let numero = parseInt(likes.textContent);

        if (!curtido) {
            numero++;
            botao.textContent = "❤️ Curtido";
            curtido = true;
        } else {
            numero--;
            botao.textContent = "❤️ Curtir";
            curtido = false;
        }

        likes.textContent = numero + " curtidas";
    });
});
