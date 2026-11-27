
const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", function() {

        const post = botao.closest(".post");
        const curtidas = post.querySelector(".likes");

        let quantidade = parseInt(curtidas.textContent);

        if (botao.classList.contains("curtido")) {
            botao.classList.remove("curtido");
            botao.textContent = "♡";
            quantidade--;
        } else {
            botao.classList.add("curtido");
            botao.textContent = "♥";
            quantidade++;
        }

        curtidas.textContent = quantidade + " curtidas";
    });
});

const salvar = document.querySelectorAll(".save");

salvar.forEach((botao) => {
    botao.addEventListener("click", function() {
        botao.classList.toggle("salvo");
        botao.textContent = botao.classList.contains("salvo") ? "✔" : "♧";
    });
});
