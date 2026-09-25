// Botão de tema escuro

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }
});


// Botões "Ler mais"

const botoes = document.querySelectorAll(".ler");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const post = botao.parentElement;
        const titulo = post.querySelector("h3").textContent;

        alert(
            "Você selecionou o artigo:\n\n" +
            titulo +
            "\n\nEm breve você poderá ler o artigo completo!"
        );

    });

});
