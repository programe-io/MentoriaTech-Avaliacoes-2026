// MODO ESCURO

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modoBtn.textContent = "☀️";
    } else {
        modoBtn.textContent = "🌙";
    }

});


// BOTÕES DE AVALIAÇÃO

const botoesAvaliacao = document.querySelectorAll(".avaliarBtn");

botoesAvaliacao.forEach(botao => {

    botao.addEventListener("click", () => {

        const jogo = botao.dataset.jogo;

        const nota = prompt(
            `Qual nota você dá para ${jogo}? (0 a 5)`
        );

        if (nota !== null) {

            const numero = Number(nota);

            if (numero >= 0 && numero <= 5) {
                alert(
                    `Você deu ${numero} ⭐ para ${jogo}!`
                );
            } else {
                alert("Digite uma nota entre 0 e 5.");
            }

        }

    });

});


// BOTÕES DE NOTÍCIA

const botoesNoticia = document.querySelectorAll(".lerBtn");

botoesNoticia.forEach(botao => {

    botao.addEventListener("click", () => {

        alert(
            "Em breve você poderá ler a notícia completa aqui! 🎮"
        );

    });

});


// MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", () => {

    console.log(
        "GameZone carregado com sucesso! Desenvolvido por Raquel 💙"
    );

});
