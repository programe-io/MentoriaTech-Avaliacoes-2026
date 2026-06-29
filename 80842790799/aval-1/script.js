const botoes = document.querySelectorAll(".btn");

botoes.forEach((botao) => {

    botao.addEventListener("click", () => {

        const conteudo = botao.nextElementSibling;

        conteudo.classList.toggle("ativo");

        if (conteudo.classList.contains("ativo")) {
            botao.textContent = "Ler Menos";
        } else {
            botao.textContent = "Ler Mais";
        }

    });

});