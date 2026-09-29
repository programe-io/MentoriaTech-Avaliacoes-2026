document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("btn-interacao");
    const mensagem = document.getElementById("mensagem-retorno");

    botao.addEventListener("click", () => {

        const hora = new Date().getHours();

        let saudacao;

        if (hora >= 5 && hora < 12) {
            saudacao = "Bom dia!";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Boa tarde!";
        } else {
            saudacao = "Boa noite!";
        }

        mensagem.textContent =
            `${saudacao} 🎮 Missão iniciada! Continue aprendendo e criando novos jogos!`;

        botao.textContent = "✅ Missão concluída";

        botao.disabled = true;

        botao.style.opacity = "0.7";
        botao.style.cursor = "not-allowed";
    });


    // Animação simples ao passar pelos cards

    const projetos = document.querySelectorAll(".cartao-projeto");

    projetos.forEach((projeto) => {

        projeto.addEventListener("click", () => {

            projeto.style.transform = "scale(1.03)";

            setTimeout(() => {
                projeto.style.transform = "";
            }, 300);

        });

    });

});